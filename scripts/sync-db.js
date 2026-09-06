const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
if (!fs.existsSync(dbPath)) {
  console.log('db.json does not exist');
  process.exit(0);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const imgMap = {
  'nag-champa-aarti': '/nag_champa_box.jpg',
  'mysore-chandan': '/mysore_chandan_box.jpg',
  'gulab-raj': '/vedasakti_rose.jpg',
  'loban-resin': '/vedasakti_craft.jpg',
  'mogra-raat': '/vedasakti_rose.jpg',
  'kapur-jyoti': '/vedasakti_hero.jpg',
  'tulsi-vana': '/vedasakti_chandan.jpg',
  'kewra-ghar': '/vedasakti_rose.jpg',
  'ganesh-utsav-kit': '/vedasakti_hero.jpg',
  'nitya-box': '/mysore_chandan_box.jpg',
  'oud-ruh': '/vedasakti_craft.jpg'
};

db.products = db.products.map(p => {
  return {
    ...p,
    image: imgMap[p.slug] || '/nag_champa_box.jpg'
  };
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated db.json with real photography image paths!');
