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
        class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
      >
        Yol Tarifi
        <svg class="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      </a>
    </div>
  `;
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
