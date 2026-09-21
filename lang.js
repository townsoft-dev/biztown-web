// Chuyển Việt/Anh ngay trên trang, không tải lại: mỗi khối nội dung gắn
// `data-lang="vi"` hoặc `"en"`. Mặc định tiếng Việt; nhớ lựa chọn trong
// localStorage để người dùng không phải bấm lại mỗi trang.
(function () {
  var KEY = 'biztown-lang';
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
    try { localStorage.setItem(KEY, lang); } catch (e) { /* chế độ riêng tư */ }
  }
  var saved = 'vi';
  try { saved = localStorage.getItem(KEY) || 'vi'; } catch (e) { /* bỏ qua */ }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.set); });
    });
    apply(saved === 'en' ? 'en' : 'vi');
  });
})();
