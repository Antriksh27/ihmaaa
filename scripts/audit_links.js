const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
    const req = http.get(fullUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          url: urlPath,
          statusCode: res.statusCode,
          headers: res.headers,
          data,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url: urlPath,
        statusCode: 0,
        error: err.message,
        data: '',
      });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({
        url: urlPath,
        statusCode: 408,
        error: 'Timeout after 8s',
        data: '',
      });
    });
  });
}

function extractLinks(html, currentPath) {
  const links = new Set();
  const images = new Set();

  // Extract <a href="...">
  const aRegex = /<a[^>]+href=["']([^"']+)["']/gi;
  let match;
  while ((match = aRegex.exec(html)) !== null) {
    const href = match[1].trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }
    links.add(href);
  }

  // Extract <img src="...">
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1].trim();
    if (!src || src.startsWith('data:')) continue;
    images.add(src);
  }

  return { links: Array.from(links), images: Array.from(images) };
}

async function runAudit() {
  console.log('--- Starting Comprehensive IHMAAA Link & Route Audit ---');

  // 1. Gather all known initial routes
  const initialUrls = new Set([
    '/',
    '/ihmaaa/about-us',
    '/ihmaaa/about-us/chairmans-message',
    '/ihmaaa/about-us/president-s-message',
    '/ihmaaa/about-us/founder-principal-s-message',
    '/ihmaaa/about-us/office-bearers',
    '/ihmaaa/about-us/member-s-list',
    '/ihmaaa/aims-objectives/memorandum-of-association',
    '/ihmaaa/aims-objectives/article-of-association',
    '/ihmaaa/aims-objectives/downloads',
    '/curriculum-vitae',
    '/vacancies/hotels-restaurants',
    '/news-events/ihmaaa-news',
    '/social-views/photo-albums',
    '/social-views/user-page-blog',
    '/social-views/social-connect',
    '/sponsors',
    '/contact-us',
    '/search',
    '/sitemap.xml',
    '/robots.txt',
  ]);

  // Read article slugs
  try {
    const articlesContent = fs.readFileSync('src/content/articles.ts', 'utf8');
    const slugMatches = articlesContent.match(/"slug":\s*"([^"]+)"/g) || [];
    slugMatches.forEach((m) => {
      const slug = m.match(/"slug":\s*"([^"]+)"/)[1];
      initialUrls.add(`/news-events/ihmaaa-news/${slug}`);
    });
  } catch (e) {
    console.error('Could not read articles.ts:', e.message);
  }

  // Read vacancies slugs
  try {
    const vacanciesContent = fs.readFileSync('src/content/vacancies.ts', 'utf8');
    const slugMatches = vacanciesContent.match(/"slug":\s*"([^"]+)"/g) || [];
    slugMatches.forEach((m) => {
      const slug = m.match(/"slug":\s*"([^"]+)"/)[1];
      initialUrls.add(`/vacancies/hotels-restaurants/${slug}`);
    });
  } catch (e) {
    console.error('Could not read vacancies.ts:', e.message);
  }

  // Read CV slugs
  try {
    const cvsContent = fs.readFileSync('src/content/cvs.ts', 'utf8');
    const slugMatches = cvsContent.match(/"slug":\s*"([^"]+)"/g) || [];
    slugMatches.forEach((m) => {
      const slug = m.match(/"slug":\s*"([^"]+)"/)[1];
      initialUrls.add(`/curriculum-vitae/${slug}`);
    });
  } catch (e) {
    console.error('Could not read cvs.ts:', e.message);
  }

  // Read album slugs
  try {
    const albumsContent = fs.readFileSync('src/content/albums.ts', 'utf8');
    const slugMatches = albumsContent.match(/"slug":\s*"([^"]+)"/g) || [];
    slugMatches.forEach((m) => {
      const slug = m.match(/"slug":\s*"([^"]+)"/)[1];
      initialUrls.add(`/social-views/photo-albums?album=${slug}`);
      initialUrls.add(`/social-views/photo-albums/${slug}`);
    });
  } catch (e) {
    console.error('Could not read albums.ts:', e.message);
  }

  console.log(`Found ${initialUrls.size} initial targets to crawl and test.`);

  const visitedUrls = new Set();
  const queue = Array.from(initialUrls);

  const results = {
    working: [],
    redirects: [],
    broken: [],
    imagesWorking: [],
    imagesBroken: [],
    legacyOrMalformedLinks: [],
  };

  const imagesToCheck = new Set();

  while (queue.length > 0) {
    const currentPath = queue.shift();
    if (visitedUrls.has(currentPath)) continue;
    visitedUrls.add(currentPath);

    // Only crawl internal URLs
    if (currentPath.startsWith('http://') || currentPath.startsWith('https://')) {
      if (!currentPath.startsWith(BASE_URL)) {
        continue;
      }
    }

    const res = await fetchUrl(currentPath);

    const is404Page =
      res.statusCode === 404 ||
      (res.data && res.data.includes('404: This page could not be found.')) ||
      (res.data && res.data.includes('This page could not be found'));

    if (res.statusCode >= 300 && res.statusCode < 400) {
      results.redirects.push({
        url: currentPath,
        status: res.statusCode,
        location: res.headers.location,
      });
      if (res.headers.location && !visitedUrls.has(res.headers.location)) {
        queue.push(res.headers.location);
      }
    } else if (res.statusCode === 200 && !is404Page) {
      results.working.push({ url: currentPath, status: res.statusCode });

      // Extract more links from HTML response
      if (res.headers['content-type'] && res.headers['content-type'].includes('text/html')) {
        const { links, images } = extractLinks(res.data, currentPath);

        images.forEach((img) => imagesToCheck.add(img));

        links.forEach((l) => {
          if (l.includes('index.php') || l.includes('.php') || l.startsWith('event/')) {
            results.legacyOrMalformedLinks.push({
              sourcePage: currentPath,
              badLink: l,
            });
          }

          if (l.startsWith('/') && !l.startsWith('//')) {
            if (!visitedUrls.has(l) && !queue.includes(l)) {
              queue.push(l);
            }
          }
        });
      }
    } else {
      results.broken.push({
        url: currentPath,
        status: res.statusCode,
        error: is404Page ? '404 Not Found' : res.error || 'Server Error',
      });
    }
  }

  // Now check all unique images
  console.log(`Checking ${imagesToCheck.size} referenced images...`);
  for (const imgPath of imagesToCheck) {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) continue;
    const imgRes = await fetchUrl(imgPath);
    if (imgRes.statusCode === 200) {
      results.imagesWorking.push(imgPath);
    } else {
      results.imagesBroken.push({
        src: imgPath,
        status: imgRes.statusCode,
      });
    }
  }

  console.log('\n================ AUDIT SUMMARY ================');
  console.log(`Total Pages Crawled: ${visitedUrls.size}`);
  console.log(`Working 200 Pages: ${results.working.length}`);
  console.log(`Redirecting Pages: ${results.redirects.length}`);
  console.log(`Broken Pages (404/500): ${results.broken.length}`);
  console.log(`Working Images: ${results.imagesWorking.length}`);
  console.log(`Broken Images: ${results.imagesBroken.length}`);
  console.log(`Legacy/Malformed Links: ${results.legacyOrMalformedLinks.length}`);
  console.log('===============================================\n');

  fs.writeFileSync('scripts/audit_report.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Detailed report written to scripts/audit_report.json');
}

runAudit();
