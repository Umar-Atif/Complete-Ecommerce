const get = localStorage.getItem("id");

fetch(`https://dummyjson.com/products/${get}`)
.then((res) => res.json())
.then((product) => {
    const container = document.querySelector(".product-details-container");
    container.innerHTML = `
        <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: <span class="price">$${product.price}</span></p>
            <hr>
            <h3>Reviews:</h3>
            <div class="reviews">
                ${product.reviews.map((review) => `
                    <div class="review-card">
                        <p><b>${review.reviewerName}</b> - ${review.rating} stars</p>
                        <p>${review.comment}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
});