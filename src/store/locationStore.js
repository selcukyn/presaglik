// Durum yönetimi için basit bir store
class LocationStore {
  constructor() {
    this.locations = [
      {
        "name": "BİLGE ECZANESİ",
        "type": "eczane",
        "city": "ADANA",
        "district": "SEYHAN",
        "address": "Bahçelievler Mahallesi Mehmet Akif Ersoy Caddesi No:74",
        "contract": true,
        "latitude": 36.9999228,
        "longitude": 35.2896844,
        "iletisim": "02164468206"
      },
      {
        "name": "LOKMAN HEKİM AKAY HASTANESİ TEVKİFATSIZ",
        "type": "hastane",
        "city": "ANKARA",
        "district": "ÇANKAYA",
        "address": "AKAY CAD. BÜKLÜM SOK. NO:4 KAVAKLIDERE/ANKARA",
        "contract": true,
        "latitude": 39.9131629,
        "longitude": 32.8556042
      }
    ];
  }

  getLocations() {
    return this.locations;
  }

  getCities() {
    return [...new Set(this.locations.map(loc => loc.city))].sort();
  }

  getDistrictsByCity(city) {
    return [...new Set(
      this.locations
        .filter(loc => loc.city === city)
        .map(loc => loc.district)
    )].sort();
  }

  getTypes() {
    return [...new Set(this.locations.map(loc => loc.type))];
  }
}

export const locationStore = new LocationStore();
