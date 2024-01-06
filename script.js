// script.js

// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  // Get cart data from session storage
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Clear previous cart list
  cartList.innerHTML = "";

  // Render new cart list
  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  // Find the product with the given id
  const product = products.find((p) => p.id === productId);

  // Get cart data from session storage
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Add the product to the cart
  cartData.push({ id: product.id, name: product.name, price: product.price });

  // Save the updated cart data to session storage
  sessionStorage.setItem("cart", JSON.stringify(cartData));

  // Render the updated cart
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  // Get cart data from session storage
  const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Remove the item with the given id from the cart
  const updatedCart = cartData.filter((item) => item.id !== productId);

  // Save the updated cart data to session storage
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));

  // Render the updated cart
  renderCart();
}

// Clear cart
function clearCart() {
  // Clear cart data in session storage
  sessionStorage.removeItem("cart");

  // Render an empty cart
  renderCart();
}

// Event listeners
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(parseInt(event.target.getAttribute("data-id")));
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    removeFromCart(parseInt(event.target.getAttribute("data-id")));
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
