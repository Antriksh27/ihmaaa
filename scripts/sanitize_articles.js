const fs = require('fs');

let content = fs.readFileSync('src/content/articles.ts', 'utf8');

// Replace relative downloads/ and images/
content = content.replace(/href=\\"downloads\//g, 'href=\\"/downloads/');
content = content.replace(/href='downloads\//g, "href='/downloads/");
content = content.replace(/href=\\"images\//g, 'href=\\"/images/');
content = content.replace(/src=\\"images\\\\/g, 'src=\\"/images/');
content = content.replace(/src=\\"images\//g, 'src=\\"/images/');

// Fix &amp; inside downloads hrefs
content = content.replace(/href=\\"\/downloads\/([^\\"]*)\\"/g, (match, path) => {
  const cleanPath = path.replace(/&amp;/g, '&');
  return `href=\\"/downloads/${cleanPath}\\"`;
});

fs.writeFileSync('src/content/articles.ts', content, 'utf8');
console.log('Sanitized articles.ts successfully!');
