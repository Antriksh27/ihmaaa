const http = require('http');

http.get('http://localhost:3000/', (res) => {
  console.log('GET / => Status:', res.statusCode);
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const cssMatches = html.match(/href="(\/_next\/static\/css\/[^"]+)"/g);
    console.log('CSS matches:', cssMatches);
    if (cssMatches) {
      cssMatches.forEach(m => {
        const href = m.replace('href="', '').replace('"', '');
        http.get('http://localhost:3000' + href, (cssRes) => {
          console.log(href, '=> Status:', cssRes.statusCode, 'Type:', cssRes.headers['content-type']);
        });
      });
    }
  });
});
