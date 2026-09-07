const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
if (!fs.existsSync(dbPath)) {
  console.log('db.json does not exist');
  process.exit(0);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.products = db.products.map((p) => ({
  ...p,
  image: `/products/${p.slug}.jpg`,
}));

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Updated db.json product images to /products/{slug}.jpg');
