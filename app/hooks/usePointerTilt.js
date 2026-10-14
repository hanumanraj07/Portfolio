import { useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Tilt an element toward the pointer by writing CSS custom properties:
 * `--tiltX`/`--tiltY` (degrees) and `--pointerX`/`--pointerY` (0–100%).
 * Skipped for touch input and reduced motion, so styles must work at rest.
 */
export function usePointerTilt(elementRef, { maxTilt = 8, enabled = true } = {}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled || reduceMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame;

    const setTilt = (x, y) => {
      element.style.setProperty('--tiltX', `${(x - 0.5) * maxTilt * 2}deg`);
      element.style.setProperty('--tiltY', `${(0.5 - y) * maxTilt * 2}deg`);
      element.style.setProperty('--pointerX', `${x * 100}%`);
      element.style.setProperty('--pointerY', `${y * 100}%`);
    };

    const handlePointerMove = event => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setTilt(x, y));
    };

    const handlePointerLeave = () => {
      cancelAnimationFrame(frame);
      element.removeAttribute('data-tilting');
      setTilt(0.5, 0.5);
    };

    const handlePointerEnter = () => {
      element.setAttribute('data-tilting', 'true');
    };

    element.addEventListener('pointerenter', handlePointerEnter);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointerenter', handlePointerEnter);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [elementRef, maxTilt, enabled, reduceMotion]);
}
