import { useEffect, useRef } from 'react';

export function useTilt(maxTilt = 10, proximity = 1.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const zone = el.closest('[data-tilt-zone]') || document.documentElement;

    const handleMove = (e) => {
      // Skip tilt on small screens
      if (window.innerWidth < 768) return;
      // Skip while scroll-in animation is still running
      const animatingIn =
        (el.classList.contains('animate-on-scroll') && !el.classList.contains('visible')) ||
        (el.classList.contains('reveal') && !el.classList.contains('revealed'));
      if (animatingIn) return;

      const zRect = zone.getBoundingClientRect
        ? zone.getBoundingClientRect()
        : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };

      const mx = e.clientX - zRect.left;
      const my = e.clientY - zRect.top;

      const cr = el.getBoundingClientRect();
      const cx = cr.left - zRect.left + cr.width / 2;
      const cy = cr.top - zRect.top + cr.height / 2;

      const dx = (mx - cx) / cr.width;
      const dy = (my - cy) / cr.height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const strength = Math.max(0, 1 - dist * proximity);

      const rx = -dy * maxTilt * strength;
      const ry = dx * maxTilt * strength;
      const tz = strength * 14;

      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const glowColor = isDark ? 'rgba(37,99,235,' : 'rgba(22,163,74,';
      el.style.boxShadow = strength > 0.15
        ? `0 ${Math.round(10 + strength * 30)}px ${Math.round(20 + strength * 50)}px ${glowColor}${(0.06 + strength * 0.14).toFixed(2)})`
        : '';
    };

    const handleLeave = () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    };

    zone.addEventListener('mousemove', handleMove);
    zone.addEventListener('mouseleave', handleLeave);
    return () => {
      zone.removeEventListener('mousemove', handleMove);
      zone.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt, proximity]);

  return ref;
}
