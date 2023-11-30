import { createNavbar } from '../Component/Navbar.js';

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = !!accessToken;
  createNavbar(isLoggedIn);
});

window.onload = function() {
  console.log("awer");
  fetch('http://localhost:8080/api/notice/list')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('tbody');
      data.noticeList.forEach(post => {
        const date = new Date(post.date);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${post.id}</td>
          <td><a href="./NoticeRead.html?id=${post.id}">${post.title}</a></td>
          <td>${post.views}</td>
          <td>${formattedDate}</td>
        `;
        tableBody.appendChild(row);
      });
    });
}
