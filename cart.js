const output = document.querySelector(".outputCart");
const totalDiv = document.querySelector(".totalDiv");

function print() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    output.innerHTML = ``;
    cartItems.forEach((item, index) => {
        output.innerHTML += `
        <div class="cart-item">
            <img src="${item.thumbnail}" alt="${item.title}" class="product-image">
            <div class="cart-item-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p>Price: <span class="price">$${item.price}</span></p>
                <div class="cart-item-controls">
                <button class="plus-minus-btn" onclick="plus(${index})">+</button>
                <p>${item.quantity}</p>
                <button class="plus-minus-btn" onclick="minus(${index})">-</button>
                </div>
                <button class="remove-button" onclick="remove(${index})">Remove from Cart</button>
            </div>
        </div>`;
    });
}

function clearCart() {
    console.log("hello");   
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to clear your entire cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, clear it!",
        cancelButtonText: "No, keep it"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("cart"); 
            print();
            totalPrice();
            Swal.fire("Cleared!", "Your cart has been cleared.", "success");
        }
    });
}

function remove(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to remove this item from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, keep it"
    }).then((result) => {
        if (result.isConfirmed) {
            cartItems.splice(index, 1); 
            localStorage.setItem("cart", JSON.stringify(cartItems));
            print();
            totalPrice(); 
            Swal.fire("Removed!", "The item has been removed from your cart.", "success");
        }
    });
}

function plus(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cartItems)); 
    print();
    totalPrice();
}

function minus(index) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cartItems)); 
        print();
        totalPrice();
    }
}

function totalPrice() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const calculateTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalDiv.innerHTML = `Total: $${calculateTotal.toFixed(2)}`;
}

function checkout() {
    Swal.fire({
        title: "Order Placed",
        icon: "success"
      });
}

print();
totalPrice();
