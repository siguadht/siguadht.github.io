// 千泷的个人主页 —— 侧边栏文章搜索
(function () {
  // 文章索引：标题 + 链接
  const POSTS = [
    { title: 'AI 写歌越来越容易，为什么下载还要算次数？', url: 'https://mp.weixin.qq.com/s/pArf3HcNRiE6EMCwJGoKOg', date: '2026-09-13', cat: '随笔' },
    { title: 'GPT-6 Astra 的思维链更难监控，AI 产品该信哪一份记录', url: 'https://mp.weixin.qq.com/s/6_Wc8fhjUE0uchZ9kbGVXA', date: '2026-09-05', cat: '随笔' },
    { title: '机器人开始像手机安装应用一样下载新动作', url: 'https://mp.weixin.qq.com/s/xnU9vuzfoZP4QjJZatmSVA', date: '2026-09-02', cat: '随笔' },
  ];

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  document.querySelectorAll('.search-box').forEach(function (box) {
    var input = box.querySelector('input[type="search"]');
    var results = box.querySelector('.search-results');
    if (!input || !results) return;

    function render(q) {
      var kw = q.trim().toLowerCase();
      if (!kw) { results.classList.remove('show'); return; }
      var hits = POSTS.filter(function (p) {
        return p.title.toLowerCase().indexOf(kw) !== -1;
      });
      var html = '';
      if (hits.length === 0) {
        html = '<li class="empty">没有找到相关文章</li>';
      } else {
        hits.forEach(function (p) {
          html += '<li><a href="' + p.url + '" target="_blank" rel="noopener">' +
            '<div class="r-title">' + escapeHtml(p.title) + '</div>' +
            '<div class="r-meta">' + p.date + ' · ' + p.cat + '</div>' +
            '</a></li>';
        });
      }
      results.innerHTML = html;
      results.classList.add('show');
    }

    input.addEventListener('input', function () { render(input.value); });
    input.addEventListener('focus', function () { if (input.value.trim()) render(input.value); });

    document.addEventListener('click', function (e) {
      if (!box.contains(e.target)) results.classList.remove('show');
    });
  });
})();
