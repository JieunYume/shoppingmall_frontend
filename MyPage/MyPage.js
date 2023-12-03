import { createNavbar } from '../Component/Navbar.js';
      
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});

window.onload = function() {
  fetch('http://localhost:8080/api/member/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // 인증 토큰 추가
    }
  })
  .then(response => response.json())
  .then(data => {
    // 데이터의 각 키-값 쌍을 HTML 요소에 할당합니다.
    Object.entries(data).forEach(([key, value]) => {
      const cell = document.getElementById(key);
      if (cell) {
        cell.textContent = value;
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
