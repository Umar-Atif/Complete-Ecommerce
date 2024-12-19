const output1 = document.querySelector(".products-container");

const cart = JSON.parse(localStorage.getItem("cart"))
const globalCart = cart || []

fetch("https://dummyjson.com/products")
.then((res) => res.json())
.then((res) => {
    res.products.map((item) => {
        output1.innerHTML += `
            <div class="product-card">
                <img src="${item.thumbnail}" alt="${item.title}" class="product-image">
                <h3>${item.title}</h3>
                <p>${item.description.slice(0, 50)}...</p>
                <p>Price: <span class="price">$${item.price}</span></p>
                <button class="see-more-button" onclick="seeMore(${item.id})">See More</button>
                <button class="add-to-cart" onclick="addToCart(${(item.id)})">Add To Cart</button>
            </div>`;
    });
})
.catch((err) => {
    console.error((err));
})

function seeMore(id) {
    localStorage.setItem("id", id);
    window.location = "./seemore.html";
}

function addToCart(id) {
    console.log(id);
    Swal.fire({title: "Item Added To Cart Successfully"});
    fetch(`https://dummyjson.com/products/${id}`)
    .then((res) => res.json())
    .then((res) => {
        console.log(res);
        let productInCart = globalCart.find(item => item.id === res.id);
        if (!productInCart) {
            res.quantity = 1;
            globalCart.push(res);
            localStorage.setItem("cart", JSON.stringify(globalCart));
        } else {
            productInCart.quantity++;
            localStorage.setItem("cart", JSON.stringify(globalCart));
        }
    });
}