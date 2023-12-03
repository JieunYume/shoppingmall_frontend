import { createNavbar } from "../Component/Navbar.js";

let accessToken; // 액세스 토큰을 전역 변수로 선언

// 페이지 로드 시
document.addEventListener("DOMContentLoaded", () => {
  accessToken = localStorage.getItem("accessToken"); // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken; // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);

  let postToEdit = JSON.parse(localStorage.getItem('postToEdit')); // 로컬 스토리지에서 원래 데이터를 불러옴

  // 로드된 원래 데이터를 HTML input 요소에 표시
  document.getElementById('title-input').value = postToEdit.title;
  document.getElementById('content-input').value = postToEdit.content;
});

document.getElementById('submit-button').addEventListener('click', () => {
    let postToEdit = JSON.parse(localStorage.getItem('postToEdit')); // 로컬 스토리지에서 원래 데이터를 불러옴
  
    let updatedData = {
      inquiryId: postToEdit.id,
      title: document.getElementById('title-input').value,
      content: document.getElementById('content-input').value
    };
  
    fetch(`http://localhost:8080/api/inquiry/?inquiryId=${postToEdit.id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert("수정 되었습니다."); // 수정 완료 메시지를 띄움
      window.location.href = './CustomerCenter.html'; // CustomerCenter.html 페이지로 이동
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  });
  
