const output1 = document.querySelector(".products-container");

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
                <button class="add-to-cart" onclick="addToCart(${item.id , item.thumbnail, item.title, item.description, item.price} })">Add to Cart</button>
            </div>
        `;
    });
})
.catch((err) => {
    console.error((err));
})

function seeMore(id) {
    localStorage.setItem("id", id);
    window.location = "./seemore.html";
}

function addToCart(id, thumbnail, title, description, price) {
}
