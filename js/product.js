/* PRODUCT DATA (same as listing) */
const products = {
  "okazu-lovers-set": {
    name: "OKAZU Lovers Set (230ml / 12 jars)",
    price: 135,
    oldPrice: 167.88,
    rating: 5,
    reviews: 32,
    images: [
      "./assets/images/products/okazu-lovers-set.jpg",
      "./assets/images/products/okazu-lovers-set.jpg",
      "./assets/images/products/okazu-lovers-set.jpg"
    ]
  },
  "chili-miso": {
    name: "OKAZU – Chili Miso",
    price: 13.99,
    oldPrice: null,
    rating: 4,
    reviews: 18,
    images: [
      "./assets/images/products/chili-miso.jpg",
      "./assets/images/products/chili-miso.jpg",
      "./assets/images/products/chili-miso.jpg"
    ]
  },
  "miso-soup-set": {
    name: "Instant Miso Soup Set",
    price: 19.99,
    oldPrice: 24,
    rating: 3,
    reviews: 12,
    images: [
      "./assets/images/products/miso-soup-set.jpg",
      "./assets/images/products/miso-soup-set.jpg",
      "./assets/images/products/miso-soup-set.jpg"
    ]
  },
  "abo-matcha": {
    name: "ABO Matcha",
    price: 34,
    oldPrice: null,
    rating: 5,
    reviews: 24,
    images: [
      "./assets/images/products/matcha.jpg",
      "./assets/images/products/matcha.jpg",
      "./assets/images/products/matcha.jpg"
    ]
  }
};

/* READ PRODUCT ID */
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products[productId];

if (!product) {
  document.body.innerHTML = "<h2 style='padding:40px'>Product not found</h2>";
  throw new Error("Invalid product ID");
}

/* POPULATE PAGE */
document.getElementById("productName").innerText = product.name;
document.getElementById("breadcrumbName").innerText = product.name;

document.getElementById("productPrice").innerHTML =
  `$${product.price}` +
  (product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : "");

document.getElementById("productRating").innerHTML =
  "★".repeat(product.rating) +
  "☆".repeat(5 - product.rating) +
  ` <span>${product.reviews} Reviews</span>`;

/* CART */
function addToCart() {
  let count = parseInt(localStorage.getItem("cartCount")) || 0;
  count++;
  localStorage.setItem("cartCount", count);
  document.getElementById("cart-count").innerText = count;
}

/* BUY NOW */
function buyNow() {
  window.location.href = "order-success.html";
}

/* CAROUSEL */
let currentIndex = 0;

function updateImage() {
  document.getElementById("carousel-img").src = product.images[currentIndex];
}

function nextImg() {
  currentIndex = (currentIndex + 1) % product.images.length;
  updateImage();
}

function prevImg() {
  currentIndex =
    (currentIndex - 1 + product.images.length) % product.images.length;
  updateImage();
}

/* TABS */
function openTab(id, btn) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-buttons button").forEach(b => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cart-count").innerText =
    localStorage.getItem("cartCount") || 0;
  updateImage();
});
