document.addEventListener('DOMContentLoaded', () => {
    // Select all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Get product data from the button's data attributes
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            // Add the product to the cart
            addToCart(productName, productPrice);
        });
    });

    // Display the cart on page load if any items exist in localStorage
    updateCartDisplay();
});

// Cart array to hold products
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to the cart
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if product already exists in the cart
    const existingProduct = cart.find((item) => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity if the product is already in the cart
    } else {
        cart.push(product); // Add new product to the cart
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart display on the page
    updateCartDisplay();

    // Notify the user
    alert(`${productName} has been added to the cart!`);
}

// Function to update cart display
function updateCartDisplay() {
    const cartContainer = document.querySelector('.cart-container');
    if (!cartContainer) return; // Exit if there's no cart container on the page

    // Clear previous cart contents
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Create cart items list
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - ₹${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-item" data-index="${index}"> - Remove </button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Add total price display
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalElement = document.createElement('p');
    totalElement.classList.add('cart-total');
    totalElement.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
    cartContainer.appendChild(totalElement);

    // Add event listener for the remove button
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from the array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCartDisplay(); // Refresh the cart display
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const paymentMethod = "Cash on Delivery"; // You can modify this for different payment methods
    const message = `Total Amount: ₹${total}\nPayment Method: ${paymentMethod}`;
    
    alert(message); // Display the total and payment method (for now, this is a simple alert)
}

// Event listener for checkout button
const checkoutButton = document.getElementById('checkout-button');
if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
}

// Initial display of cart
updateCartDisplay();
