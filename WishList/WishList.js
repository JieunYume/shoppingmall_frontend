import { createNavbar } from "../Component/Navbar.js";

let accessToken; // 전역 변수로 액세스 토큰 선언

// 페이지 로드 시
document.addEventListener("DOMContentLoaded", () => {
  accessToken = localStorage.getItem("accessToken"); // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken; // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});

window.onload = async function () {
  const wishlist = await getWishlist();

  const container = document.getElementById("wishlist-container");
  if (wishlist && wishlist.wishDtoList) {
    // wishlistDto가 존재하는지 확인
    wishlist.wishDtoList.forEach((product) => {
      // wishlistDto 필드 사용
      const productElement = createProductElement(product);
      container.appendChild(productElement);
    });
  }
};

async function getWishlist() {
  const response = await fetch("http://localhost:8080/api/wishlist/", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // fetch 요청에 토큰 추가
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  console.log(data)
  return data; // 전체 데이터 반환
}

function createProductElement(product) {
  const div = document.createElement("div");
  div.classList.add("product");

  const img = document.createElement("img");
  img.src = product.image; // 필드 이름 변경
  div.appendChild(img);

  const h1 = document.createElement("h1");
  h1.textContent = product.name; // 필드 이름 변경
  div.appendChild(h1);

  const p = document.createElement("p");
  p.textContent = product.price; // 필드 이름 변경
  div.appendChild(p);

  const button = document.createElement("button");
  button.textContent = "삭제";
  button.addEventListener("click", () => deleteProduct(product, div));
  div.appendChild(button);

  return div;
}
async function deleteProduct(product, productElement) {
    const response = await fetch(`http://localhost:8080/api/wishlist/?productId=${product.productId}`, { // 'id' 대신 'productId' 사용
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    // 제품 요소를 화면에서 삭제
    productElement.remove();
  }

  
