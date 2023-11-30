import { createNavbar } from '../Component/Navbar.js';
      
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
        const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
        const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
        createNavbar(isLoggedIn);
      });
      

const form = document.getElementById("post-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const writeName = "사용자 이름"; // 실제 구현에서는 로그인한 사용자의 이름을 사용해야 합니다.
  const date = new Date().toISOString();

  const post = {
    title,
    content,
    writeName,
    date,
  };

  const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기

  fetch("http://localhost:8080/api/inquiry/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,  // 헤더에 액세스 토큰 추가
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      if (response.ok) {
        alert("게시글이 성공적으로 작성되었습니다.");
      } else {
        alert("게시글 작성에 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
