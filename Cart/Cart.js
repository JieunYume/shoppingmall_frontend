import { createNavbar } from "../Component/Navbar.js";

let accessToken;

// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
  accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
  console.log(accessToken);  // 토큰 출력
  const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});


window.onload = async function () {
  
  const cart = await getCart();
  const countedCart = countProducts(cart);

  const tbody = document.getElementById("cart-body");
  countedCart.forEach((product) => {
    const row = createProductRow(product);
    tbody.appendChild(row);
  });

  const orderButton = document.getElementById("order-button");
  orderButton.addEventListener("click", orderProducts);
};

async function getCart() {
  const response = await fetch("http://localhost:8080/api/cart/", {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);

  return data.cartDtoList;  // 'cartDtoList' 배열 반환
}

function createProductRow(product) {
  const tr = document.createElement("tr");

  const imgTd = document.createElement("td");
  const img = document.createElement("img");
  img.src = product.image;
  imgTd.appendChild(img);

  const titleTd = document.createElement("td");
  titleTd.textContent = product.name;

  const priceTd = document.createElement("td");
  priceTd.textContent = product.price;

  const deleteTd = document.createElement("td");
  const button = document.createElement("button");
  button.textContent = "삭제";
  button.addEventListener("click", () => deleteProduct(product, tr, accessToken)); // accessToken 추가

  deleteTd.appendChild(button);
  const countTd = document.createElement("td");
  countTd.textContent = product.count;

  tr.appendChild(imgTd);
  tr.appendChild(titleTd);
  tr.appendChild(priceTd);
  tr.appendChild(deleteTd);
  tr.appendChild(countTd);

  return tr;
}

function countProducts(products) {
  const counted = {};

  products.forEach(product => {
    const id = product.productId;
    if (id in counted) {
      counted[id].count++;
    } else {
      counted[id] = {...product, count: 1};
    }
  });

  return Object.values(counted);
}

async function deleteProduct(product, row, token) {
  const response = await fetch(`http://localhost:8080/api/cart/?productId=${product.productId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    row.remove();
  }
}
async function orderProducts() {
  window.location.href = "./OrderInfo.html";
}


