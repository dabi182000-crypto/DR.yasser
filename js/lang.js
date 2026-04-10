/* Language toggle: AR (rtl, Tajawal) <-> EN (ltr, Poppins) */
(function () {
  const STORAGE_KEY = 'dryasser-lang';
  const html = document.documentElement;
  const body = document.body;
  const btn = document.getElementById('lang-toggle');

  function apply(lang) {
    const isAr = lang === 'ar';
    html.lang = isAr ? 'ar' : 'en';
    html.dir = isAr ? 'rtl' : 'ltr';
    body.classList.toggle('lang-ar', isAr);
    body.classList.toggle('lang-en', !isAr);
    if (btn) btn.textContent = isAr ? 'EN' : 'AR';

    // Swap text content
    document.querySelectorAll('[data-ar][data-en]').forEach((el) => {
      const value = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (value == null) return;
      // <title> uses textContent; <meta> uses content attr
      if (el.tagName === 'META') {
        el.setAttribute('content', value);
      } else {
        el.textContent = value;
      }
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  // Init from storage (default Arabic)
  let initial = 'ar';
  try { initial = localStorage.getItem(STORAGE_KEY) || 'ar'; } catch (e) {}
  apply(initial);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = body.classList.contains('lang-ar') ? 'en' : 'ar';
      apply(next);
    });
  }
})();
