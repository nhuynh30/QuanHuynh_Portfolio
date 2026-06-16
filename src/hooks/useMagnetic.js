import { useEffect, useRef } from 'react';

export function useMagnetic(strength = 0.32) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth < 768) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      el.style.transition = 'transform 0.12s ease';
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = '';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}
