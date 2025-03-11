let product_Item = document.querySelectorAll(".product_item");
let cartItemBtn = document.querySelectorAll(".cartItemClose");
let cartItems = document.querySelectorAll(".cart_item"); 

product_Item.forEach(product => {
    product.addEventListener('click', (e) => {
        modalArea.style.display = 'block';
    });
});

cartItems.forEach(cartsItem => {
    cartItemBtn.forEach(cartItem => {
        cartItem.addEventListener('click', (e) => {
            console.log(cartsItem);
        });
    });
});