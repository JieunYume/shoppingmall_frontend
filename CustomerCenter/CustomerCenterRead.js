import { createNavbar } from "../Component/Navbar.js";

let accessToken; // 액세스 토큰을 전역 변수로 선언
accessToken = localStorage.getItem("accessToken"); // 액세스 토큰 가져오기

// 페이지 로드 시
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = !!accessToken; // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});

const urlParams = new URLSearchParams(window.location.search);
const inquiryId = urlParams.get("id");

fetch(`http://localhost:8080/api/inquiry/detail?inquiryId=${inquiryId}`, {
  headers: {
    Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
  },
})
  .then((response) => response.json())
  .then((post) => {
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-content").textContent = post.content;
    document.getElementById("post-date").textContent = new Date(
      post.date
    ).toLocaleDateString();

    const modifyButton = document.getElementById("modify-button");
    if (post.canBeModified) {
      modifyButton.style.display = "block";
      modifyButton.addEventListener("click", () => {
        localStorage.setItem("postToEdit", JSON.stringify(post)); // 원래 데이터를 로컬 스토리지에 저장
        window.location.href = "./CustomerCenterReWrite.html?id=" + post.id;
      });
    } else {
      modifyButton.style.display = "none";
    }
  });
