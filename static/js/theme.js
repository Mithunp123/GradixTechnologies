(function () {
  var body = document.body;
  if (!body) return;

  var savedTheme = localStorage.getItem('theme');
  var isLight = savedTheme === 'light';

  if (isLight) {
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
  }

  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.checked = isLight;
  themeToggle.addEventListener('change', function () {
    if (themeToggle.checked) {
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
})();
