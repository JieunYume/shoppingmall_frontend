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
        .then(response => console.log(response.json()))
        .then(data => {
          const table = document.createElement('table');
          const tbody = document.createElement('tbody');
      
          // 데이터의 각 키-값 쌍을 테이블의 행으로 생성합니다.
          Object.entries(data).forEach(([key, value]) => {
            const row = document.createElement('tr');
      
            const keyCell = document.createElement('td');
            keyCell.textContent = key;
            row.appendChild(keyCell);
      
            const valueCell = document.createElement('td');
            valueCell.textContent = value;
            row.appendChild(valueCell);
      
            tbody.appendChild(row);
          });
      
          table.appendChild(tbody);
      
          // 생성한 테이블을 문서에 추가합니다.
          document.body.appendChild(table);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
      


    