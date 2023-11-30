import { createNavbar } from "../Component/Navbar.js";
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
    const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
    const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
    createNavbar(isLoggedIn);
  });
  
window.onload = async function() {
    createNavbar();
    
    const addresses = await getAddresses();
    const addressCards = document.getElementById('address-cards');

    addresses.forEach(address => {
        const card = createAddressCard(address);
        addressCards.appendChild(card);
    });
};

async function getAddresses() {
    const response = await fetch('http://localhost:8080/api/member/');
    return await response.json();
}

function createAddressCard(address) {
    const card = document.createElement('div');
    card.className = 'address-card';

    const name = document.createElement('p');
    name.textContent = address.name;
    card.appendChild(name);

    const street = document.createElement('p');
    street.textContent = address.street;
    card.appendChild(street);

    const city = document.createElement('p');
    city.textContent = address.city;
    card.appendChild(city);

    const postalCode = document.createElement('p');
    postalCode.textContent = address.postalCode;
    card.appendChild(postalCode);

    return card;
}
