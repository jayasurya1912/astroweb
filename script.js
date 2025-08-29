     
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 500); // 2.8 sec delay
  });
   
   function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ta,hi,fr,de,es,it,zh-CN,ar',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    }


 
     AOS.init();

      (function () {
      const onReady = (fn) => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', fn);
        } else {
          fn();
        }
      };

      onReady(() => {
        const els = document.querySelectorAll('.counter-number[data-target]');
        if (!els.length) return;

        function animate(el, target, duration = 1400) {
          const start = 0;
          const startTime = performance.now();

          function frame(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(start + (target - start) * progress);
            el.textContent = value.toLocaleString();
            if (progress < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        }

        function parseTarget(el) {
          const raw = el.getAttribute('data-target') || '0';
          const cleaned = raw.toString().replace(/[^0-9.]/g, '');
          const n = parseFloat(cleaned);
          return isNaN(n) ? 0 : n;
        }

        const startIfVisible = (el) => {
          if (el.dataset.counted === '1') return;
          el.dataset.counted = '1';
          animate(el, parseTarget(el));
        };

        if ('IntersectionObserver' in window) {
          const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                startIfVisible(entry.target);
                io.unobserve(entry.target);
              }
            });
          }, { threshold: 0.4 });

          els.forEach((el) => io.observe(el));
        } else {
          els.forEach(startIfVisible);
        }
      });
    })();
