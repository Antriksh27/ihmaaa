const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');

function checkFileExists(relPath) {
  const clean = decodeURIComponent(relPath.replace(/^\//, '').split('?')[0]);
  return fs.existsSync(path.join(publicDir, clean));
}

// 1. Check all images in articles.ts
const articlesContent = fs.readFileSync('src/content/articles.ts', 'utf8');
const imgMatches = articlesContent.match(/src=["']([^"']+)["']/g) || [];
const brokenArticleImages = [];
imgMatches.forEach((m) => {
  const src = m.match(/src=["']([^"']+)["']/)[1];
  if (src.startsWith('/') && !checkFileExists(src)) {
    brokenArticleImages.push(src);
  }
});

// 2. Check all images in sponsors.ts
const sponsorsContent = fs.readFileSync('src/content/sponsors.ts', 'utf8');
const spMatches = sponsorsContent.match(/image:\s*['"]([^'"]+)['"]/g) || [];
const brokenSponsorImages = [];
spMatches.forEach((m) => {
  const src = m.match(/image:\s*['"]([^'"]+)['"]/)[1];
  if (src.startsWith('/') && !checkFileExists(src)) {
    brokenSponsorImages.push(src);
  }
});

// 3. Check all images in office-bearers.ts
const obContent = fs.readFileSync('src/content/office-bearers.ts', 'utf8');
const obMatches = obContent.match(/image:\s*['"]([^'"]+)['"]/g) || [];
const brokenObImages = [];
obMatches.forEach((m) => {
  const src = m.match(/image:\s*['"]([^'"]+)['"]/)[1];
  if (src.startsWith('/') && !checkFileExists(src)) {
    brokenObImages.push(src);
  }
});

console.log('Broken Article Images (' + brokenArticleImages.length + '):', brokenArticleImages);
console.log('Broken Sponsor Images (' + brokenSponsorImages.length + '):', brokenSponsorImages);
console.log('Broken Office Bearer Images (' + brokenObImages.length + '):', brokenObImages);
