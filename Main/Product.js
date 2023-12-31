import { createNavbar } from '../Component/Navbar.js';

let product;  // 전역 변수로 선언
let accessToken;  // 액세스토큰도 전역변수로 선언

document.addEventListener('DOMContentLoaded', () => {
  accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});




window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
  
    // json-server에서 제품 정보를 가져옴
    const response = await fetch(`http://localhost:8080/api/product/?productId=${id}`);
    product = await response.json();  // 전역 변수에 할당
  
    // 제품 정보를 화면에 표시
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = product.price;
  
    // 이벤트 리스너 추가
    document.getElementById('add-to-cart').addEventListener('click', addToCart);
    document.getElementById('add-to-wishlist').addEventListener('click', addToWishlist);
};

async function addToCart() {  
  // 장바구니에 제품 추가
  const response = await fetch(`http://localhost:8080/api/cart/?productId=${product.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`  // 헤더에 토큰 추가
    },
    body: JSON.stringify(product)
  });
  if (response.ok) {
    console.log('Added to cart');
    alert('장바구니에 추가하였습니다')
  }
  else{
    alert('error')
  }
};

async function addToWishlist() {  
  // 위시리스트에 제품 추가
  const response = await fetch(`http://localhost:8080/api/wishlist/?productId=${product.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`  // 헤더에 토큰 추가
    },
    body: JSON.stringify(product)
  });
  if (response.ok) {
    console.log('Added to wishlist');
    alert('위시리스트에 추가하였습니다')
  }
  else{
    alert(error)
  }
};

window.addToWishlist = addToWishlist;