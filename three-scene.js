import * as THREE from "three";

const heroCanvas = document.querySelector("#heroCanvas");
const ambientCanvas = document.querySelector("#ambientCanvas");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const phoneHeroScene = window.matchMedia("(max-width: 720px)");

if (ambientCanvas) {
  initAmbientBackground(ambientCanvas);
}

if (heroCanvas && phoneHeroScene.matches) {
  heroCanvas.dataset.sceneReady = "disabled-mobile";
  heroCanvas.dataset.sceneFrames = "0";
} else if (heroCanvas) {
  initHeroScene(heroCanvas);
}

function initAmbientBackground(canvas) {
  const context = canvas.getContext("2d");
  const streams = Array.from({ length: 7 }, (_, index) => ({
    delay: index * 0.78,
    hue: index % 3,
    offset: Math.random(),
    speed: 0.08 + Math.random() * 0.08,
    strength: 0.32 + Math.random() * 0.5
  }));
  const shards = Array.from({ length: 18 }, (_, index) => ({
    delay: index * 0.36,
    size: 8 + Math.random() * 26,
    speed: 0.035 + Math.random() * 0.055,
    x: Math.random(),
    y: Math.random()
  }));
  let scrollTarget = 0;
  let scrollSmooth = 0;

  function updateScrollTarget() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollTarget = window.scrollY / maxScroll;
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.max(1, Math.floor(window.innerWidth * ratio));
    canvas.height = Math.max(1, Math.floor(window.innerHeight * ratio));
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    updateScrollTarget();
  }

  function draw(time = 0) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const t = time * 0.001;
    scrollSmooth += (scrollTarget - scrollSmooth) * 0.035;

    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";

    const wash = context.createLinearGradient(0, 0, width, height);
    wash.addColorStop(0, `rgba(70, 5, 22, ${0.32 + Math.sin(t * 0.22) * 0.04})`);
    wash.addColorStop(0.42, "rgba(18, 2, 12, 0.28)");
    wash.addColorStop(1, `rgba(5, 55, 48, ${0.2 + Math.cos(t * 0.24) * 0.035})`);
    context.fillStyle = wash;
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "screen";
    context.lineCap = "round";
    streams.forEach((stream, index) => {
      const yBase = height * (0.12 + ((stream.offset + scrollSmooth * 0.25) % 0.86));
      const color =
        stream.hue === 0
          ? `rgba(239, 59, 87, ${0.14 * stream.strength})`
          : stream.hue === 1
            ? `rgba(135, 231, 202, ${0.12 * stream.strength})`
            : `rgba(246, 199, 108, ${0.1 * stream.strength})`;

      context.beginPath();
      for (let x = -80; x <= width + 80; x += 42) {
        const wave = Math.sin(t * stream.speed + stream.delay + x * 0.008) * 42 * stream.strength;
        const y = yBase + wave + Math.cos(t * 0.11 + index + x * 0.004) * 24;
        if (x === -80) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.strokeStyle = color;
      context.lineWidth = 1.2 + stream.strength * 1.6;
      context.shadowBlur = 18;
      context.shadowColor = color;
      context.stroke();
      context.shadowBlur = 0;
    });

    shards.forEach((shard, index) => {
      const driftX = Math.sin(t * shard.speed + shard.delay) * 24;
      const driftY = Math.cos(t * shard.speed * 0.8 + shard.delay) * 20 + scrollSmooth * 42;
      const x = ((shard.x * width + driftX) % (width + 180)) - 90;
      const y = ((shard.y * height + driftY) % (height + 150)) - 75;
      const alpha = 0.045 + Math.max(0, Math.sin(t * 0.42 + shard.delay)) * 0.045;
      const angle = -0.55 + Math.sin(t * 0.12 + shard.delay) * 0.28;

      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.strokeStyle = index % 2 ? `rgba(135, 231, 202, ${alpha})` : `rgba(246, 199, 108, ${alpha})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(-shard.size, 0);
      context.lineTo(0, -shard.size * 0.4);
      context.lineTo(shard.size, 0);
      context.lineTo(0, shard.size * 0.4);
      context.closePath();
      context.stroke();
      context.restore();
    });

    context.globalCompositeOperation = "source-over";

    canvas.dataset.sceneReady = "true";
    canvas.dataset.sceneFrames = String(Number(canvas.dataset.sceneFrames || 0) + 1);

    if (!reducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", updateScrollTarget, { passive: true });
  resize();
  draw();
}

function initHeroScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    preserveDrawingBuffer: true
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2(0, 0);
  const targetPointer = new THREE.Vector2(0, 0);
  const root = new THREE.Group();
  const sculpture = new THREE.Group();
  const rings = new THREE.Group();
  const ribbons = new THREE.Group();
  const crystals = new THREE.Group();
  const particles = new THREE.Group();

  window.polunychka3d = { ready: false, frames: 0 };

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  scene.add(root);
  root.add(sculpture, rings, ribbons, crystals, particles);

  camera.position.set(0, 0, 7.2);

  const keyLight = new THREE.DirectionalLight(0xffefe6, 3.8);
  keyLight.position.set(-3.2, 3.8, 5.2);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xff496f, 4.2);
  rimLight.position.set(4.4, 0.6, 3.6);
  scene.add(rimLight);

  const mintLight = new THREE.PointLight(0x7df0d3, 3.4, 12);
  mintLight.position.set(2.3, -1.8, 2.8);
  scene.add(mintLight);

  const berryMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff315f,
    emissive: 0x3f061a,
    emissiveIntensity: 0.36,
    roughness: 0.18,
    metalness: 0.22,
    clearcoat: 0.72,
    clearcoatRoughness: 0.12
  });
  const rubyGlass = new THREE.MeshPhysicalMaterial({
    color: 0xff496f,
    transparent: true,
    opacity: 0.42,
    roughness: 0.08,
    metalness: 0.04,
    transmission: 0.28,
    thickness: 0.45,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const mintGlass = rubyGlass.clone();
  mintGlass.color.setHex(0x7df0d3);
  mintGlass.opacity = 0.32;
  const goldGlass = rubyGlass.clone();
  goldGlass.color.setHex(0xffd06f);
  goldGlass.opacity = 0.38;
  const darkGlass = new THREE.MeshPhysicalMaterial({
    color: 0x250614,
    transparent: true,
    opacity: 0.5,
    roughness: 0.2,
    metalness: 0.18,
    transmission: 0.12,
    thickness: 0.4,
    side: THREE.DoubleSide
  });
  const lineMaterial = new THREE.MeshBasicMaterial({
    color: 0xff496f,
    transparent: true,
    opacity: 0.62,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const particleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffd06f,
    emissive: 0xff315f,
    emissiveIntensity: 0.26,
    roughness: 0.28,
    metalness: 0.18,
    transparent: true,
    opacity: 0.72
  });

  const core = new THREE.Mesh(new THREE.TorusKnotGeometry(0.82, 0.075, 220, 22, 2, 5), berryMaterial);
  const innerFacet = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 2), darkGlass);
  const glassShell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.04, 3), rubyGlass);
  innerFacet.rotation.set(0.2, -0.35, 0.18);
  glassShell.rotation.set(-0.12, 0.4, -0.2);
  sculpture.add(innerFacet, core, glassShell);

  [
    { radius: 1.28, tube: 0.014, color: rubyGlass, rotation: [1.2, 0.24, 0.08], phase: 0 },
    { radius: 1.58, tube: 0.01, color: mintGlass, rotation: [0.72, -0.56, 0.64], phase: 1.2 },
    { radius: 1.92, tube: 0.008, color: goldGlass, rotation: [1.55, 0.08, -0.62], phase: 2.3 },
    { radius: 2.16, tube: 0.006, color: mintGlass, rotation: [0.26, 1.05, 0.2], phase: 3.5 }
  ].forEach((config) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(config.radius, config.tube, 12, 220), config.color.clone());
    ring.rotation.set(...config.rotation);
    ring.userData.phase = config.phase;
    rings.add(ring);
  });

  [
    { color: 0xff496f, radius: 0.72, height: 1.7, phase: 0 },
    { color: 0x7df0d3, radius: 0.86, height: 1.9, phase: 2.1 },
    { color: 0xffd06f, radius: 1.02, height: 1.55, phase: 4.2 }
  ].forEach((config, index) => {
    const curve = createRibbonCurve(config.radius, config.height, config.phase);
    const material = lineMaterial.clone();
    material.color.setHex(config.color);
    material.opacity = index === 0 ? 0.62 : 0.5;
    const ribbon = new THREE.Mesh(new THREE.TubeGeometry(curve, 180, 0.012 - index * 0.0015, 8, false), material);
    ribbon.userData.phase = config.phase;
    ribbons.add(ribbon);
  });

  for (let i = 0; i < 16; i += 1) {
    const material = i % 3 === 0 ? goldGlass.clone() : i % 3 === 1 ? mintGlass.clone() : rubyGlass.clone();
    material.opacity = 0.28 + (i % 4) * 0.045;
    const crystal = new THREE.Mesh(new THREE.TetrahedronGeometry(0.08 + (i % 4) * 0.014), material);
    const angle = (i / 16) * Math.PI * 2;
    const radius = 1.38 + (i % 5) * 0.18;
    crystal.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.4) * 0.58, Math.sin(angle) * radius * 0.34);
    crystal.rotation.set(i * 0.42, i * 0.27, i * 0.16);
    crystal.userData = {
      angle,
      radius,
      baseY: crystal.position.y,
      phase: i * 0.48
    };
    crystals.add(crystal);
  }

  const particleGeometry = new THREE.TetrahedronGeometry(0.026, 0);
  const particleMesh = new THREE.InstancedMesh(particleGeometry, particleMaterial, 72);
  const tempObject = new THREE.Object3D();
  const particleSeeds = Array.from({ length: 72 }, (_, index) => ({
    angle: index * 0.618,
    radius: 1.45 + (index % 12) * 0.1,
    height: -1.2 + (index % 18) * 0.14,
    phase: index * 0.37,
    scale: 0.55 + (index % 5) * 0.12
  }));
  particleMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  particles.add(particleMesh);

  function createRibbonCurve(radius, height, phase) {
    const points = [];
    for (let i = 0; i < 110; i += 1) {
      const progress = i / 109;
      const angle = progress * Math.PI * 4.2 + phase;
      const pulse = Math.sin(progress * Math.PI * 3 + phase) * 0.15;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * (radius + pulse),
          (progress - 0.5) * height,
          Math.sin(angle) * (radius * 0.46 + pulse * 0.4)
        )
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const isMobile = width < 720;
    root.position.set(
      isMobile ? 0.84 : 1.92,
      isMobile ? -0.44 : 0.02,
      isMobile ? 0.06 : 0
    );
    root.scale.setScalar(isMobile ? 0.72 : 1.08);
  }

  function animate() {
    const elapsed = clock.getElapsedTime();
    pointer.lerp(targetPointer, 0.055);

    root.rotation.y = -0.12 + Math.sin(elapsed * 0.32) * 0.08 + pointer.x * 0.16;
    root.rotation.x = Math.sin(elapsed * 0.24) * 0.04 - pointer.y * 0.08;
    sculpture.rotation.y = elapsed * 0.16;
    sculpture.rotation.z = Math.sin(elapsed * 0.28) * 0.08;
    core.rotation.x = elapsed * 0.22;
    core.rotation.y = -elapsed * 0.18;
    innerFacet.rotation.y = -elapsed * 0.12;
    glassShell.rotation.x = elapsed * 0.08;
    glassShell.rotation.z = -elapsed * 0.06;

    rings.children.forEach((ring, index) => {
      ring.rotation.z += 0.0026 + index * 0.0007;
      ring.rotation.x += Math.sin(elapsed * 0.16 + ring.userData.phase) * 0.0008;
      ring.scale.setScalar(1 + Math.sin(elapsed * 0.8 + ring.userData.phase) * 0.018);
    });

    ribbons.children.forEach((ribbon, index) => {
      ribbon.rotation.y = elapsed * (0.11 + index * 0.025) + ribbon.userData.phase * 0.12;
      ribbon.rotation.z = Math.sin(elapsed * 0.2 + ribbon.userData.phase) * 0.12;
      ribbon.position.y = Math.sin(elapsed * 0.5 + ribbon.userData.phase) * 0.035;
    });

    crystals.children.forEach((crystal) => {
      const angle = crystal.userData.angle + elapsed * 0.08;
      crystal.position.x = Math.cos(angle) * crystal.userData.radius;
      crystal.position.z = Math.sin(angle) * crystal.userData.radius * 0.34;
      crystal.position.y = crystal.userData.baseY + Math.sin(elapsed * 0.76 + crystal.userData.phase) * 0.08;
      crystal.rotation.x += 0.007;
      crystal.rotation.y += 0.009;
    });

    particleSeeds.forEach((seed, index) => {
      const angle = seed.angle + elapsed * (0.09 + (index % 4) * 0.012);
      tempObject.position.set(
        Math.cos(angle) * seed.radius,
        seed.height + Math.sin(elapsed * 0.64 + seed.phase) * 0.18,
        Math.sin(angle) * seed.radius * 0.44
      );
      tempObject.rotation.set(elapsed * 0.2 + seed.phase, elapsed * 0.16, seed.phase);
      tempObject.scale.setScalar(seed.scale);
      tempObject.updateMatrix();
      particleMesh.setMatrixAt(index, tempObject.matrix);
    });
    particleMesh.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
    window.polunychka3d.ready = true;
    window.polunychka3d.frames += 1;
    canvas.dataset.sceneReady = "true";
    canvas.dataset.sceneFrames = String(window.polunychka3d.frames);

    if (!reducedMotion) {
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    const rect = canvas.getBoundingClientRect();
    targetPointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    targetPointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  resize();
  animate();
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}
