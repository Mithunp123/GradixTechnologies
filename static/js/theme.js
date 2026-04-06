(function () {
  var body = document.body;
  if (!body) return;

  var lightLogoPath = 'static/images/gradix_dark.png';
  var darkLogoPath = 'static/images/gradix_light.png';

  function syncThemeAssets(isLightTheme) {
    var logoImages = document.querySelectorAll('.header__logo img, .footer-top__logo img');
    logoImages.forEach(function (img) {
      var currentSrc = img.getAttribute('src') || '';
      if (currentSrc.indexOf('gradix_light.png') === -1 && currentSrc.indexOf('gradix_dark.png') === -1) {
        return;
      }
      img.setAttribute('src', isLightTheme ? lightLogoPath : darkLogoPath);
    });
  }

  var savedTheme = localStorage.getItem('theme');
  var isLight = savedTheme === 'light';

  body.classList.toggle('light-theme', isLight);
  syncThemeAssets(isLight);

  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.checked = isLight;
  themeToggle.addEventListener('change', function () {
    var useLightTheme = themeToggle.checked;
    body.classList.toggle('light-theme', useLightTheme);
    localStorage.setItem('theme', useLightTheme ? 'light' : 'dark');
    syncThemeAssets(useLightTheme);
  });
})();