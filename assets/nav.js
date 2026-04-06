(function(){
  function setupMobileNav(){
    const siteNav = document.getElementById('site-nav');
    if(!siteNav || siteNav.dataset.mobileReady === 'true') return;
    siteNav.dataset.mobileReady = 'true';

    const linksWrap = document.createElement('div');
    linksWrap.className = 'nav-links';

    while(siteNav.firstChild){
      linksWrap.appendChild(siteNav.firstChild);
    }

    const brand = document.createElement('a');
    brand.href = '/';
    brand.className = 'nav-brand';
    brand.setAttribute('aria-label', 'The Plateau Publishing Co. home');
    brand.innerHTML = '<img src="/assets/PlateauPublishingCoLogoBlack.png" alt="The Plateau Publishing Co." />';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'site-nav-links');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    linksWrap.id = 'site-nav-links';
    siteNav.appendChild(brand);
    siteNav.appendChild(toggle);
    siteNav.appendChild(linksWrap);

    function closeMenu(){
      siteNav.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }

    function openMenu(){
      siteNav.classList.add('menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
    }

    toggle.addEventListener('click', function(){
      if(siteNav.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });

    document.addEventListener('click', function(e){
      if(!siteNav.contains(e.target)) closeMenu();
    });

    window.addEventListener('resize', function(){
      if(!siteNav.classList.contains('menu-open')){
        siteNav.querySelectorAll('.has-dropdown').forEach(function(item){ item.classList.remove('submenu-open'); });
      }
    });

    linksWrap.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        if(!link.closest('.has-dropdown')) closeMenu();
      });
    });

    linksWrap.querySelectorAll('.has-dropdown').forEach(function(item){
      const trigger = item.querySelector(':scope > a');
      if(!trigger) return;

      trigger.addEventListener('click', function(e){
        if(!item.classList.contains('submenu-open')){
          e.preventDefault();
          linksWrap.querySelectorAll('.has-dropdown').forEach(function(other){
            if(other !== item) other.classList.remove('submenu-open');
          });
          item.classList.add('submenu-open');
        }
      });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupMobileNav);
  else setupMobileNav();
})();
