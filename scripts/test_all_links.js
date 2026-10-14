const http = require('http');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';

function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    let fullUrl = urlPath;
    if (!urlPath.startsWith('http')) {
      fullUrl = `${BASE_URL}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
    }

    try {
      const u = new URL(fullUrl);
      const req = http.get(u.href, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          resolve({
            url: urlPath,
            status: res.statusCode,
            location: res.headers.location || null,
            contentType: res.headers['content-type'] || '',
            body,
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          url: urlPath,
          status: 0,
          error: err.message,
          body: '',
        });
      });

      req.setTimeout(8000, () => {
        req.destroy();
        resolve({
          url: urlPath,
          status: 408,
          error: 'Timeout',
          body: '',
        });
      });
    } catch (e) {
      resolve({
        url: urlPath,
        status: -1,
        error: e.message,
        body: '',
      });
    }
  });
}

async function main() {
  console.log('Testing all routes and links on', BASE_URL);

  // Load articles
  const articlesFile = fs.readFileSync('src/content/articles.ts', 'utf8');
  const equalsIndex = articlesFile.indexOf('=');
  const jsonStart = articlesFile.indexOf('[', equalsIndex);
  const jsonEnd = articlesFile.lastIndexOf(']');
  const articles = JSON.parse(articlesFile.slice(jsonStart, jsonEnd + 1));

  // Load navigation
  const navContent = fs.readFileSync('src/content/navigation.ts', 'utf8');
  const navLinks = Array.from(new Set(navContent.match(/href:\s*['"]([^'"]+)['"]/g).map((m) => m.match(/['"]([^'"]+)['"]/)[1])));

  // Load albums
  const albumsFile = fs.readFileSync('src/content/albums.ts', 'utf8');
  const albumSlugs = Array.from(new Set(albumsFile.match(/"slug":\s*"([^"]+)"/g).map((m) => m.match(/"slug":\s*"([^"]+)"/)[1])));

  const queue = new Set([
    '/',
    '/sitemap.xml',
    '/robots.txt',
    '/search',
    '/contact-us',
    '/sponsors',
    '/curriculum-vitae',
    '/vacancies/hotels-restaurants',
    '/news-events/ihmaaa-news',
    '/social-views/photo-albums',
    '/social-views/user-page-blog',
    '/social-views/social-connect',
    ...navLinks,
  ]);

  // Add all articles by category
  articles.forEach((a) => {
    if (a.categoryId === '27') {
      queue.add(`/curriculum-vitae/${a.slug}`);
    } else if (a.categoryId === '28') {
      queue.add(`/vacancies/hotels-restaurants/${a.slug}`);
    } else if (a.categoryId === '80') {
      queue.add(`/news-events/ihmaaa-news/${a.slug}`);
    }
  });

  // Add all albums
  albumSlugs.forEach((slug) => {
    queue.add(`/social-views/photo-albums/${slug}`);
    queue.add(`/social-views/photo-albums?album=${slug}`);
  });

  console.log(`Initial queue has ${queue.size} distinct URLs.`);

  const visited = new Set();
  const workingUrls = [];
  const redirectedUrls = [];
  const brokenUrls = [];
  const crawledLinks = new Map(); // url -> Array of sources
  const legacyHrefIssues = []; // links in HTML matching index.php or .php

  const urlList = Array.from(queue);

  for (let i = 0; i < urlList.length; i++) {
    const current = urlList[i];
    if (visited.has(current)) continue;
    visited.add(current);

    const res = await fetchUrl(current);

    if (res.status === 200) {
      // Check if Next.js actually served 200 or an error page with title 404
      const isActual404 = /<title>[^<]*404[^<]*<\/title>/i.test(res.body) && !current.includes('404');
      if (isActual404) {
        brokenUrls.push({ url: current, status: 404, reason: '404 title in HTML' });
      } else {
        workingUrls.push({ url: current, status: 200 });
      }

      // Extract hrefs from HTML
      const hrefRegex = /<a[^>]+href=["']([^"']+)["']/gi;
      let match;
      while ((match = hrefRegex.exec(res.body)) !== null) {
        let href = match[1].trim().replace(/&amp;/g, '&');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
          continue;
        }

        if (href.includes('index.php') || href.includes('.php')) {
          legacyHrefIssues.push({ source: current, href });
        }

        if (href.startsWith('/') && !href.startsWith('//')) {
          if (!visited.has(href) && !urlList.includes(href)) {
            urlList.push(href);
          }
        }
      }
    } else if (res.status >= 300 && res.status < 400) {
      redirectedUrls.push({ url: current, status: res.status, location: res.location });
      if (res.location && res.location.startsWith('/') && !visited.has(res.location) && !urlList.includes(res.location)) {
        urlList.push(res.location);
      }
    } else {
      brokenUrls.push({ url: current, status: res.status, error: res.error || 'HTTP ' + res.status });
    }
  }

  console.log('\n================ AUDIT RESULTS ================');
  console.log(`Total URLs Checked: ${visited.size}`);
  console.log(`Working (HTTP 200): ${workingUrls.length}`);
  console.log(`Redirects (HTTP 3xx): ${redirectedUrls.length}`);
  console.log(`Broken (HTTP 4xx / 5xx): ${brokenUrls.length}`);
  console.log(`Legacy Joomla hrefs inside pages: ${legacyHrefIssues.length}`);

  if (brokenUrls.length > 0) {
    console.log('\n[!] BROKEN URLS:');
    brokenUrls.forEach((b) => console.log(` - [${b.status}] ${b.url} (${b.error || b.reason})`));
  } else {
    console.log('\n[✓] ZERO BROKEN ROUTES DETECTED!');
  }

  if (legacyHrefIssues.length > 0) {
    console.log('\n[!] LEGACY HREF REFERENCES IN PAGE CONTENT:');
    legacyHrefIssues.slice(0, 15).forEach((item) => console.log(` - Source: ${item.source} -> Href: ${item.href}`));
  }

  fs.writeFileSync(
    'scripts/audit_complete_result.json',
    JSON.stringify(
      {
        total: visited.size,
        workingCount: workingUrls.length,
        redirectCount: redirectedUrls.length,
        brokenCount: brokenUrls.length,
        brokenUrls,
        redirectedUrls,
        legacyHrefIssues,
        workingUrls: workingUrls.map((w) => w.url),
      },
      null,
      2
    ),
    'utf8'
  );
}

main();
