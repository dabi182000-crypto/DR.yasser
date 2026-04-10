/* GSAP scroll-driven hero: pin + scrub on desktop, fade-in on mobile */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const isMobile = window.matchMedia('(max-width: 960px)').matches;

  const hero   = document.querySelector('.hero');
  const sceneA = document.querySelector('.scene-a');
  const sceneB = document.querySelector('.scene-b');
  const sceneC = document.querySelector('.scene-c');
  if (!hero || !sceneA || !sceneB || !sceneC) return;

  // Disable CSS float animation — GSAP handles floating
  document.querySelectorAll('.orbit-label').forEach(el => {
    el.style.animation = 'none';
  });

  if (isMobile) {
    /* ── Mobile: stacked scenes, fade-in on scroll ── */

    // Initial states
    gsap.set(sceneA, { opacity: 0, y: 40 });
    gsap.set(sceneB, { opacity: 0, y: 40 });
    gsap.set(sceneC, { opacity: 0, y: 40 });
    gsap.set('.orbit-label', { opacity: 0, scale: 0.7 });

    // Scene A fades in on load; fades back in when scrolling back to top
    gsap.to(sceneA, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });

    ScrollTrigger.create({
      trigger: sceneA,
      start: 'bottom 20%',        // when scene A bottom leaves top area (scrolled away)
      onLeave:     () => gsap.to(sceneA, { opacity: 0, y: -30, duration: 0.5, ease: 'power2.in' }),
      onEnterBack: () => gsap.to(sceneA, { opacity: 1, y: 0,   duration: 0.6, ease: 'power2.out' }),
    });

    // Scene B fades in when scrolled into view, fades out when scrolling back up
    ScrollTrigger.create({
      trigger: sceneB,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(sceneB, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
        gsap.to('.orbit-label', {
          opacity: 1, scale: 1, duration: 0.5,
          stagger: 0.06, ease: 'back.out(1.4)', delay: 0.3
        });
      },
      onLeaveBack: () => {
        gsap.to(sceneB, { opacity: 0, y: 40, duration: 0.5, ease: 'power2.in' });
        gsap.to('.orbit-label', { opacity: 0, scale: 0.7, duration: 0.35, stagger: 0.04 });
      },
    });

    // Scene C fades in when scrolled into view, fades out when scrolling back up
    ScrollTrigger.create({
      trigger: sceneC,
      start: 'top 80%',
      onEnter:     () => gsap.to(sceneC, { opacity: 1, y: 0,  duration: 0.7, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to(sceneC, { opacity: 0, y: 40, duration: 0.5, ease: 'power2.in' }),
    });

  } else {
    /* ── Desktop: pinned scrub animation ── */

    gsap.set(sceneA, { opacity: 1, y: 0 });
    gsap.set(sceneB, { opacity: 0, y: 60 });
    gsap.set(sceneC, { opacity: 0, x: 80 });
    gsap.set('.orbit-label', { opacity: 0, scale: 0.6 });

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

    tl.to(sceneA, { opacity: 0, y: -60, duration: 1 }, 0)
      .to(sceneB, { opacity: 1, y: 0, duration: 1 }, 0.4)
      .to('.orbit-label', { opacity: 1, scale: 1, duration: 1, stagger: 0.08 }, 0.6)
      .to({}, { duration: 0.6 })
      .to(sceneB, { opacity: 0, y: -60, duration: 1 }, '>')
      .to('.orbit-label', { opacity: 0, scale: 0.7, duration: 0.6 }, '<')
      .to(sceneC, { opacity: 1, x: 0, duration: 1 }, '<+0.2');

    // Floating loop for orbit labels
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
  }

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
