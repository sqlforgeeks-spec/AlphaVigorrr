import type { MouseEvent } from 'react';

/** Call inside an onClick handler on a `position:relative; overflow:hidden` element */
export function ripple(e: MouseEvent<HTMLElement>) {
  const btn  = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x    = e.clientX - rect.left - size / 2;
  const y    = e.clientY - rect.top  - size / 2;

  const span = document.createElement('span');
  span.className = 'ripple-effect';
  span.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  btn.appendChild(span);
  span.addEventListener('animationend', () => span.remove());
}
