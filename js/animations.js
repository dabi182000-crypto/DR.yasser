/* GSAP scroll-driven hero: pin the hero, swap 3 scenes as the user scrolls */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 960px)').matches;
  if (reduce || isMobile) return; // simple stacked fallback handled in CSS / left as default

  const hero = document.querySelector('.hero');
  const sceneA = document.querySelector('.scene-a');
  const sceneB = document.querySelector('.scene-b');
  const sceneC = document.querySelector('.scene-c');
  if (!hero || !sceneA || !sceneB || !sceneC) return;

  // Disable CSS float animation — GSAP handles it from here
  document.querySelectorAll('.orbit-label').forEach(el => {
    el.style.animation = 'none';
  });

  // Initial state
  gsap.set(sceneA, { opacity: 1, y: 0 });
  gsap.set(sceneB, { opacity: 0, y: 60 });
  gsap.set(sceneC, { opacity: 0, x: 80 });
  gsap.set('.orbit-label', { opacity: 0, scale: 0.6 });

  // Pinned timeline — total scroll distance ~ 3 viewports
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '+=2400',
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
    },
  });

  // A -> B
  tl.to(sceneA, { opacity: 0, y: -60, duration: 1 }, 0)
    .to(sceneB, { opacity: 1, y: 0, duration: 1 }, 0.4)
    .to('.orbit-label', { opacity: 1, scale: 1, duration: 1, stagger: 0.08 }, 0.6)
    // hold B
    .to({}, { duration: 0.6 })
    // B -> C
    .to(sceneB, { opacity: 0, y: -60, duration: 1 }, '>')
    .to('.orbit-label', { opacity: 0, scale: 0.7, duration: 0.6 }, '<')
    .to(sceneC, { opacity: 1, x: 0, duration: 1 }, '<+0.2');

  // Floating loop for orbit icons (independent of scroll)
  gsap.utils.toArray('.orbit-label').forEach((el, i) => {
    gsap.to(el, {
      y: '+=12',
      rotation: i % 2 === 0 ? 4 : -4,
      duration: 2.4 + (i % 4) * 0.3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: i * 0.15,
    });
  });

  // Hide scroll hint after first scroll
  const hint = document.querySelector('.scroll-hint');
  if (hint) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'top+=80 top',
      onEnter: () => gsap.to(hint, { opacity: 0, duration: 0.4 }),
      onLeaveBack: () => gsap.to(hint, { opacity: 0.85, duration: 0.4 }),
    });
  }
})();
