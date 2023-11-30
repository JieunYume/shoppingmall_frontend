import { createNavbar } from '../Component/Navbar.js';

// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
    const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
    const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
    createNavbar(isLoggedIn);
  });
  

window.onload = async function() {
    const wishlist = await getWishlist();

    const container = document.getElementById('wishlist-container');
    wishlist.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
};

async function getWishlist() {
    const response = await fetch('http://localhost:8080/api/wishlist');
    return await response.json();
}

function createProductElement(product) {
    const div = document.createElement('div');
    div.classList.add('product');

    const img = document.createElement('img');
    img.src = product.image;
    div.appendChild(img);

    const h1 = document.createElement('h1');
    h1.textContent = product.title;
    div.appendChild(h1);

    const p = document.createElement('p');
    p.textContent = product.price;
    div.appendChild(p);

    const button = document.createElement('button');
    button.textContent = '삭제';
    button.addEventListener('click', () => deleteProduct(product, div));
    div.appendChild(button);

    return div;
}

async function deleteProduct(product, element) {
    const response = await fetch(`http://localhost:8080/api/wishlist/?productId=${product.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        element.remove();
    }
}
