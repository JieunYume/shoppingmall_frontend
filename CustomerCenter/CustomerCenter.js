import { createNavbar } from '../Component/Navbar.js';
      
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
        const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
        const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
        createNavbar(isLoggedIn);
      });
      



window.onload = function() {
    fetch('http://localhost:8080/inquiry/list')
      .then(response => response.json())
      .then(posts => {
        const tableBody = document.querySelector('tbody');
        posts.forEach(post => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${post.id}</td>
            <td><a href="./NoticeRead.html?id=${post.id}">${post.title}</a></td>
            <td>${post.views}</td>
            <td>${post.date}</td>
          `;
          tableBody.appendChild(row);
        });
      });
  }
  