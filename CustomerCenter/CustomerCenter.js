import { createNavbar } from "../Component/Navbar.js";

let accessToken; // 액세스 토큰을 전역 변수로 선언

// 페이지 로드 시
document.addEventListener("DOMContentLoaded", () => {
  accessToken = localStorage.getItem("accessToken"); // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken; // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});

window.onload = function () {
  fetch("http://localhost:8080/api/inquiry/list", {
    headers: {
      Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("tbody");
      data.inquiries.forEach((post) => {
        const date = new Date(post.date); // Date 객체 생성
        const formattedDate = date.toLocaleDateString(); // yyyy-mm-dd 형식으로 변환
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${post.id}</td>
                <td><a href="./CustomerCenterRead.html?id=${post.id}">${post.title}</a></td> 
                <td>${formattedDate}</td>  
              `;
        tableBody.appendChild(row);
      });
    });
};
