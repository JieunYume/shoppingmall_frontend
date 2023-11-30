import { createNavbar } from '../Component/Navbar.js';
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});



const usernameInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
 const loginButton = document.querySelector('#login-button');

  
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const user =  {
      "email":usernameInput.value,
      "password": passwordInput.value
    }

    login(user);
  });
  


async function login(user) {
  try {
      const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      });

      console.log('response');

      if (!response.ok) {
          alert('Invalid username or password');
          return;
      }

      
      const responseData = await response.json();
      console.log(responseData);

      const { accessToken, refreshToken, accessTokenExpiresIn } = responseData;

      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessTokenExpiresIn', accessTokenExpiresIn);
      const navbarElement = document.getElementById("navbar");
      navbarElement.innerHTML = '';  // 네비게이션 바 초기화
        // 로그인 상태 반영하여 네비게이션 바 생성
      window.location.href = '../Main/Main.html';
      createNavbar(true);
  } catch (error) {
      console.error('Error:', error);

  }
}

  
  

