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

const state = {
  cartItemIdToQty: new Map(),
  isOverlayOpen: false,
  activeCategory: "all",
  activeSort: "popularity",
  searchTerm: "",
};

const elements = {
  overlay: document.getElementById("storeOverlay"),
  backdrop: document.getElementById("overlayBackdrop"),
  openBtn: document.getElementById("openStoreButton"),
  closeBtn: document.getElementById("closeStoreButton"),
  grid: document.getElementById("productGrid"),
  cartItems: document.getElementById("cartItems"),
  subtotal: document.getElementById("subtotalAmount"),
  tax: document.getElementById("taxAmount"),
  total: document.getElementById("totalAmount"),
  checkoutButton: document.getElementById("checkoutButton"),
  searchInput: document.getElementById("searchInput"),
  categorySelect: document.getElementById("categorySelect"),
  sortSelect: document.getElementById("sortSelect"),
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
  elements.grid.innerHTML = "";
  elements.grid.appendChild(fragment);
}

function renderCart() {
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

  elements.cartItems.innerHTML = "";
  elements.cartItems.appendChild(fragment);

  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  elements.subtotal.textContent = formatCurrency(subtotalCents);
  elements.tax.textContent = formatCurrency(taxCents);
  elements.total.textContent = formatCurrency(totalCents);
  elements.checkoutButton.disabled = totalCents === 0;
}

function addToCart(id, quantity = 1) {
  const current = state.cartItemIdToQty.get(id) || 0;
  state.cartItemIdToQty.set(id, current + quantity);
  persistCart();
  renderCart();
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
}

function removeFromCart(id) {
  state.cartItemIdToQty.delete(id);
  persistCart();
  renderCart();
}

function openOverlay() {
  if (state.isOverlayOpen) return;
  state.isOverlayOpen = true;
  elements.overlay.classList.remove("hidden");
  elements.overlay.setAttribute("aria-hidden", "false");
  elements.searchInput.focus();
}

function closeOverlay() {
  if (!state.isOverlayOpen) return;
  state.isOverlayOpen = false;
  elements.overlay.classList.add("hidden");
  elements.overlay.setAttribute("aria-hidden", "true");
  elements.openBtn.focus();
}

function initEvents() {
  elements.openBtn.addEventListener("click", openOverlay);
  elements.closeBtn.addEventListener("click", closeOverlay);
  elements.backdrop.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement?.tagName?.toLowerCase();
    const isTyping = activeTag === "input" || activeTag === "textarea";
    if (!isTyping && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
      state.isOverlayOpen ? closeOverlay() : openOverlay();
    }
    if (e.key === "Escape" && state.isOverlayOpen) {
      e.preventDefault();
      closeOverlay();
    }
  });

  elements.grid.addEventListener("click", (e) => {
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
      openOverlay();
    }
  });

  elements.cartItems.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const incId = target.getAttribute("data-inc");
    const decId = target.getAttribute("data-dec");
    const remId = target.getAttribute("data-remove");
    if (incId) addToCart(incId, 1);
    if (decId) decrementCartItem(decId);
    if (remId) removeFromCart(remId);
  });

  elements.searchInput.addEventListener("input", (e) => {
    const inputEl = e.target;
    state.searchTerm = inputEl.value || "";
    renderProducts();
  });
  elements.categorySelect.addEventListener("change", (e) => {
    const selectEl = e.target;
    state.activeCategory = selectEl.value;
    renderProducts();
  });
  elements.sortSelect.addEventListener("change", (e) => {
    const selectEl = e.target;
    state.activeSort = selectEl.value;
    renderProducts();
  });

  elements.checkoutButton.addEventListener("click", () => {
    const items = Array.from(state.cartItemIdToQty.entries()).map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      return { id, name: product?.name ?? id, qty, priceCents: product?.priceCents ?? 0 };
    });
    const subtotal = elements.subtotal.textContent;
    const tax = elements.tax.textContent;
    const total = elements.total.textContent;
    const summary = `Checkout summary:\n\n${items.map((i) => `• ${i.name} x${i.qty} — ${formatCurrency(i.priceCents * i.qty)}`).join("\n")}\n\nSubtotal: ${subtotal}\nTax: ${tax}\nTotal: ${total}`;
    alert(summary);
  });
}

function init() {
  hydrateCart();
  renderProducts();
  renderCart();
  initEvents();
}

init();