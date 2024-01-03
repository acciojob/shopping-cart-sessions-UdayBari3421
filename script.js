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

// Cart data
let cart = [];

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
  cartList.innerHTML = '';

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${products.find(product => product.id === item.id).name} - Quantity: ${item.quantity} - $${item.quantity * products.find(product => product.id === item.id).price}`;
    const removeFromCartBtn = document.createElement("button");
    removeFromCartBtn.textContent = "Remove from Cart";
    removeFromCartBtn.addEventListener("click", () => removeFromCart(item.id));
    li.appendChild(removeFromCartBtn);
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }

  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  renderCart();
}

// Add event listener for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => addToCart(parseInt(button.dataset.id)));
});

// Add event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
