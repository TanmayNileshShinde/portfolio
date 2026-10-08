// 3D Perspective Tilt Physics with Dynamic Specular Glare

export function setupCardTilt(card) {
  let bounds;

  function onMouseEnter() {
    bounds = card.getBoundingClientRect();
    card.style.transition = 'transform 0.1s ease-out';
  }

  function onMouseMove(e) {
    if (!bounds) bounds = card.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const xPct = mouseX / bounds.width - 0.5;
    const yPct = mouseY / bounds.height - 0.5;

    const rotateX = -yPct * 16;
    const rotateY = xPct * 16;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;

    // Update dynamic specular lighting sheen position
    card.style.setProperty('--mouse-x', `${(mouseX / bounds.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(mouseY / bounds.height) * 100}%`);
  }

  function onMouseLeave() {
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }

  card.addEventListener('mouseenter', onMouseEnter);
  card.addEventListener('mousemove', onMouseMove);
  card.addEventListener('mouseleave', onMouseLeave);
}
