
    const cpuBar = document.getElementById('cpu');
    const memBar = document.getElementById('memory');
    const fpsBar = document.getElementById('fps');
    const cpuVal = document.getElementById('cpuVal');
    const memVal = document.getElementById('memVal');
    const fpsVal = document.getElementById('fpsVal');

    // FPS monitor
    let lastFrame = performance.now();
    let frames = 0;
    let fps = 0;
    function fpsLoop(now) {
      frames++;
      if (now - lastFrame >= 1000) {
        fps = frames;
        frames = 0;
        lastFrame = now;
        fpsBar.style.width = Math.min(fps/120*100, 100) + '%';
        fpsVal.textContent = fps + ' fps';
      }
      requestAnimationFrame(fpsLoop);
    }
    requestAnimationFrame(fpsLoop);

    // Memory (browser heap)
    function updateMemory() {
      if (performance.memory) {
        const used = performance.memory.usedJSHeapSize;
        const total = performance.memory.jsHeapSizeLimit;
        const percent = (used / total) * 100;
        memBar.style.width = percent.toFixed(1) + '%';
        memVal.textContent = percent.toFixed(1) + '%';
      } else {
        // fallback: simulate
        const fake = Math.random() * 100;
        memBar.style.width = fake.toFixed(1) + '%';
        memVal.textContent = fake.toFixed(1) + '%';
      }
    }

    // Simulated CPU usage (browser cannot get real system CPU)
    function updateCPU() {
      const fake = 20 + Math.random() * 70; // simulate 20–90%
      cpuBar.style.width = fake.toFixed(1) + '%';
      cpuVal.textContent = fake.toFixed(1) + '%';
    }

    setInterval(() => {
      updateCPU();
      updateMemory();
    }, 1000);
