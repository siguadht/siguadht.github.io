const icons = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  folder: '<path d="M3 6h7l2 2h9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  file: '<path d="M6 2h8l4 4v16H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM14 2v5h5M8 12h8M8 16h8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3-7 8-7s8 3 8 7"/>',
  arrow: '<path d="M5 19 19 5M9 5h10v10"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
const projects = [
  {name:'拍拍搭',category:'AI 产品探索',description:'可交互的 AI 空间软装设计演示。',tags:['AI 产品','空间设计','Python'],url:'https://github.com/siguadht/paipada',group:'ai'},
  {name:'演练 AI 销售教练',category:'AI 产品探索',description:'双角色销售情景练习，包含实时语音、反馈与场景训练。',tags:['Agent','语音交互','销售训练'],url:'https://github.com/siguadht/yanlian-ai-sales-coach',group:'ai'},
  {name:'造物坊',category:'AI 产品探索',description:'从想法到交付的 AI 工作台，集成 Bot、会话任务与工作区文件。',tags:['AI 工作台','Bot','Rust'],url:'https://github.com/siguadht/zaowufang',group:'ai'},
  {name:'课程笔记整理 Skill',category:'开源效率工具',description:'整合课程材料；确认大纲后生成 HTML 笔记，并同步飞书文档。',tags:['Codex Skill','知识整理','Python'],url:'https://github.com/siguadht/course-notes-organizer',group:'tools'},
  {name:'简历包装 Skill',category:'开源效率工具',description:'根据真实经历与目标岗位梳理简历，核对成果口径，并输出适合求职方向的内容。',tags:['Codex Skill','简历优化','求职材料'],url:'https://github.com/siguadht/resume-packager',group:'tools'}
];
const articles = [
  {name:'Manus 2.0、Cue 和 Muse 刚发布，普通人该怎么试',url:'https://mp.weixin.qq.com/s/c5d3YwNQ5Se2SZHSw_vw7Q'},
  {name:'Today AI 值不值得用，和 Manus、Muse、Grok Bot 怎么选',url:'https://mp.weixin.qq.com/s/msEZG31NzrPDUaWhQIsLAA'},
  {name:'AI时代，能把陌生事学会的人更值钱',url:'https://mp.weixin.qq.com/s/J2XQIvCxhjcKhyWJDvSh5Q'},
  {name:'AI 写歌越来越容易，为什么下载还要算次数？',description:'从 AI 音乐工具的使用体验，讨论创作自由与下载规则。',date:'2026.09.13',url:'https://mp.weixin.qq.com/s/pArf3HcNRiE6EMCwJGoKOg'},
  {name:'GPT-6 Astra 的思维链更难监控，AI 产品该信哪一份记录',description:'围绕模型思维链监控，思考 AI 产品里的过程记录与信任。',date:'2026.09.05',url:'https://mp.weixin.qq.com/s/6_Wc8fhjUE0uchZ9kbGVXA'},
  {name:'机器人开始像手机安装应用一样下载新动作',description:'从机器人动作技能的下载与复用，看具身智能的产品形态。',date:'2026.09.02',url:'https://mp.weixin.qq.com/s/xnU9vuzfoZP4QjJZatmSVA'}
];
const main = document.querySelector('#page-content');
const nav = document.querySelector('#side-nav');
const sidebar = document.querySelector('#site-sidebar');
const scrim = document.querySelector('#sidebar-scrim');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let projectOpen = true;
let writingOpen = true;

function currentPage(){
  const file = location.pathname.split('/').pop() || 'index.html';
  if (file === 'project.html' || file === 'product.html') return 'projects';
  if (file === 'blog.html' || file === 'essay.html') return 'writing';
  if (file === 'about.html') return 'about';
  if (file === '404.html') return 'missing';
  if (file === 'index.html') return 'home';
  return 'missing';
}
function link(href,label,name,active){return `<a class="nav-link ${active?'active':''}" href="${href}"><span class="nav-icon">${icon(name)}</span>${label}</a>`}
function group(id,label,name,active,open,items){return `<div class="nav-section"><button class="nav-group-button ${active?'active':''}" type="button" data-group="${id}" aria-expanded="${open}"><span class="nav-icon">${icon(name)}</span>${label}<span class="chevron">⌄</span></button><div class="nav-sublist" ${open?'':'hidden'}>${items.map(item=>`<a class="nav-sub ${item.active?'active':''}" href="${item.href}">${item.label}</a>`).join('')}</div></div>`}
function renderNav(page){
  const tools = location.hash === '#tools';
  const file = location.pathname.split('/').pop();
  nav.innerHTML = link('index.html','首页','home',page==='home') +
    group('projects','开源项目','folder',page==='projects',projectOpen,[
      {href:'product.html',label:'AI 产品探索',active:file==='product.html'},
      {href:'project.html#tools',label:'开源效率工具',active:page==='projects' && tools}
    ]) +
    group('writing','文字与思考','file',page==='writing',writingOpen,[
      {href:'blog.html',label:'公众号文章',active:file==='blog.html'},
      {href:'essay.html',label:'随笔与观察',active:file==='essay.html'}
    ]) +
    `<div class="nav-section">${link('about.html','关于我','user',page==='about')}${link('about.html#contact','联系与关注','arrow',false)}</div>`;
}
function projectCard(p){return `<a class="content-card" href="${p.url}" target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看${p.name}"><div class="card-top"><span class="card-category">${p.category}</span><span class="card-arrow" aria-hidden="true">↗</span></div><h2>${p.name}</h2><p>${p.description}</p><div class="card-meta">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div></a>`}
function articleCard(a){return `<a class="content-card" href="${a.url}" target="_blank" rel="noopener noreferrer" aria-label="在微信公众号阅读${a.name}"><div class="card-top"><span class="card-category">微信公众号 · 丝瓜蛋花汤</span><span class="card-arrow" aria-hidden="true">↗</span></div><h2>${a.name}</h2>${a.description?`<p>${a.description}</p>`:''}${a.date?`<div class="card-meta"><span>${a.date}</span><span>产品观察</span></div>`:''}</a>`}
function home(){return `<section class="home-page"><span class="comet one"></span><span class="comet two"></span><span class="comet three"></span><div class="home-inner page-enter"><div class="hero-head"><div><span class="eyebrow">你好，欢迎来到我的个人空间</span><h1 class="hero-title">我是张骏</h1><p class="hero-role">AI 产品经理，关注用户体验与产品价值。</p><p class="hero-copy">把真实需求变成可用的产品，也持续记录对 AI 的观察。<br>这里收集我做过的项目、写下的思考，以及仍在探索的过程。</p></div><img class="hero-photo" src="image/avatar.jpg" alt="张骏的照片"></div><div class="hero-actions"><a href="project.html">${icon('folder')}查看我的开源项目</a><a href="blog.html">${icon('file')}阅读我的文字</a><a href="about.html">${icon('user')}多了解我一点</a></div><p class="social-caption">也可以在这些地方找到我</p><div class="social-row"><a href="https://github.com/siguadht" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.31-3.76-1.31-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 .1.84-2.6 2.54-3.13-2.48-.28-5.1-1.24-5.1-5.54 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.97 0 0 .95-.3 3.08 1.15a10.6 10.6 0 0 1 5.6 0c2.13-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.69.11 2.97.72.79 1.16 1.79 1.16 3.02 0 4.31-2.62 5.25-5.12 5.53.79.69 1.49 1.6 1.49 3.23v4.8c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>GitHub</a><a href="about.html#contact">${icon('file')}公众号 · 丝瓜蛋花汤</a></div><p class="home-note">项目代码在 GitHub，文章原文在微信公众号。</p></div></section>`}
function projectsPage(){
  const tools = location.hash === '#tools';
  const ai = location.pathname.endsWith('/product.html');
  const list = tools ? projects.filter(p=>p.group==='tools') : ai ? projects.filter(p=>p.group==='ai') : projects;
  return `<section class="inner-page"><div class="content-column page-enter"><p class="page-kicker">OPEN SOURCE / SELECTED WORK</p><h1 class="page-title">开源项目</h1><p class="page-description">从产品想法到可交互的实现。点击项目卡片，可前往 GitHub 查看代码与说明。</p><div class="section-label">${tools?'开源效率工具':'项目与实验'} · ${list.length}</div><div class="card-list">${list.map(projectCard).join('')}</div><p class="page-footer">持续更新中 · 更多代码与进展见 <a href="https://github.com/siguadht" target="_blank" rel="noopener noreferrer">GitHub ↗</a></p></div></section>`
}
function writingPage(){return `<section class="inner-page"><div class="content-column page-enter"><p class="page-kicker">WRITING / NOTES</p><h1 class="page-title">文字与思考</h1><p class="page-description">关于 AI 产品、技术变化与真实体验的观察。点击文章卡片，前往微信公众号阅读原文。</p><div class="section-label">公众号文章 · ${articles.length}</div><div class="card-list">${articles.map(articleCard).join('')}</div><p class="page-footer">文章发布于公众号「丝瓜蛋花汤」。</p></div></section>`}
function aboutPage(){return `<section class="inner-page"><div class="content-column page-enter"><p class="page-kicker">ABOUT / CONNECT</p><h1 class="page-title">关于我</h1><p class="page-description">保持热忱与希望，一起奔向远方。</p><div class="about-panel"><h2>你好，我是张骏</h2><p>一名 AI 产品经理。我关心产品如何理解真实需求，也喜欢把新的技术能力做成可以亲手体验的东西。</p><p>工作与个人项目里，我持续探索 AI 产品设计、Agent 交互与原型验证；在这里分享项目和文章，留下每一步思考。</p></div><div class="about-panel"><h2>我在做的事</h2><ul><li>打磨 AI 产品，把想法带到可验证、可使用的形态。</li><li>研究新产品与技术，整理问题、方案和反馈。</li><li>维护公开项目，在公众号记录观察与思考。</li></ul></div><div class="contact-block" id="contact"><div class="section-label">联系与关注</div><div class="contact-grid"><div class="contact-tile"><small>邮箱</small><a href="mailto:2022534430@qq.com">2022534430@qq.com</a></div><div class="contact-tile"><small>GitHub</small><a href="https://github.com/siguadht" target="_blank" rel="noopener noreferrer">github.com/siguadht ↗</a></div><div class="contact-tile qr-card"><img src="image/wechat-qr.jpg" alt="丝瓜蛋花汤公众号二维码"><span>扫码关注公众号<br>「丝瓜蛋花汤」</span></div><div class="contact-tile"><small>个人微信</small><span>zj18134698839</span></div></div></div></div></section>`}
function missingPage(){return `<section class="inner-page"><div class="content-column page-enter"><p class="page-kicker">PAGE NOT FOUND</p><h1 class="page-title">404 · 页面不存在</h1><p class="page-description">这个页面可能已经移动。可以返回首页，继续浏览项目与文章。</p><div class="hero-actions"><a href="index.html">${icon('home')}返回首页</a><a href="project.html">${icon('folder')}查看项目</a><a href="blog.html">${icon('file')}阅读文章</a></div></div></section>`}
function closeSidebar(){sidebar.classList.remove('open');scrim.classList.remove('open');document.body.style.overflow=''}
function render(){
  const page=currentPage();
  const labels={home:'首页',projects:'开源项目',writing:'文字与思考',about:'关于我',missing:'页面不存在'};
  document.querySelector('#current-crumb').textContent=labels[page];
  document.title=`${labels[page]} · 张骏`;
  renderNav(page);
  main.innerHTML={home,projects:projectsPage,writing:writingPage,about:aboutPage,missing:missingPage}[page]();
  closeSidebar();
  if(location.hash==='#contact') requestAnimationFrame(()=>document.querySelector('#contact')?.scrollIntoView());
  else window.scrollTo({top:0,behavior:'instant'});
}
document.addEventListener('click',event=>{
  const groupButton=event.target.closest('[data-group]');
  if(groupButton){const expanded=groupButton.getAttribute('aria-expanded')==='true';groupButton.setAttribute('aria-expanded',String(!expanded));groupButton.nextElementSibling.hidden=expanded;if(groupButton.dataset.group==='projects')projectOpen=!expanded;else writingOpen=!expanded;return}
  const anchor=event.target.closest('a[href]');
  if(!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target==='_blank')return;
  const dest=new URL(anchor.href,location.href);
  if(dest.origin!==location.origin || !dest.pathname.endsWith('.html'))return;
  event.preventDefault();
  if(dest.href!==location.href)history.pushState(null,'',dest.href);
  render();
});
document.querySelector('#mobile-menu').addEventListener('click',()=>{sidebar.classList.add('open');scrim.classList.add('open');document.body.style.overflow='hidden'});
document.querySelector('#sidebar-close').addEventListener('click',closeSidebar);
scrim.addEventListener('click',closeSidebar);
document.querySelector('#replay-animation').addEventListener('click',()=>{if(reducedMotion.matches)return;const animated=main.querySelector('.page-enter');if(animated){animated.style.animation='none';void animated.offsetWidth;animated.style.animation=''}});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSidebar()});
window.addEventListener('popstate',render);
render();
