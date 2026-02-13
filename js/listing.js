const baseProducts = [
  {
    id: "okazu-lovers-set",
    name: "OKAZU Lovers Set",
    price: 135,
    oldPrice: 167.88,
    rating: 5,
    reviews: 32,
    image: "assets/images/products/okazu-lovers-set.jpg",
    category: "chili",
    type: "multi"
  },
  {
    id: "chili-miso",
    name: "OKAZU – Chili Miso",
    price: 13.99,
    oldPrice: null,
    rating: 4,
    reviews: 18,
    image: "assets/images/products/chili-miso.jpg",
    category: "chili",
    type: "single"
  },
  {
    id: "miso-soup-set",
    name: "Instant Miso Soup Set",
    price: 19.99,
    oldPrice: 24,
    rating: 3,
    reviews: 12,
    image: "assets/images/products/miso-soup-set.jpg",
    category: "soup",
    type: "multi"
  },
  {
    id: "abo-matcha",
    name: "ABO Matcha",
    price: 34,
    oldPrice: null,
    rating: 5,
    reviews: 24,
    image: "assets/images/products/matcha.jpg",
    category: "matcha",
    type: "single"
  }
];

// repeat products for demo
const products = [...baseProducts, ...baseProducts, ...baseProducts];

const grid = document.getElementById("productGrid");
const count = document.getElementById("productCount");
const sortSelect = document.getElementById("sortSelect");
const filterBtn = document.getElementById("filterBtn");
const filtersPanel = document.getElementById("filtersPanel");

const categoryChecks = document.querySelectorAll(".category-filter");
const typeChecks = document.querySelectorAll(".type-filter");
const ratingChecks = document.querySelectorAll(".rating-filter");

let filtered = [...products];

function render(items) {
  grid.innerHTML = "";
  items.forEach(p => {
    grid.innerHTML += `
      <div class="product-card" onclick="goToProduct('${p.id}')">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <h3>${p.name}</h3>
        <p class="price">$${p.price}${p.oldPrice ? `<span>$${p.oldPrice}</span>` : ""}</p>
        <div class="rating">
          <span class="stars">
            ${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}
          </span>
          (${p.reviews} Reviews)
        </div>
      </div>
    `;
  });
  count.textContent = items.length;
}

function applyFilters() {
  const cats = [...categoryChecks].filter(c => c.checked).map(c => c.value);
  const types = [...typeChecks].filter(t => t.checked).map(t => t.value);
  const ratings = [...ratingChecks].filter(r => r.checked).map(r => Number(r.value));

  filtered = products.filter(p => {
    const cMatch = !cats.length || cats.includes(p.category);
    const tMatch = !types.length || types.includes(p.type);
    const rMatch = !ratings.length || ratings.some(r => p.rating >= r);
    return cMatch && tMatch && rMatch;
  });

  sortProducts(sortSelect.value);
}

function sortProducts(val) {
  let sorted = [...filtered];
  if (val === "az") sorted.sort((a,b)=>a.name.localeCompare(b.name));
  if (val === "za") sorted.sort((a,b)=>b.name.localeCompare(a.name));
  if (val === "price-low") sorted.sort((a,b)=>a.price-b.price);
  if (val === "price-high") sorted.sort((a,b)=>b.price-a.price);
  render(sorted);
}

// 🔗 NAVIGATION FUNCTION
function goToProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

filterBtn.addEventListener("click", () => {
  filtersPanel.classList.toggle("hidden");
  filterBtn.classList.toggle("active");
});

categoryChecks.forEach(c => c.addEventListener("change", applyFilters));
typeChecks.forEach(t => t.addEventListener("change", applyFilters));
ratingChecks.forEach(r => r.addEventListener("change", applyFilters));
sortSelect.addEventListener("change", e => sortProducts(e.target.value));

render(products);
