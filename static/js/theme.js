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

  function applyTheme(isLightTheme) {
    body.classList.toggle('light-theme', isLightTheme);
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    syncThemeAssets(isLightTheme);
  }

  var savedTheme = localStorage.getItem('theme');
  var isLight = savedTheme === 'light';
  applyTheme(isLight);

  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  var isCheckboxToggle =
    themeToggle.tagName === 'INPUT' &&
    themeToggle.getAttribute('type') === 'checkbox';

  if (isCheckboxToggle) {
    themeToggle.checked = isLight;
    themeToggle.addEventListener('change', function () {
      applyTheme(themeToggle.checked);
    });
    return;
  }

  themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
  themeToggle.addEventListener('click', function () {
    var useLightTheme = !body.classList.contains('light-theme');
    applyTheme(useLightTheme);
    themeToggle.setAttribute('aria-pressed', useLightTheme ? 'true' : 'false');
  });
})();
