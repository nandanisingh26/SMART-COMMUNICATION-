function navigateToCategory(category) {
    // Store category in localStorage
    localStorage.setItem('selectedCategory', category);
    // Redirect to category.html
    window.location.href = 'category.html';
  }
  
  function addToCart() {
    alert('Product added to cart!');
  }
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slider-image');
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-Slide every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Initialize the first slide
  showSlide(currentSlide);
  // Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
  const cartList = document.getElementById('cart-list');
  const totalPriceElement = document.getElementById('total-price');
  let cart = [];
  let total = 0;

  // Add to Cart Button Click Event
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.getAttribute('data-name');
      const productPrice = parseInt(button.getAttribute('data-price'));

      // Add product to cart array
      cart.push({ name: productName, price: productPrice });

      // Update total price
      total += productPrice;

      // Update the cart display
      updateCartDisplay();
    });
  });

  // Function to Update Cart Display
  function updateCartDisplay() {
    // Clear current cart display
    cartList.innerHTML = '';

    // Display each item in the cart
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ₹${item.price}`;
      
      // Add a "Remove" button for each item
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.style.marginLeft = '10px';
      removeButton.style.background = '#e74c3c';
      removeButton.style.color = '#fff';
      removeButton.style.border = 'none';
      removeButton.style.padding = '5px 10px';
      removeButton.style.cursor = 'pointer';
      removeButton.style.borderRadius = '5px';

      removeButton.addEventListener('click', () => {
        // Remove item from cart array
        cart.splice(index, 1);

        // Deduct price from total
        total -= item.price;

        // Update cart display
        updateCartDisplay();
      });

      listItem.appendChild(removeButton);
      cartList.appendChild(listItem);
    });

    // Update total price
    totalPriceElement.textContent = `Total: ₹${total}`;
  }
});
// Contact Form Submission Handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  // Form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Basic validation
  if (name && email && message) {
    // Display success message
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
    formMessage.style.display = 'block';
    formMessage.style.color = '#28a745';

    // Reset the form
    document.getElementById('contactForm').reset();
  } else {
    alert('Please fill in all fields before submitting.');
  }
});


    