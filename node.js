function updateCartSummary() {
    const summaryList = document.querySelector(".checkout-summary ul");
    const totalP = document.querySelector(".checkout-summary .total");
    if (!summaryList || !totalP) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    summaryList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        summaryList.innerHTML = "<li>Your cart is empty.</li>";
        totalP.innerHTML = "<strong>Total: </strong>₦0";
    } else {
        cart.forEach((item, idx) => {
            summaryList.innerHTML += `<li data-idx="${idx}">
                <img src="${item.img}" alt="${item.name}" style="width:32px;height:32px;vertical-align:middle;margin-right:8px;border-radius:4px;">
                ${item.name} <span>${item.price}</span> x${item.qty}
                <button class="remove-cart-btn" style="margin-left:10px;color:#fff;background:#d32f2f;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;">Remove</button>
            </li>`;
            let priceNum = Number(item.price.replace(/[^\d.]/g, ""));
            total += priceNum * item.qty;
        });
        totalP.innerHTML = `<strong>Total: </strong>₦${total.toLocaleString()}`;
    }
}

// Add to Cart functionality (allow multiple quantities, always reload page, no "already in cart" alert)
document.querySelectorAll(".product").forEach(function(productDiv) {
    const addToCartBtn = productDiv.querySelector(".cart-btn");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function(event) {
            event.preventDefault();
            const name = productDiv.querySelector("h2").innerText;
            const price = productDiv.querySelector("p").innerText;
            const img = productDiv.querySelector("img").getAttribute("src");
            let cart = JSON.parse(localStorage.getItem("cart") || "[]");
            // Check if already in cart
            const existing = cart.find(item => item.name === name && item.price === price);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ name, price, img, qty: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload(); // Reload the page after adding to cart
        });
    }
});

// Remove from cart (if summary is present)
document.addEventListener("click", function(e) {
    if (e.target.classList && e.target.classList.contains("remove-cart-btn")) {
        const li = e.target.closest("li");
        const idx = parseInt(li.getAttribute("data-idx"));
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartSummary();
    }
});

// Buy Now button redirects to checkout
document.querySelectorAll("button.buy-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        window.location.href = "disturbant4life.html";
    });
});

// On page load, show cart summary if present
window.addEventListener("DOMContentLoaded", function() {
    updateCartSummary();
});
