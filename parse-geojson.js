const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('schools_risk_final (2).geojson', 'utf8'));
  const provinces = {};

  data.features.forEach(f => {
    const p = f.properties.province;
    const sName = f.properties.name;
    
    if (p && sName) {
      if (!provinces[p]) {
        provinces[p] = { SD: [], SMP: [], SMA: [], Lainnya: [] };
      }
      const lowerName = sName.toLowerCase();
      if (lowerName.includes('sd') && !lowerName.includes('smp')) {
        provinces[p].SD.push(sName);
      } else if (lowerName.includes('smp')) {
        provinces[p].SMP.push(sName);
      } else if (lowerName.includes('sma') || lowerName.includes('smk')) {
        provinces[p].SMA.push(sName);
      } else {
        provinces[p].Lainnya.push(sName);
      }
    }
  });

  const finalProvinces = {};
  
  Object.keys(provinces).forEach(p => {
    const sds = Array.from(new Set(provinces[p].SD)).slice(0, 50);
    const smps = Array.from(new Set(provinces[p].SMP)).slice(0, 50);
    const smas = Array.from(new Set(provinces[p].SMA)).slice(0, 50);
    const others = Array.from(new Set(provinces[p].Lainnya)).slice(0, 50);
    
    finalProvinces[p] = [...sds, ...smps, ...smas, ...others].sort();
  });

  fs.writeFileSync('src/lib/province_schools.json', JSON.stringify(finalProvinces, null, 2));
  console.log('Successfully generated province_schools.json with ' + Object.keys(finalProvinces).length + ' provinces, mixed school types');
} catch(e) {
  console.error("Error parsing geojson:", e);
}
