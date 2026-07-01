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
  const ghostCards = Array.from({ length: 9 }, (_, index) => ({
    delay: index * 0.42,
    height: 84 + Math.random() * 72,
    speed: 0.022 + Math.random() * 0.018,
    width: 120 + Math.random() * 110,
    x: Math.random(),
    y: Math.random(),
    z: 0.68 + Math.random() * 0.5
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
    wash.addColorStop(0, `rgba(54, 8, 15, ${0.09 + Math.sin(t * 0.22) * 0.02})`);
    wash.addColorStop(0.48, "rgba(255, 255, 255, 0.00)");
    wash.addColorStop(1, `rgba(135, 231, 202, ${0.08 + Math.cos(t * 0.24) * 0.018})`);
    context.fillStyle = wash;
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "screen";
    const isCompact = width < 720;
    const visibleCards = isCompact ? ghostCards.slice(0, 5) : ghostCards;
    visibleCards.forEach((card, index) => {
      const driftX = Math.sin(t * card.speed + card.delay) * (isCompact ? 18 : 44);
      const driftY = Math.cos(t * card.speed * 0.8 + card.delay) * (isCompact ? 14 : 28) + scrollSmooth * (isCompact ? 36 : 68);
      const x = ((card.x * width + driftX) % (width + 260)) - 130;
      const y = ((card.y * height + driftY) % (height + 210)) - 105;
      const alpha = (isCompact ? 0.024 : 0.045) + Math.max(0, Math.sin(t * 0.32 + card.delay)) * (isCompact ? 0.022 : 0.05);

      context.save();
      context.translate(x, y);
      context.rotate((isCompact ? -0.03 : -0.08) + Math.sin(t * 0.18 + card.delay) * (isCompact ? 0.025 : 0.08));
      context.scale(card.z * (isCompact ? 0.68 : 1), card.z * (isCompact ? 0.68 : 1));

      const cardGradient = context.createLinearGradient(0, 0, card.width, card.height);
      cardGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha + 0.04})`);
      cardGradient.addColorStop(1, `rgba(255, 232, 234, ${alpha})`);
      context.fillStyle = cardGradient;
      context.strokeStyle = index % 3 === 0 ? "rgba(135, 231, 202, 0.16)" : "rgba(246, 199, 108, 0.14)";
      context.lineWidth = 1;
      roundRect(context, 0, 0, card.width, card.height, 8);
      context.fill();
      context.stroke();

      context.fillStyle = "rgba(183, 31, 57, 0.09)";
      roundRect(context, 12, 12, card.width * 0.36, card.height - 24, 6);
      context.fill();

      context.fillStyle = "rgba(85, 17, 27, 0.09)";
      roundRect(context, card.width * 0.46, 16, card.width * 0.38, 9, 6);
      context.fill();
      roundRect(context, card.width * 0.46, 34, card.width * 0.26, 7, 6);
      context.fill();

      context.fillStyle = "rgba(246, 199, 108, 0.12)";
      roundRect(context, card.width * 0.46, card.height - 30, card.width * 0.2, 12, 6);
      context.fill();
      context.fillStyle = "rgba(135, 231, 202, 0.11)";
      roundRect(context, card.width * 0.7, card.height - 30, card.width * 0.16, 12, 6);
      context.fill();
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
  const showcase = new THREE.Group();
  const markers = new THREE.Group();
  const panels = new THREE.Group();
  let sceneLayout = "desktop";

  window.polunychka3d = { ready: false, frames: 0 };

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  scene.add(root);
  root.add(showcase, panels, markers);

  camera.position.set(0, 0, 7.4);

  const keyLight = new THREE.DirectionalLight(0xfff1df, 4.4);
  keyLight.position.set(-3.4, 4.2, 5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xff3f68, 3.6);
  rimLight.position.set(4, 0.8, 3.4);
  scene.add(rimLight);

  const mintLight = new THREE.PointLight(0x87e7ca, 2.8, 12);
  mintLight.position.set(2.2, -1.8, 2.6);
  scene.add(mintLight);

  const cardMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.26,
    roughness: 0.18,
    metalness: 0.02,
    transmission: 0.16,
    thickness: 0.42,
    side: THREE.DoubleSide
  });
  const cardBackMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x5b1019,
    transparent: true,
    opacity: 0.3,
    roughness: 0.24,
    metalness: 0.08,
    transmission: 0.08,
    side: THREE.DoubleSide
  });
  const photoMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xb71f39,
    roughness: 0.34,
    metalness: 0.02,
    clearcoat: 0.56,
    clearcoatRoughness: 0.18
  });
  const priceMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf6c76c,
    emissive: 0x3a090f,
    emissiveIntensity: 0.22,
    roughness: 0.24,
    metalness: 0.18,
    transparent: true,
    opacity: 0.82,
    clearcoat: 0.48
  });
  const cityMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x87e7ca,
    emissive: 0x12382f,
    emissiveIntensity: 0.16,
    roughness: 0.3,
    metalness: 0.08,
    transparent: true,
    opacity: 0.68,
    clearcoat: 0.36
  });
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    roughness: 0.12,
    metalness: 0,
    transmission: 0.28,
    thickness: 0.5,
    side: THREE.DoubleSide
  });
  const deepGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x5b1019,
    transparent: true,
    opacity: 0.24,
    roughness: 0.2,
    metalness: 0.06,
    transmission: 0.12,
    side: THREE.DoubleSide
  });
  [
    { x: -0.62, y: 0.46, z: 0.2, scale: 1.08, phase: 0 },
    { x: 0.64, y: 0.0, z: 0.64, scale: 1.18, phase: 1.4 },
    { x: -0.06, y: -0.74, z: 0.42, scale: 0.92, phase: 2.8 }
  ].forEach((config) => {
    const card = createProfileCard(config.scale);
    card.position.set(config.x, config.y, config.z);
    card.rotation.set(-0.08, -0.24 + config.x * 0.08, 0.06 - config.x * 0.05);
    card.userData.baseX = config.x;
    card.userData.baseY = config.y;
    card.userData.baseZ = config.z;
    card.userData.baseRotationZ = card.rotation.z;
    card.userData.baseScale = config.scale;
    card.userData.phase = config.phase;
    showcase.add(card);
  });

  for (let i = 0; i < 5; i += 1) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.72 + (i % 2) * 0.22, 1.05), i % 2 ? deepGlassMaterial : glassMaterial);
    panel.position.set(-1.15 + i * 0.44, -0.58 + Math.sin(i * 1.4) * 0.18, -0.35 - i * 0.08);
    panel.rotation.set(-0.2 + i * 0.025, 0.38, -0.22 + i * 0.07);
    panel.userData.baseX = panel.position.x;
    panel.userData.baseY = panel.position.y;
    panel.userData.baseZ = panel.position.z;
    panel.userData.baseRotationZ = panel.rotation.z;
    panel.userData.phase = i * 0.8;
    panels.add(panel);
  }

  [
    { x: -1.26, y: 0.02, z: 0.48, scale: 0.94, phase: 0.2 },
    { x: 1.35, y: 0.58, z: 0.34, scale: 0.82, phase: 1.1 },
    { x: -0.98, y: -1.02, z: 0.58, scale: 0.76, phase: 2.3 },
    { x: 1.02, y: -0.9, z: 0.5, scale: 0.7, phase: 3.2 },
    { x: 0.02, y: 1.06, z: 0.18, scale: 0.64, phase: 4.1 }
  ].forEach((config, index) => {
    const badge = createFloatingBadge(index);
    badge.position.set(config.x, config.y, config.z);
    badge.rotation.set(-0.08, 0.28 - index * 0.08, -0.18 + index * 0.12);
    badge.scale.setScalar(config.scale);
    badge.userData.baseX = config.x;
    badge.userData.baseY = config.y;
    badge.userData.baseZ = config.z;
    badge.userData.baseRotationZ = badge.rotation.z;
    badge.userData.baseScale = config.scale;
    badge.userData.phase = config.phase;
    markers.add(badge);
  });

  function createProfileCard(scale = 1) {
    const card = new THREE.Group();
    const base = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 1.48), cardMaterial);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.18, 1.54), cardBackMaterial);
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.62), photoMaterial);
    const headline = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.045), deepGlassMaterial);
    const subline = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.034), glassMaterial);
    const priceOne = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.13), priceMaterial);
    const priceTwo = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.13), cityMaterial);
    const avatar = new THREE.Mesh(new THREE.CircleGeometry(0.07, 24), priceMaterial);

    shadow.position.set(0.035, -0.035, -0.02);
    base.position.z = 0;
    photo.position.set(-0.28, 0.25, 0.03);
    headline.position.set(0.22, 0.42, 0.04);
    subline.position.set(0.16, 0.31, 0.04);
    priceOne.position.set(0.16, -0.35, 0.05);
    priceTwo.position.set(0.43, -0.35, 0.055);
    avatar.position.set(0.42, 0.1, 0.055);

    [shadow, base, photo, headline, subline, priceOne, priceTwo, avatar].forEach((mesh) => card.add(mesh));

    for (let i = 0; i < 4; i += 1) {
      const metric = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.055), i % 2 ? cityMaterial : glassMaterial);
      metric.position.set(-0.36 + i * 0.19, -0.08, 0.05);
      card.add(metric);
    }

    card.scale.setScalar(scale);
    return card;
  }

  function createFloatingBadge(index) {
    const badge = new THREE.Group();
    const shellMaterial = (index % 2 ? glassMaterial : deepGlassMaterial).clone();
    const accentMaterial = (index % 2 ? cityMaterial : priceMaterial).clone();
    const quietMaterial = glassMaterial.clone();

    shellMaterial.opacity = index % 2 ? 0.2 : 0.28;
    accentMaterial.opacity = index % 2 ? 0.72 : 0.78;
    quietMaterial.opacity = 0.32;

    const shell = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.22), shellMaterial);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.055, 24), accentMaterial);
    const lineOne = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.026), quietMaterial);
    const lineTwo = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.02), quietMaterial);
    const chip = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.07), accentMaterial.clone());

    shell.position.z = 0;
    dot.position.set(-0.16, 0.04, 0.025);
    lineOne.position.set(0.08, 0.045, 0.03);
    lineTwo.position.set(0.045, -0.015, 0.03);
    chip.position.set(0.13, -0.07, 0.035);

    [shell, dot, lineOne, lineTwo, chip].forEach((mesh) => badge.add(mesh));
    return badge;
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
    const isPhone = width < 520;
    sceneLayout = isPhone ? "phone" : isMobile ? "tablet" : "desktop";

    root.position.set(
      isPhone ? 1.08 : isMobile ? 0.92 : 1.9,
      isPhone ? -1.55 : isMobile ? -0.72 : 0.02,
      isMobile ? 0.12 : 0
    );
    root.scale.setScalar(isPhone ? 0.48 : isMobile ? 0.7 : 1.1);

    const phoneCards = [
      { x: -0.34, y: 0.28, z: 0.22, rotationZ: -0.04, scale: 0.72 },
      { x: 0.16, y: -0.02, z: 0.5, rotationZ: 0.05, scale: 0.84 },
      { x: -0.16, y: -0.38, z: 0.36, rotationZ: -0.07, scale: 0.62 }
    ];
    const tabletCards = [
      { x: -0.5, y: 0.28, z: 0.2, rotationZ: -0.02, scale: 0.92 },
      { x: 0.42, y: -0.06, z: 0.58, rotationZ: 0.05, scale: 1.02 },
      { x: -0.04, y: -0.62, z: 0.42, rotationZ: -0.04, scale: 0.8 }
    ];

    showcase.children.forEach((card, index) => {
      const config = isPhone ? phoneCards[index] : isMobile ? tabletCards[index] : null;
      card.visible = true;
      if (config) {
        card.userData.baseX = config.x;
        card.userData.baseY = config.y;
        card.userData.baseZ = config.z;
        card.userData.baseRotationZ = config.rotationZ;
        card.position.set(config.x, config.y, config.z);
        card.rotation.z = config.rotationZ;
        card.scale.setScalar(config.scale);
      } else {
        card.userData.baseX = card.position.x = [-0.62, 0.64, -0.06][index];
        card.userData.baseY = card.position.y = [0.46, 0, -0.74][index];
        card.userData.baseZ = card.position.z = [0.2, 0.64, 0.42][index];
        card.userData.baseRotationZ = [0.091, 0.028, 0.063][index];
        card.rotation.z = card.userData.baseRotationZ;
        card.scale.setScalar(card.userData.baseScale);
      }
    });

    panels.visible = !isPhone;
    markers.visible = !isMobile;
    cardMaterial.opacity = isPhone ? 0.16 : isMobile ? 0.22 : 0.26;
    cardBackMaterial.opacity = isPhone ? 0.2 : isMobile ? 0.26 : 0.3;
    glassMaterial.opacity = isPhone ? 0.12 : isMobile ? 0.16 : 0.18;
    deepGlassMaterial.opacity = isPhone ? 0.18 : isMobile ? 0.22 : 0.24;
  }

  function animate() {
    const elapsed = clock.getElapsedTime();
    pointer.lerp(targetPointer, 0.055);

    const isPhoneScene = sceneLayout === "phone";
    const isCompactScene = sceneLayout !== "desktop";

    root.rotation.y = isPhoneScene
      ? -0.035 + Math.sin(elapsed * 0.18) * 0.025 + pointer.x * 0.035
      : -0.1 + Math.sin(elapsed * 0.42) * 0.1 + pointer.x * 0.14;
    root.rotation.x = isPhoneScene
      ? Math.sin(elapsed * 0.16) * 0.015 - pointer.y * 0.025
      : Math.sin(elapsed * 0.32) * 0.042 - pointer.y * 0.075;
    showcase.children.forEach((card) => {
      const speed = isPhoneScene ? 0.16 : isCompactScene ? 0.24 : 0.36;
      const floatX = isPhoneScene ? 0.014 : isCompactScene ? 0.032 : 0.055;
      const floatY = isPhoneScene ? 0.024 : isCompactScene ? 0.045 : 0.075;
      const rotateZ = isPhoneScene ? 0.006 : isCompactScene ? 0.014 : 0.025;
      const rotateY = isPhoneScene ? 0.02 : isCompactScene ? 0.045 : 0.07;

      card.position.x = card.userData.baseX + Math.sin(elapsed * speed + card.userData.phase) * floatX;
      card.position.y = card.userData.baseY + Math.cos(elapsed * (speed + 0.04) + card.userData.phase) * floatY;
      card.rotation.z = card.userData.baseRotationZ + Math.sin(elapsed * speed + card.userData.phase) * rotateZ;
      card.rotation.y = (isPhoneScene ? -0.12 : -0.24) + Math.sin(elapsed * (speed + 0.02) + card.userData.phase) * rotateY + pointer.x * (isPhoneScene ? 0.018 : 0.04);
    });

    panels.children.forEach((panel) => {
      panel.position.y = panel.userData.baseY + Math.sin(elapsed * 0.8 + panel.userData.phase) * 0.075;
      panel.rotation.z = panel.userData.baseRotationZ + Math.sin(elapsed * 0.35 + panel.userData.phase) * 0.045;
    });

    markers.children.forEach((badge) => {
      badge.position.x = badge.userData.baseX + Math.sin(elapsed * 0.34 + badge.userData.phase) * 0.035;
      badge.position.y = badge.userData.baseY + Math.cos(elapsed * 0.46 + badge.userData.phase) * 0.065;
      badge.rotation.z = badge.userData.baseRotationZ + Math.sin(elapsed * 0.38 + badge.userData.phase) * 0.06;
    });

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
