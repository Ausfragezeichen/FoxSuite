const TAX_RATE = 0.07;

const products = [
  { id: "amethyst", name: "Amethyst", type: "crystal", priceCents: 1800, color: "violet", energy: ["calming", "intuition"], emoji: "💜", popularity: 9 },
  { id: "rose-quartz", name: "Rose Quartz", type: "crystal", priceCents: 1600, color: "pink", energy: ["love", "healing"], emoji: "🌸", popularity: 10 },
  { id: "citrine", name: "Citrine", type: "crystal", priceCents: 2200, color: "gold", energy: ["abundance", "joy"], emoji: "🟡", popularity: 8 },
  { id: "clear-quartz", name: "Clear Quartz", type: "crystal", priceCents: 1500, color: "clear", energy: ["clarity", "amplify"], emoji: "💎", popularity: 10 },
  { id: "obsidian", name: "Obsidian", type: "stone", priceCents: 1400, color: "black", energy: ["protection", "grounding"], emoji: "⚫", popularity: 7 },
  { id: "jade", name: "Jade", type: "stone", priceCents: 1900, color: "green", energy: ["prosperity", "balance"], emoji: "🟢", popularity: 7 },
  { id: "lapis-lazuli", name: "Lapis Lazuli", type: "stone", priceCents: 2400, color: "blue", energy: ["wisdom", "truth"], emoji: "🔷", popularity: 8 },
  { id: "tigers-eye", name: "Tiger's Eye", type: "stone", priceCents: 1700, color: "brown", energy: ["courage", "focus"], emoji: "🟤", popularity: 6 },
  { id: "agate", name: "Agate", type: "stone", priceCents: 1300, color: "varied", energy: ["stability", "soothing"], emoji: "🪨", popularity: 5 },
  { id: "moonstone", name: "Moonstone", type: "crystal", priceCents: 2100, color: "white", energy: ["intuition", "new beginnings"], emoji: "🌕", popularity: 7 },
  { id: "turquoise", name: "Turquoise", type: "stone", priceCents: 2000, color: "turquoise", energy: ["communication", "healing"], emoji: "🟦", popularity: 7 }
];

// Enhanced product colors for 3D visualization
const crystalColors = {
  "amethyst": 0x9966CC,
  "rose-quartz": 0xFF69B4,
  "citrine": 0xFFD700,
  "clear-quartz": 0xF0F8FF,
  "obsidian": 0x000000,
  "jade": 0x00FF7F,
  "lapis-lazuli": 0x4169E1,
  "tigers-eye": 0xA0522D,
  "agate": 0x708090,
  "moonstone": 0xF5F5DC,
  "turquoise": 0x40E0D0
};

// Fixed camera positions for different areas - IMPROVED VERSION
const cameraPositions = {
  "entrance": {
    position: { x: 0, y: 3, z: 10 },
    rotation: { x: -0.15, y: 0, z: 0 },
    name: "Entrance",
    availableDirections: ["forward", "left", "right"]
  },
  "main-hall": {
    position: { x: 0, y: 3, z: 4 },
    rotation: { x: -0.15, y: 0, z: 0 },
    name: "Main Hall",
    availableDirections: ["forward", "back", "left", "right"]
  },
  "crystal-garden": {
    position: { x: 0, y: 3, z: -2 },
    rotation: { x: -0.15, y: 0, z: 0 },
    name: "Crystal Garden",
    availableDirections: ["back", "left", "right"]
  },
  "computer-terminal": {
    position: { x: 0, y: 3, z: -6 },
    rotation: { x: -0.25, y: 0, z: 0 },
    name: "Computer Terminal",
    availableDirections: ["back", "left", "right"]
  },
  "left-wing": {
    position: { x: -4, y: 3, z: 0 },
    rotation: { x: -0.15, y: Math.PI / 4, z: 0 },
    name: "Left Wing",
    availableDirections: ["back", "right"]
  },
  "right-wing": {
    position: { x: 4, y: 3, z: 0 },
    rotation: { x: -0.15, y: -Math.PI / 4, z: 0 },
    name: "Right Wing",
    availableDirections: ["back", "left"]
  }
};

// Crystal close-up positions for fractal navigation
const crystalCloseUps = {
  "amethyst": {
    position: { x: 6.5, y: 2.8, z: 1.5 },
    rotation: { x: -0.1, y: Math.PI / 6, z: 0 },
    name: "Amethyst Close-up",
    availableDirections: ["back"]
  },
  "rose-quartz": {
    position: { x: 4.5, y: 2.8, z: 6.5 },
    rotation: { x: -0.1, y: -Math.PI / 6, z: 0 },
    name: "Rose Quartz Close-up",
    availableDirections: ["back"]
  },
  "citrine": {
    position: { x: -1.5, y: 2.8, z: 7.5 },
    rotation: { x: -0.1, y: Math.PI / 3, z: 0 },
    name: "Citrine Close-up",
    availableDirections: ["back"]
  },
  "clear-quartz": {
    position: { x: -6.5, y: 2.8, z: 1.5 },
    rotation: { x: -0.1, y: -Math.PI / 6, z: 0 },
    name: "Clear Quartz Close-up",
    availableDirections: ["back"]
  },
  "obsidian": {
    position: { x: -4.5, y: 2.8, z: -6.5 },
    rotation: { x: -0.1, y: Math.PI / 6, z: 0 },
    name: "Obsidian Close-up",
    availableDirections: ["back"]
  },
  "jade": {
    position: { x: 1.5, y: 2.8, z: -7.5 },
    rotation: { x: -0.1, y: -Math.PI / 3, z: 0 },
    name: "Jade Close-up",
    availableDirections: ["back"]
  },
  "lapis-lazuli": {
    position: { x: 7.5, y: 2.8, z: -1.5 },
    rotation: { x: -0.1, y: -Math.PI / 3, z: 0 },
    name: "Lapis Lazuli Close-up",
    availableDirections: ["back"]
  },
  "tigers-eye": {
    position: { x: 6.5, y: 2.8, z: -4.5 },
    rotation: { x: -0.1, y: Math.PI / 4, z: 0 },
    name: "Tiger's Eye Close-up",
    availableDirections: ["back"]
  },
  "agate": {
    position: { x: -7.5, y: 2.8, z: -1.5 },
    rotation: { x: -0.1, y: Math.PI / 3, z: 0 },
    name: "Agate Close-up",
    availableDirections: ["back"]
  },
  "moonstone": {
    position: { x: -6.5, y: 2.8, z: -4.5 },
    rotation: { x: -0.1, y: -Math.PI / 4, z: 0 },
    name: "Moonstone Close-up",
    availableDirections: ["back"]
  },
  "turquoise": {
    position: { x: -1.5, y: 2.8, z: -7.5 },
    rotation: { x: -0.1, y: Math.PI / 6, z: 0 },
    name: "Turquoise Close-up",
    availableDirections: ["back"]
  }
};

const state = {
  cartItemIdToQty: new Map(),
  activeCategory: "all",
  activeSort: "popularity",
  searchTerm: "",
  selectedCrystal: null,
  scene: null,
  camera: null,
  renderer: null,
  crystalMeshes: [],
  virtualScreen: null,
  raycaster: new THREE.Raycaster(),
  mouse: new THREE.Vector2(),
  isScreenActive: false,
  helpVisible: true,
  
  // Fixed perspective navigation
  currentLocation: "main-hall",
  isTransitioning: false,
  transitionDuration: 1000, // milliseconds
  transitionStartTime: 0,
  transitionStartPosition: null,
  transitionStartRotation: null,
  transitionTargetPosition: null,
  transitionTargetRotation: null,
  
  // Fractal navigation system
  proximityThreshold: 4, // units
  nearbyCrystals: [],
  isInCloseUp: false,
  closeUpTarget: null
};

const elements = {
  // 3D Elements
  container: document.getElementById("threejs-container"),
  loadingScreen: document.getElementById("loading-screen"),
  crystalInfoPanel: document.getElementById("crystal-info-panel"),
  closeInfoBtn: document.getElementById("close-info-btn"),
  crystalEmoji: document.getElementById("crystal-emoji"),
  crystalName: document.getElementById("crystal-name"),
  crystalMeta: document.getElementById("crystal-meta"),
  crystalPrice: document.getElementById("crystal-price"),
  crystalEnergy: document.getElementById("crystal-energy"),
  addToCart3D: document.getElementById("add-to-cart-3d"),
  
  // UI Elements
  controlsHelp: document.getElementById("controls-help"),
  toggleHelp: document.getElementById("toggle-help"),
  miniCart: document.getElementById("mini-cart"),
  cartCount: document.getElementById("cart-count"),
  cartTotal: document.getElementById("cart-total"),
  locationIndicator: document.getElementById("location-indicator"),
  
  // Navigation elements
  navLeft: document.getElementById("nav-left"),
  navRight: document.getElementById("nav-right"),
  navForward: document.getElementById("nav-forward"),
  navBack: document.getElementById("nav-back"),
  hotspots: document.querySelectorAll(".hotspot"),
  
  // Virtual 2D Interface
  virtual2DInterface: document.getElementById("virtual-2d-interface"),
  screenOverlay: document.getElementById("screen-overlay"),
  closeScreen: document.getElementById("close-screen"),
  screenContent: document.getElementById("screen-content"),
  
  // 2D Store Elements
  grid: document.getElementById("productGrid"),
  cartItems: document.getElementById("cartItems"),
  subtotal: document.getElementById("subtotalAmount"),
  tax: document.getElementById("taxAmount"),
  total: document.getElementById("totalAmount"),
  checkoutButton: document.getElementById("checkoutButton"),
  searchInput: document.getElementById("searchInput"),
  categorySelect: document.getElementById("categorySelect"),
  sortSelect: document.getElementById("sortSelect"),
  closeVirtualStoreButton: document.getElementById("closeVirtualStoreButton")
};

function formatCurrency(cents) {
  const dollars = cents / 100;
  return dollars.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function persistCart() {
  const obj = Object.fromEntries(state.cartItemIdToQty.entries());
  localStorage.setItem("crystal_store_cart", JSON.stringify(obj));
}

function hydrateCart() {
  try {
    const raw = localStorage.getItem("crystal_store_cart");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    Object.entries(parsed).forEach(([id, qty]) => {
      const quantityNumber = Number(qty);
      if (Number.isFinite(quantityNumber) && quantityNumber > 0) {
        state.cartItemIdToQty.set(id, quantityNumber);
      }
    });
  } catch { /* ignore */ }
}

function updateMiniCart() {
  const totalItems = Array.from(state.cartItemIdToQty.values()).reduce((sum, qty) => sum + qty, 0);
  const totalCents = Array.from(state.cartItemIdToQty.entries()).reduce((sum, [id, qty]) => {
    const product = products.find(p => p.id === id);
    return sum + (product ? product.priceCents * qty : 0);
  }, 0);
  
  elements.cartCount.textContent = totalItems;
  elements.cartTotal.textContent = formatCurrency(totalCents);
}

function updateLocationIndicator() {
  if (state.isInCloseUp) {
    const closeUpPos = crystalCloseUps[state.closeUpTarget];
    elements.locationIndicator.textContent = closeUpPos.name;
  } else {
    const location = cameraPositions[state.currentLocation];
    elements.locationIndicator.textContent = location.name;
  }
  elements.locationIndicator.setAttribute("aria-label", elements.locationIndicator.textContent);
}

function updateNavigationArrows() {
  const setArrowMeta = (arrowEl, direction, visible, nextLocationKey) => {
    arrowEl.style.display = visible ? "flex" : "none";
    if (!visible) {
      arrowEl.removeAttribute("data-tooltip");
      arrowEl.setAttribute("aria-label", `${direction[0].toUpperCase()+direction.slice(1)} unavailable`);
      arrowEl.setAttribute("title", "");
      return;
    }
    let label = "";
    if (state.isInCloseUp && direction === "back") {
      label = "Exit crystal close-up";
    } else if (nextLocationKey && cameraPositions[nextLocationKey]) {
      const destName = cameraPositions[nextLocationKey].name;
      const dirWord = direction.charAt(0).toUpperCase() + direction.slice(1);
      label = `${dirWord} to ${destName}`;
    } else {
      label = direction.charAt(0).toUpperCase() + direction.slice(1);
    }
    arrowEl.setAttribute("data-tooltip", label);
    arrowEl.setAttribute("aria-label", label);
    arrowEl.setAttribute("title", label);
  };

  if (state.isInCloseUp) {
    setArrowMeta(elements.navLeft, "left", false, null);
    setArrowMeta(elements.navRight, "right", false, null);
    setArrowMeta(elements.navForward, "forward", false, null);
    setArrowMeta(elements.navBack, "back", true, null);
    return;
  }

  const location = cameraPositions[state.currentLocation];

  // Compute next destinations
  const nextLeft = location.availableDirections.includes("left") ? getNextLocation("left") : null;
  const nextRight = location.availableDirections.includes("right") ? getNextLocation("right") : null;
  const nextForward = location.availableDirections.includes("forward") ? getNextLocation("forward") : null;
  const nextBack = location.availableDirections.includes("back") ? getNextLocation("back") : null;

  setArrowMeta(elements.navLeft, "left", !!nextLeft && nextLeft !== state.currentLocation, nextLeft);
  setArrowMeta(elements.navRight, "right", !!nextRight && nextRight !== state.currentLocation, nextRight);
  setArrowMeta(elements.navForward, "forward", !!nextForward && nextForward !== state.currentLocation, nextForward);
  setArrowMeta(elements.navBack, "back", !!nextBack && nextBack !== state.currentLocation, nextBack);
}

function startCameraTransition(targetLocation) {
  state.isTransitioning = true;
  state.transitionStartTime = Date.now();
  
  const currentPos = cameraPositions[state.currentLocation];
  const targetPos = cameraPositions[targetLocation];
  
  // Store start and target positions
  state.transitionStartPosition = {
    x: state.camera.position.x,
    y: state.camera.position.y,
    z: state.camera.position.z
  };
  
  state.transitionStartRotation = {
    x: state.camera.rotation.x,
    y: state.camera.rotation.y,
    z: state.camera.rotation.z
  };
  
  state.transitionTargetPosition = targetPos.position;
  state.transitionTargetRotation = targetPos.rotation;
  
  // Update state
  state.currentLocation = targetLocation;
  
  // Update UI
  updateLocationIndicator();
  updateNavigationArrows();
}

function updateCameraTransition() {
  if (!state.isTransitioning) return;
  
  const elapsed = Date.now() - state.transitionStartTime;
  const progress = Math.min(elapsed / state.transitionDuration, 1);
  
  // Smooth easing function
  const easeProgress = 1 - Math.pow(1 - progress, 3);
  
  // Interpolate position
  state.camera.position.x = state.transitionStartPosition.x + (state.transitionTargetPosition.x - state.transitionStartPosition.x) * easeProgress;
  state.camera.position.y = state.transitionStartPosition.y + (state.transitionTargetPosition.y - state.transitionStartPosition.y) * easeProgress;
  state.camera.position.z = state.transitionStartPosition.z + (state.transitionTargetPosition.z - state.transitionStartPosition.z) * easeProgress;
  
  // Interpolate rotation
  state.camera.rotation.x = state.transitionStartRotation.x + (state.transitionTargetRotation.x - state.transitionStartRotation.x) * easeProgress;
  state.camera.rotation.y = state.transitionStartRotation.y + (state.transitionTargetRotation.y - state.transitionStartRotation.y) * easeProgress;
  state.camera.rotation.z = state.transitionStartRotation.z + (state.transitionTargetRotation.z - state.transitionStartRotation.z) * easeProgress;
  
  if (progress >= 1) {
    state.isTransitioning = false;
  }
}

// Fractal Navigation Functions
function updateProximityDetection() {
  if (state.isInCloseUp) return; // Don't check proximity in close-up mode
  
  const currentPos = cameraPositions[state.currentLocation];
  state.nearbyCrystals = [];
  
  state.crystalMeshes.forEach(crystal => {
    const userData = crystal.userData;
    if (userData.type === 'crystal') {
      const distance = Math.sqrt(
        Math.pow(currentPos.position.x - crystal.position.x, 2) +
        Math.pow(currentPos.position.z - crystal.position.z, 2)
      );
      
      if (distance <= state.proximityThreshold) {
        state.nearbyCrystals.push({
          crystal: crystal,
          product: userData.product,
          distance: distance
        });
        
        // Intensify glow for nearby crystals
        if (userData.glow) {
          userData.glow.material.opacity = 0.3;
        }
      } else {
        // Reset glow for distant crystals
        if (userData.glow) {
          userData.glow.material.opacity = 0.1;
        }
      }
    }
  });
  
  // Sort by distance (closest first)
  state.nearbyCrystals.sort((a, b) => a.distance - b.distance);
}

function enterCrystalCloseUp(crystalId) {
  if (!crystalCloseUps[crystalId]) return;
  
  state.isInCloseUp = true;
  state.closeUpTarget = crystalId;
  
  const closeUpPos = crystalCloseUps[crystalId];
  
  // Start transition to close-up position
  state.isTransitioning = true;
  state.transitionStartTime = Date.now();
  
  state.transitionStartPosition = {
    x: state.camera.position.x,
    y: state.camera.position.y,
    z: state.camera.position.z
  };
  
  state.transitionStartRotation = {
    x: state.camera.rotation.x,
    y: state.camera.rotation.y,
    z: state.camera.rotation.z
  };
  
  state.transitionTargetPosition = closeUpPos.position;
  state.transitionTargetRotation = closeUpPos.rotation;
  
  // Update UI
  updateLocationIndicator();
  updateNavigationArrows();
}

function exitCrystalCloseUp() {
  if (!state.isInCloseUp) return;
  
  // Find the nearest main location to return to
  const closeUpPos = crystalCloseUps[state.closeUpTarget];
  let nearestLocation = "crystal-garden";
  let nearestDistance = Infinity;
  
  Object.entries(cameraPositions).forEach(([location, pos]) => {
    const distance = Math.sqrt(
      Math.pow(closeUpPos.position.x - pos.position.x, 2) +
      Math.pow(closeUpPos.position.z - pos.position.z, 2)
    );
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestLocation = location;
    }
  });
  
  state.isInCloseUp = false;
  state.closeUpTarget = null;
  
  // Start transition back to main location
  startCameraTransition(nearestLocation);
}

function getNextLocation(direction) {
  // Handle close-up mode
  if (state.isInCloseUp) {
    if (direction === "back") {
      return "exit-closeup"; // Special case for exiting close-up
    }
    return state.currentLocation; // Stay in close-up for other directions
  }
  
  const currentPos = cameraPositions[state.currentLocation];
  
  switch (direction) {
    case "forward":
      if (state.currentLocation === "entrance") return "main-hall";
      if (state.currentLocation === "main-hall") return "crystal-garden";
      if (state.currentLocation === "crystal-garden") return "computer-terminal";
      break;
    case "back":
      if (state.currentLocation === "main-hall") return "entrance";
      if (state.currentLocation === "crystal-garden") return "main-hall";
      if (state.currentLocation === "computer-terminal") return "crystal-garden";
      if (state.currentLocation === "left-wing") return "crystal-garden";
      if (state.currentLocation === "right-wing") return "crystal-garden";
      break;
    case "left":
      if (state.currentLocation === "entrance") return "left-wing";
      if (state.currentLocation === "main-hall") return "left-wing";
      if (state.currentLocation === "crystal-garden") return "left-wing";
      if (state.currentLocation === "computer-terminal") return "left-wing";
      if (state.currentLocation === "right-wing") return "crystal-garden";
      break;
    case "right":
      if (state.currentLocation === "entrance") return "right-wing";
      if (state.currentLocation === "main-hall") return "right-wing";
      if (state.currentLocation === "crystal-garden") return "right-wing";
      if (state.currentLocation === "computer-terminal") return "right-wing";
      if (state.currentLocation === "left-wing") return "crystal-garden";
      break;
  }
  
  return state.currentLocation; // Stay in same location if no valid move
}

function navigateTo(direction) {
  if (state.isTransitioning) return;
  
  // Handle close-up exit
  if (state.isInCloseUp && direction === "back") {
    exitCrystalCloseUp();
    return;
  }
  
  const nextLocation = getNextLocation(direction);
  if (nextLocation === state.currentLocation) return;
  
  if (nextLocation === "exit-closeup") {
    exitCrystalCloseUp();
  } else {
    startCameraTransition(nextLocation);
  }
}

// 3D Scene Creation
function create3DStore() {
  // Scene setup
  state.scene = new THREE.Scene();
  state.scene.background = new THREE.Color(0x0b1020);
  
  // Camera setup
  state.camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );
  
  // Set initial camera position
  const initialPos = cameraPositions[state.currentLocation];
  state.camera.position.set(initialPos.position.x, initialPos.position.y, initialPos.position.z);
  state.camera.rotation.set(initialPos.rotation.x, initialPos.rotation.y, initialPos.rotation.z);
  
  // Renderer setup
  state.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  state.renderer.setSize(window.innerWidth, window.innerHeight);
  state.renderer.shadowMap.enabled = true;
  state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  state.renderer.setClearColor(0x0b1020, 1);
  
  elements.container.appendChild(state.renderer.domElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  state.scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  state.scene.add(directionalLight);
  
  // Store environment
  createStoreEnvironment();
  
  // Create crystal displays
  createCrystalDisplays();
  
  // Create virtual screen in the store
  createVirtualScreen();
  
  // Update UI
  updateLocationIndicator();
  updateNavigationArrows();
  
  // Start animation loop
  animate();
  
  // Hide loading screen
  setTimeout(() => {
    elements.loadingScreen.classList.add('hidden');
  }, 1000);
}

function createStoreEnvironment() {
  // Floor
  const floorGeometry = new THREE.PlaneGeometry(30, 30);
  const floorMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x2a2a3a,
    transparent: true,
    opacity: 0.8
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  state.scene.add(floor);
  
  // Store walls
  const wallMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x1a1a2e,
    transparent: true,
    opacity: 0.7
  });
  
  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(30, 10);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, 5, -15);
  state.scene.add(backWall);
  
  // Side walls
  const sideWallGeometry = new THREE.PlaneGeometry(30, 10);
  const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-15, 5, 0);
  state.scene.add(leftWall);
  
  const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(15, 5, 0);
  state.scene.add(rightWall);
  
  // Display pedestals
  createDisplayPedestals();
}

function createDisplayPedestals() {
  const pedestalGeometry = new THREE.CylinderGeometry(1, 1.2, 1.5, 8);
  const pedestalMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x4a4a5a,
    transparent: true,
    opacity: 0.8
  });
  
  // Create pedestals in a circular arrangement
  const radius = 8;
  const count = products.length;
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.position.set(x, 0.75, z);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    state.scene.add(pedestal);
  }
}

function createCrystalDisplays() {
  const radius = 8;
  const count = products.length;
  
  products.forEach((product, index) => {
    const angle = (index / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    // Create crystal geometry
    const crystalGeometry = new THREE.OctahedronGeometry(0.8, 1);
    const crystalMaterial = new THREE.MeshPhongMaterial({
      color: crystalColors[product.id] || 0xffffff,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.position.set(x, 2.5, z);
    crystal.castShadow = true;
    
    // Add floating animation
    crystal.userData = {
      originalY: 2.5,
      floatSpeed: 0.02 + Math.random() * 0.01,
      floatAmount: 0.3,
      product: product,
      type: 'crystal'
    };
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: crystalColors[product.id] || 0xffffff,
      transparent: true,
      opacity: 0.1
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.copy(crystal.position);
    state.scene.add(glow);
    
    crystal.userData.glow = glow;
    
    state.scene.add(crystal);
    state.crystalMeshes.push(crystal);
  });
}

function createVirtualScreen() {
  // Create screen stand
  const standGeometry = new THREE.CylinderGeometry(0.3, 0.5, 3, 8);
  const standMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  stand.position.set(0, 1.5, -8);
  state.scene.add(stand);
  
  // Create screen
  const screenGeometry = new THREE.PlaneGeometry(6, 4);
  const screenMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000011,
    transparent: true,
    opacity: 0.9
  });
  
  state.virtualScreen = new THREE.Mesh(screenGeometry, screenMaterial);
  state.virtualScreen.position.set(0, 4, -7.8);
  state.virtualScreen.userData = { type: 'screen' };
  state.scene.add(state.virtualScreen);
  
  // Add screen glow
  const screenGlowGeometry = new THREE.PlaneGeometry(6.5, 4.5);
  const screenGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x4444ff,
    transparent: true,
    opacity: 0.2
  });
  const screenGlow = new THREE.Mesh(screenGlowGeometry, screenGlowMaterial);
  screenGlow.position.set(0, 4, -7.9);
  state.scene.add(screenGlow);
  
  // Add screen text overlay
  createScreenContent();
}

function createScreenContent() {
  // Create a canvas for the screen content
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  
  // Draw screen content
  context.fillStyle = '#0b1020';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add subtle background pattern
  context.fillStyle = '#1a1a2e';
  for (let i = 0; i < 20; i++) {
    context.fillRect(i * 25, 0, 1, canvas.height);
  }
  
  // Main title with glow effect
  context.shadowColor = '#8b5cf6';
  context.shadowBlur = 10;
  context.fillStyle = '#eef2ff';
  context.font = 'bold 28px Inter';
  context.textAlign = 'center';
  context.fillText('Crystal & Stone Shop', canvas.width/2, 70);
  
  // Reset shadow
  context.shadowBlur = 0;
  
  // Subtitle
  context.fillStyle = '#aab3d0';
  context.font = '18px Inter';
  context.fillText('Traditional Store Interface', canvas.width/2, 110);
  
  // Instructions
  context.fillStyle = '#8b5cf6';
  context.font = '16px Inter';
  context.fillText('Click to Access Full Store', canvas.width/2, 140);
  
  // Call to action with animation-like effect
  context.fillStyle = '#22d3ee';
  context.font = 'bold 22px Inter';
  context.fillText('🖥️ CLICK HERE 🖥️', canvas.width/2, 190);
  
  // Add some decorative elements
  context.strokeStyle = '#8b5cf6';
  context.lineWidth = 2;
  context.strokeRect(50, 30, canvas.width - 100, canvas.height - 60);
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  state.virtualScreen.material.map = texture;
  state.virtualScreen.material.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);
  
  // Update camera transition
  updateCameraTransition();
  
  // Animate crystals
  const time = Date.now() * 0.001;
  state.crystalMeshes.forEach(crystal => {
    const userData = crystal.userData;
    crystal.position.y = userData.originalY + Math.sin(time * userData.floatSpeed) * userData.floatAmount;
    crystal.rotation.y += 0.01;
    
    // Update glow position
    if (userData.glow) {
      userData.glow.position.copy(crystal.position);
      userData.glow.rotation.y += 0.005;
    }
  });
  
  // Update proximity detection
  updateProximityDetection();
  
  // Render
  state.renderer.render(state.scene, state.camera);
}

function onMouseClick(event) {
  // Skip if screen overlay is active
  if (state.isScreenActive) return;
  
  // Calculate mouse position in normalized device coordinates
  const rect = elements.container.getBoundingClientRect();
  state.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  state.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  // Cast ray from camera through mouse position
  state.raycaster.setFromCamera(state.mouse, state.camera);
  
  // Check for intersections with all interactive objects
  const intersects = state.raycaster.intersectObjects([...state.crystalMeshes, state.virtualScreen]);
  
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const userData = clickedObject.userData;
    
    if (userData.type === 'crystal') {
      // Check if we're in close-up mode or if crystal is nearby
      if (state.isInCloseUp) {
        // In close-up mode, show info panel
        showCrystalInfo(userData.product);
      } else {
        // Check if this crystal is nearby for close-up
        const nearbyCrystal = state.nearbyCrystals.find(nc => nc.crystal === clickedObject);
        if (nearbyCrystal) {
          // Enter close-up mode for this crystal
          enterCrystalCloseUp(userData.product.id);
        } else {
          // Show info panel normally
          showCrystalInfo(userData.product);
        }
      }
    } else if (userData.type === 'screen') {
      openVirtualScreen();
    }
  }
}

function showCrystalInfo(product) {
  state.selectedCrystal = product;
  
  // Update info panel content
  elements.crystalEmoji.textContent = product.emoji;
  elements.crystalName.textContent = product.name;
  elements.crystalMeta.textContent = `${product.type === "crystal" ? "Crystal" : "Stone"} • ${product.color}`;
  elements.crystalPrice.textContent = formatCurrency(product.priceCents);
  
  // Update energy tags
  elements.crystalEnergy.innerHTML = product.energy.map(energy => 
    `<span class="energy-tag">${energy}</span>`
  ).join('');
  
  // Show panel
  elements.crystalInfoPanel.classList.add('visible');
}

function hideCrystalInfo() {
  elements.crystalInfoPanel.classList.remove('visible');
  state.selectedCrystal = null;
}

function openVirtualScreen() {
  state.isScreenActive = true;
  
  // Copy 2D interface content to screen overlay
  elements.screenContent.innerHTML = elements.virtual2DInterface.innerHTML;
  
  // Re-bind events for the copied content
  bindVirtualScreenEvents();
  
  // Show overlay
  elements.screenOverlay.classList.remove('hidden');
  
  // Render initial state
  renderProducts();
  renderCart();
}

function closeVirtualScreen() {
  state.isScreenActive = false;
  elements.screenOverlay.classList.add('hidden');
}

function bindVirtualScreenEvents() {
  // Get elements from the screen content
  const screenElements = {
    grid: elements.screenContent.querySelector('#productGrid'),
    cartItems: elements.screenContent.querySelector('#cartItems'),
    searchInput: elements.screenContent.querySelector('#searchInput'),
    categorySelect: elements.screenContent.querySelector('#categorySelect'),
    sortSelect: elements.screenContent.querySelector('#sortSelect'),
    checkoutButton: elements.screenContent.querySelector('#checkoutButton'),
    closeButton: elements.screenContent.querySelector('#closeVirtualStoreButton')
  };
  
  // Bind events
  if (screenElements.closeButton) {
    screenElements.closeButton.addEventListener('click', closeVirtualScreen);
  }
  
  if (screenElements.grid) {
    screenElements.grid.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const addId = target.closest(".add-to-cart")?.getAttribute("data-id");
      if (addId) {
        addToCart(addId);
        return;
      }

      const buyNowId = target.getAttribute("data-buy-now") !== null
        ? target.getAttribute("data-id")
        : null;
      if (buyNowId) {
        addToCart(buyNowId);
      }
    });
  }

  if (screenElements.cartItems) {
    screenElements.cartItems.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const incId = target.getAttribute("data-inc");
      const decId = target.getAttribute("data-dec");
      const remId = target.getAttribute("data-remove");
      if (incId) addToCart(incId, 1);
      if (decId) decrementCartItem(decId);
      if (remId) removeFromCart(remId);
    });
  }

  if (screenElements.searchInput) {
    screenElements.searchInput.addEventListener("input", (e) => {
      state.searchTerm = e.target.value || "";
      renderProducts();
    });
  }

  if (screenElements.categorySelect) {
    screenElements.categorySelect.addEventListener("change", (e) => {
      state.activeCategory = e.target.value;
      renderProducts();
    });
  }

  if (screenElements.sortSelect) {
    screenElements.sortSelect.addEventListener("change", (e) => {
      state.activeSort = e.target.value;
      renderProducts();
    });
  }

  if (screenElements.checkoutButton) {
    screenElements.checkoutButton.addEventListener("click", () => {
      const items = Array.from(state.cartItemIdToQty.entries()).map(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        return { id, name: product?.name ?? id, qty, priceCents: product?.priceCents ?? 0 };
      });
      const subtotalAmount = elements.screenContent.querySelector('#subtotalAmount').textContent;
      const taxAmount = elements.screenContent.querySelector('#taxAmount').textContent;
      const totalAmount = elements.screenContent.querySelector('#totalAmount').textContent;
      const summary = `Checkout summary:\n\n${items.map((i) => `• ${i.name} x${i.qty} — ${formatCurrency(i.priceCents * i.qty)}`).join("\n")}\n\nSubtotal: ${subtotalAmount}\nTax: ${taxAmount}\nTotal: ${totalAmount}`;
      alert(summary);
    });
  }
}

// Cart and store functions
function addToCart(id, quantity = 1) {
  const current = state.cartItemIdToQty.get(id) || 0;
  state.cartItemIdToQty.set(id, current + quantity);
  persistCart();
  renderCart();
  updateMiniCart();
}

function getFilteredAndSortedProducts() {
  const term = state.searchTerm.trim().toLowerCase();
  let list = products.filter((p) => {
    const matchesCategory = state.activeCategory === "all" || p.type === state.activeCategory;
    const matchesTerm = !term ||
      p.name.toLowerCase().includes(term) ||
      p.color.toLowerCase().includes(term) ||
      p.energy.some((e) => e.toLowerCase().includes(term));
    return matchesCategory && matchesTerm;
  });

  switch (state.activeSort) {
    case "price-asc":
      list = list.slice().sort((a, b) => a.priceCents - b.priceCents);
      break;
    case "price-desc":
      list = list.slice().sort((a, b) => b.priceCents - a.priceCents);
      break;
    case "name-asc":
      list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      list = list.slice().sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      list = list.slice().sort((a, b) => b.popularity - a.popularity);
  }

  return list;
}

function renderProducts() {
  if (!state.isScreenActive) return;
  
  const gridElement = elements.screenContent.querySelector('#productGrid');
  if (!gridElement) return;
  
  const list = getFilteredAndSortedProducts();
  const fragment = document.createDocumentFragment();
  
  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="thumb" aria-hidden="true">
        <div class="emoji">${p.emoji}</div>
      </div>
      <div class="body">
        <div class="title">
          <h5>${p.name}</h5>
          <div class="price">${formatCurrency(p.priceCents)}</div>
        </div>
        <div class="meta">${p.type === "crystal" ? "Crystal" : "Stone"} • ${p.color} • ${p.energy.join(", ")}</div>
        <div class="actions">
          <button class="button add-to-cart" data-id="${p.id}">Add to cart</button>
          <button class="button" data-id="${p.id}" data-buy-now>Buy now</button>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });
  
  gridElement.innerHTML = "";
  gridElement.appendChild(fragment);
}

function renderCart() {
  if (!state.isScreenActive) return;
  
  const cartElement = elements.screenContent.querySelector('#cartItems');
  const subtotalElement = elements.screenContent.querySelector('#subtotalAmount');
  const taxElement = elements.screenContent.querySelector('#taxAmount');
  const totalElement = elements.screenContent.querySelector('#totalAmount');
  const checkoutElement = elements.screenContent.querySelector('#checkoutButton');
  
  if (!cartElement) return;
  
  const fragment = document.createDocumentFragment();
  let subtotalCents = 0;

  state.cartItemIdToQty.forEach((qty, id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const lineTotal = qty * product.priceCents;
    subtotalCents += lineTotal;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="emoji" aria-hidden="true">${product.emoji}</div>
      <div class="info">
        <div class="name">${product.name}</div>
        <div class="meta">${formatCurrency(product.priceCents)} each</div>
      </div>
      <div class="qty-controls">
        <button class="qty-button" data-dec="${product.id}">−</button>
        <span aria-live="polite">${qty}</span>
        <button class="qty-button" data-inc="${product.id}">+</button>
        <button class="qty-button remove-button" title="Remove" data-remove="${product.id}">✕</button>
      </div>
    `;
    fragment.appendChild(row);
  });

  cartElement.innerHTML = "";
  cartElement.appendChild(fragment);

  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  if (subtotalElement) subtotalElement.textContent = formatCurrency(subtotalCents);
  if (taxElement) taxElement.textContent = formatCurrency(taxCents);
  if (totalElement) totalElement.textContent = formatCurrency(totalCents);
  if (checkoutElement) checkoutElement.disabled = totalCents === 0;
}

function decrementCartItem(id) {
  const current = state.cartItemIdToQty.get(id) || 0;
  if (current <= 1) {
    state.cartItemIdToQty.delete(id);
  } else {
    state.cartItemIdToQty.set(id, current - 1);
  }
  persistCart();
  renderCart();
  updateMiniCart();
}

function removeFromCart(id) {
  state.cartItemIdToQty.delete(id);
  persistCart();
  renderCart();
  updateMiniCart();
}

function handleWindowResize() {
  if (state.camera && state.renderer) {
    state.camera.aspect = window.innerWidth / window.innerHeight;
    state.camera.updateProjectionMatrix();
    state.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

function toggleHelp() {
  state.helpVisible = !state.helpVisible;
  if (state.helpVisible) {
    elements.controlsHelp.classList.remove('hidden');
    elements.toggleHelp.textContent = 'Hide Help';
  } else {
    elements.controlsHelp.classList.add('hidden');
    elements.toggleHelp.textContent = 'Show Help';
  }
}

function initEvents() {
  // 3D Scene Events
  elements.container.addEventListener('click', onMouseClick);
  elements.closeInfoBtn.addEventListener('click', hideCrystalInfo);
  
  // 3D Crystal info panel events
  elements.addToCart3D.addEventListener('click', () => {
    if (state.selectedCrystal) {
      addToCart(state.selectedCrystal.id);
      hideCrystalInfo();
    }
  });
  
  // Navigation events
  elements.navLeft.addEventListener('click', () => navigateTo('left'));
  elements.navRight.addEventListener('click', () => navigateTo('right'));
  elements.navForward.addEventListener('click', () => navigateTo('forward'));
  elements.navBack.addEventListener('click', () => navigateTo('back'));
  // Keyboard activation for navigation arrows
  [
    [elements.navLeft, 'left'],
    [elements.navRight, 'right'],
    [elements.navForward, 'forward'],
    [elements.navBack, 'back'],
  ].forEach(([el, dir]) => {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateTo(dir);
      }
    });
  });
  
  // Hotspot events
  elements.hotspots.forEach(hotspot => {
    const target = hotspot.getAttribute('data-target');
    if (target) {
      const name = (cameraPositions[target] && cameraPositions[target].name) || target;
      hotspot.setAttribute('title', `Travel to ${name}`);
    }
    hotspot.addEventListener('click', () => {
      if (target && cameraPositions[target]) {
        startCameraTransition(target);
      }
    });
    hotspot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (target && cameraPositions[target]) {
          startCameraTransition(target);
        }
      }
    });
  });
  
  // Help toggle
  elements.toggleHelp.addEventListener('click', toggleHelp);
  
  // Screen overlay events
  elements.closeScreen.addEventListener('click', closeVirtualScreen);
  
  // Window resize
  window.addEventListener('resize', handleWindowResize);
  
  // Keyboard events
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (elements.crystalInfoPanel.classList.contains('visible')) {
        e.preventDefault();
        hideCrystalInfo();
      } else if (state.isScreenActive) {
        e.preventDefault();
        closeVirtualScreen();
      } else if (state.isInCloseUp) {
        e.preventDefault();
        exitCrystalCloseUp();
      }
    }
    if (e.key === "h" || e.key === "H") {
      e.preventDefault();
      toggleHelp();
    }
    
    // Spacebar to exit close-up mode
    if (e.code === "Space" && state.isInCloseUp) {
      e.preventDefault();
      exitCrystalCloseUp();
    }
    
    // Number keys for crystal close-ups (1-9, 0)
    if (!state.isInCloseUp && !state.isTransitioning && state.nearbyCrystals.length > 0) {
      const keyToIndex = {
        'Digit1': 0, 'Digit2': 1, 'Digit3': 2, 'Digit4': 3, 'Digit5': 4,
        'Digit6': 5, 'Digit7': 6, 'Digit8': 7, 'Digit9': 8, 'Digit0': 9
      };
      
      if (keyToIndex[e.code] !== undefined && state.nearbyCrystals[keyToIndex[e.code]]) {
        e.preventDefault();
        const crystal = state.nearbyCrystals[keyToIndex[e.code]];
        enterCrystalCloseUp(crystal.product.id);
      }
    }
    
    // Arrow key navigation
    if (!state.isTransitioning) {
      switch(e.code) {
        case 'ArrowLeft': navigateTo('left'); break;
        case 'ArrowRight': navigateTo('right'); break;
        case 'ArrowUp': navigateTo('forward'); break;
        case 'ArrowDown': navigateTo('back'); break;
      }
    }
    // Announce destination on navigation keys
    if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.code)) {
      const dirMap = {ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'forward', ArrowDown: 'back'};
      const dir = dirMap[e.code];
      const next = getNextLocation(dir);
      if (next && cameraPositions[next] && next !== state.currentLocation) {
        const name = cameraPositions[next].name;
        elements.locationIndicator.setAttribute('aria-label', `Navigating ${dir} to ${name}`);
      }
    }
  });
}

function init() {
  hydrateCart();
  updateMiniCart();
  initEvents();
  
  // Initialize 3D store
  create3DStore();
}

init();