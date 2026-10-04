(() => {
  const dialog = document.querySelector('#image-dialog');
  const image = dialog.querySelector('img');
  let previousFocus;
  document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    previousFocus = button; image.src = button.dataset.zoom;
    image.alt = button.querySelector('img')?.alt || 'Nexus 当前用户端界面';
    dialog.showModal();
  }));
  const close = () => { dialog.close(); previousFocus?.focus(); };
  dialog.querySelector('.dialog-close').addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box=dialog.getBoundingClientRect(); if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)close(); } });
  dialog.addEventListener('close', () => previousFocus?.focus());
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);} }), {threshold:.08});
    document.querySelectorAll('.section-heading,.statement-body,.quiet-grid,.download-heading').forEach(element => {element.classList.add('reveal');observer.observe(element);});
  }
  let timer;
  document.querySelectorAll('[data-download]').forEach(link => link.addEventListener('click', () => {
    const status=document.querySelector('.download-status');
    status.textContent='正在请求 macOS 安装包，请查看浏览器下载列表。';
    status.classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>status.classList.remove('visible'),5000);
  }));
})();
