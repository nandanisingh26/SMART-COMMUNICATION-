// Register Artisan
function registerArtisan() {
    const name = document.getElementById("artisan-name").value;
    const email = document.getElementById("artisan-email").value;
    const password = document.getElementById("artisan-password").value;
    
    // Simulate saving data (use backend in real implementation)
    localStorage.setItem("artisan", JSON.stringify({ name, email, password }));
    
    alert("Registration successful!");
    document.getElementById("register-section").style.display = "none";
    document.getElementById("product-upload-section").style.display = "block";
  }
  
  // Upload Product
  function uploadProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const specifications = document.getElementById("product-specifications").value;
    const image = document.getElementById("product-image").files[0];
  
    // Simulate saving product (use backend in real implementation)
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push({ name, price, specifications, image });
    localStorage.setItem("products", JSON.stringify(products));
  
    alert("Product uploaded successfully!");
  }
  