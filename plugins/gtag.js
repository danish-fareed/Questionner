// plugins/gtag.js
export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // Load Google Analytics script
    (function () {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TVYKBZ15RV';
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-TVYKBZ15RV');
      };
    })();
  }
});
