import { createNavbar } from '../Component/Navbar.js';
      
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
  const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
  createNavbar(isLoggedIn);
});


//email 직접 입력 칸 구현
const domainListEl = document.querySelector("#domain-list");
const domainInputEl = document.querySelector("#domain-txt");

domainListEl.addEventListener("change", (event) => {
  if (event.target.value !== "type") {
    domainInputEl.value = event.target.value;
    domainInputEl.disabled = true;
  } else {
    // 직접 입력 시

    domainInputEl.value = "";
    domainInputEl.disabled = false;
  }
});

const form = document.querySelector('.form');

form.addEventListener('submit', function(event){
    event.preventDefault();
    //비밀번호 확인
  var p1 = document.getElementById("password1").value;
  var p2 = document.getElementById("password2").value;

  if (p1.length < 6) {
    alert("입력한 글자가 6글자 이상이어야 합니다.");
    return false;
  }

  if (p1 != p2) {
    alert("비밀번호가 일치하지 않습니다");
    return false;
  }

  //값 가져오기
  const name = document.querySelector('input[name="name"]').value;
  var emailFront = document.querySelector('input[name="email"]').value;
  var emailBackInput = document.getElementById("domain-txt").value;
  var emailBackSelect = document.getElementById("domain-list").value;
  var emailBack = emailBackInput ? emailBackInput : emailBackSelect;
  var email = emailFront + "@" + emailBack;
  const password = document.querySelector('input[name="password"]').value;
  const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
  const birthDate = document.querySelector('input[name="birthDate"]').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const address = document.querySelector('input[name="address"]').value;
  const smsAcceptance = document.querySelector(
    'input[name="sms"]:checked'
  ).value;
  const emailAcceptance = document.querySelector(
    'input[name="emailSelect"]:checked'
  ).value;

  const data = {
    name,
    email,
    password,
    phoneNumber,
    birthDate,
    gender,
    address,
    smsAcceptance,
    emailAcceptance
  }

  console.log(data);

  //post

  fetch(`http://localhost:8080/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((response => {
            if (response.ok) {
              alert('회원가입이 성공적으로 완료되었습니다!');
              window.location.href = './Login.html'; 
            } else {
              throw new Error('회원가입에 실패하였습니다.');
            }
          }))
        .then(data => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });
})