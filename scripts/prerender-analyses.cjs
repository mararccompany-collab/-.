const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const indexHtml = path.join(dist, 'index.html');
const outDir = path.join(dist, 'analyses');

if (!fs.existsSync(indexHtml)) {
  console.log('dist/index.html not found, build first');
  process.exit(0);
}

const html = fs.readFileSync(indexHtml, 'utf8');

// Simple replace title and meta description for /analyses page
let out = html.replace(/<title>[\s\S]*?<\/title>/, '<title>تحليلات اليوم — العرباوية ماتش</title>');
if (out.indexOf('name="description"') === -1) {
  out = out.replace('</head>', '  <meta name="description" content="تحليلات يومية للمباريات: توقعات، احتمالات، وملاحظات خبيرية قابلة للمشاركة." />\n</head>');
} else {
  out = out.replace(/<meta name="description"[\s\S]*?>/, '<meta name="description" content="تحليلات يومية للمباريات: توقعات، احتمالات، وملاحظات خبيرية قابلة للمشاركة." />');
}

// Ensure directory exists
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), out, 'utf8');
console.log('Prerendered /analyses -> dist/analyses/index.html');
