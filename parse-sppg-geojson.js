const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('sppg_existing (1).geojson', 'utf8'));
  const provinces = {};

  data.features.forEach(f => {
    const p = f.properties.provinsi;
    const sName = f.properties.nama_sppg;
    
    if (p && sName) {
      // Clean up the name (remove newlines etc)
      const cleanName = sName.replace(/\r?\n|\r/g, " ").trim();
      if (!provinces[p]) {
        provinces[p] = [];
      }
      provinces[p].push(cleanName);
    }
  });

  // Unique and limit
  Object.keys(provinces).forEach(p => {
    provinces[p] = Array.from(new Set(provinces[p])).sort().slice(0, 200);
  });

  fs.writeFileSync('src/lib/province_sppg.json', JSON.stringify(provinces, null, 2));
  console.log('Successfully generated province_sppg.json with ' + Object.keys(provinces).length + ' provinces');
} catch(e) {
  console.error("Error parsing geojson:", e);
}
