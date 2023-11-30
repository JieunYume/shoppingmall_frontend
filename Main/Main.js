import { createNavbar } from '../Component/Navbar.js';
      
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});



async function fetchProducts() {
    const response = await fetch('http://localhost:8080/api/product/list');
    const data = await response.json();
    const products = data.products;
  
   
    const productList = document.getElementById('product-list');
  
    // 각 상품에 대해 카드를 생성
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

     
  
      const img = document.createElement('img');
      img.src = product.image;
      card.appendChild(img);
  
      const name = document.createElement('h2');
      name.textContent = product.name;
      card.appendChild(name);
  
      const price = document.createElement('p');
      price.textContent = product.price;
      card.appendChild(price);

      card.addEventListener('click', () => {
        // Product.html 페이지로 이동
        window.location.href = `./Product.html?id=${product.id}`;
      });
  
      productList.appendChild(card);
   
    });
  }
  
  // 페이지 로드시 상품 정보를 가져옴
  window.onload = fetchProducts;
  