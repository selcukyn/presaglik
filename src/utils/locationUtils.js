// Haversine formülü ile iki nokta arası mesafe hesaplama (km cinsinden)
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Dünya'nın yarıçapı (km)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value) {
  return value * Math.PI / 180;
}

export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

export function formatLocationCard(location) {
  return `
    <div class="flex justify-between items-start">
      <div>
        <div class="flex items-center">
          <span class="text-2xl mr-2">${location.type === 'hastane' ? '🏥' : '💊'}</span>
          <h3 class="text-lg font-semibold text-gray-900">${location.name}</h3>
        </div>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          location.contract 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        } mt-2">
          ${location.contract ? 'Anlaşmalı' : 'Anlaşmasız'}
        </span>
        ${location.distance ? `
          <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            ${location.distance.toFixed(1)} km
          </span>
        ` : ''}
      </div>
    </div>

    <div class="mt-4 space-y-2">
      <p class="text-sm text-gray-500">
        <span class="font-medium">Adres:</span> ${location.address}
      </p>
      <p class="text-sm text-gray-500">
        <span class="font-medium">Şehir/İlçe:</span> ${location.city}/${location.district}
      </p>
      ${location.iletisim ? `
        <p class="text-sm text-gray-500">
          <span class="font-medium">İletişim:</span> 
          <a href="tel:${location.iletisim}" class="text-blue-600 hover:text-blue-800">
            ${location.iletisim}
          </a>
        </p>
      ` : ''}
    </div>

    <div class="mt-4">
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}&destination_place_id=${encodeURIComponent(location.name)}"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        Yol Tarifi
      </a>
    </div>
  `;
}
