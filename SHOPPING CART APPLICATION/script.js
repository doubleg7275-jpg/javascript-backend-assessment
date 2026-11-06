
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 250000
    },
    {
        id: 2,
        name: "Headphones",
        price: 25000
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 35000
    },
    {
        id: 4,
        name: "Keyboard",
        price: 15000
    },
    {
        id: 5,
        name: "Mouse",
        price: 10000
    },
    {
        id: 6,
        name: "Power Bank",
        price: 20000
    }
];

let cart = [];
let checkoutCompleted = false;

function resetCheckout() {
    checkoutCompleted = false;

    let checkoutButton = document.getElementById("checkoutBtn");
    checkoutButton.disabled = false;
}

function displayProducts() {
    let productList = "";

    for (let product of products) {
        productList += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>Price: ₦${product.price.toLocaleString()}</p>

                <button class="add-btn" 
                    data-action="add" 
                    data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
    }

    document.getElementById("products").innerHTML = productList;
}

function addToCart(id) {
    let product = products.find(item => item.id === id);

    let cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    resetCheckout();
    displayCart();
}

function displayCart() {
    let cartList = "";

    if (cart.length === 0) {
        cartList = "<p>Your cart is empty.</p>";
    }

    for (let item of cart) {
        cartList += `
            <div class="cart-item">
                <h3>${item.name}</h3>

                <p>Price: ₦${item.price.toLocaleString()}</p>

                <p>Quantity: ${item.quantity}</p>

                <button class="quantity-btn"
                    data-action="decrease"
                    data-id="${item.id}">
                    -
                </button>

                <button class="quantity-btn"
                    data-action="increase"
                    data-id="${item.id}">
                    +
                </button>

                <button class="remove-btn"
                    data-action="remove"
                    data-id="${item.id}">
                    Remove
                </button>

                <p>Subtotal: ₦${(item.price * item.quantity).toLocaleString()}</p>
            </div>
        `;
    }

    document.getElementById("cart").innerHTML = cartList;

    displaySummary();
}

function increaseQuantity(id) {
    let item = cart.find(product => product.id === id);

    if (item) {
        item.quantity++;
    }

    resetCheckout();
    displayCart();
}

function decreaseQuantity(id) {
    let item = cart.find(product => product.id === id);

    if (item && item.quantity > 1) {
        item.quantity--;
    }

    resetCheckout();
    displayCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    resetCheckout();
    displayCart();
}

function calculateTotal() {
    let total = 0;

    for (let item of cart) {
        total += item.price * item.quantity;
    }

    return total;
}

function displaySummary() {
    let total = calculateTotal();

    let discount = 0;

    if (total > 50000) {
        discount = total * 0.10;
    }

    let finalTotal = total - discount;

    document.getElementById("summary").innerHTML = `
        <p>Total Items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}</p>

        <p>Subtotal: ₦${total.toLocaleString()}</p>

        <p>Discount: -₦${discount.toLocaleString()}</p>

        <h3>Final Total: ₦${finalTotal.toLocaleString()}</h3>
    `;
}

document.addEventListener("click", function(event) {

    let button = event.target.closest("button");

    if (!button) return;

    let action = button.dataset.action;
    let id = Number(button.dataset.id);

    if (action === "add") {
        addToCart(id);
    }

    if (action === "increase") {
        increaseQuantity(id);
    }

    if (action === "decrease") {
        decreaseQuantity(id);
    }

    if (action === "remove") {
        removeFromCart(id);
    }
});

document.getElementById("checkoutBtn").addEventListener("click", function() {

    if (cart.length === 0 || checkoutCompleted) {
        if (cart.length === 0) {
            alert("Your shopping cart is empty!");
        }

        return;
    }

    checkoutCompleted = true;
    this.disabled = true;

    let total = calculateTotal();

    let discount = total > 50000 ? total * 0.10 : 0;

    let finalTotal = total - discount;

    document.getElementById("summary").innerHTML += `
        <hr>
        <div id="checkoutMessage">
            <h3>Checkout Successful!</h3>
            <p>Number of Products: ${cart.length}</p>
            <p>Total Items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p>Amount Before Discount: ₦${total.toLocaleString()}</p>
            <p>Discount Applied: ₦${discount.toLocaleString()}</p>
            <h2>Amount to Pay: ₦${finalTotal.toLocaleString()}</h2>
        </div>
    `;
});
displayProducts();
displayCart();