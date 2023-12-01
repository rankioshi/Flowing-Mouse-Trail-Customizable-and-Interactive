document.addEventListener('DOMContentLoaded', function() {
  const trailElements = [];
  const breathSpeed = 1; // Ajust the breath speed

  function createTrailElement(x, y) {
    const trail = new Image();
    trail.src = 'your/folder/image.png'; // you can change the trail for a image of your preference
    trail.className = 'trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    return trail;
  }

  function updateTrailPositions(x, y) {
    const trail = createTrailElement(x, y);
    trailElements.push(trail);

    // trail fade (remove by length)
    if (trailElements.length > 10) {
      const removedTrail = trailElements.shift();
      document.body.removeChild(removedTrail);
    }
  }

  function fadeOutTrails() {
    trailElements.forEach((trail, index) => {
      setTimeout(() => {
        trail.style.opacity = '0';
      }, index * 100);
    });
    const activeTime = 6000; // time active
    setTimeout(() => {
      trailElements.forEach(trail => {
        document.body.removeChild(trail);
      });
      trailElements.length = 0;
    }, activeTime);
  }

  let isDrawing = false;

  document.addEventListener('mousedown', function(event) {
    isDrawing = true;
    const x = event.clientX;
    const y = event.clientY;
    updateTrailPositions(x, y);
  });

  document.addEventListener('mousemove', function(event) {
    if (isDrawing) {
      const x = event.clientX;
      const y = event.clientY;
      updateTrailPositions(x, y);
    }
  });

  document.addEventListener('mouseup', function() {
    isDrawing = false;
    fadeOutTrails();
  });

  function breatheEffect() {
    const yOffset = 20; // how much will detach
    trailElements.forEach((trail, index) => {
      trail.style.transform = `translateY(${Math.sin(index * breathSpeed) * yOffset}px)`;
    });

    requestAnimationFrame(breatheEffect);
  }

  breatheEffect();
});