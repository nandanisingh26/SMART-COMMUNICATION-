// Load Artisan Dashboard
function loadDashboard() {
    const artisan = JSON.parse(localStorage.getItem("artisan"));
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    
    document.getElementById("dashboard-name").innerText = artisan.name;
    document.getElementById("dashboard-email").innerText = artisan.email;
    document.getElementById("total-products").innerText = products.length;
    document.getElementById("sales-performance").innerText = (products.length * 500).toFixed(2); // Example sales value
    document.getElementById("artisan-rank").innerText = Math.floor(Math.random() * 10) + 1; // Random rank
  }
  