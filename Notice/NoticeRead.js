import { createNavbar } from '../Component/Navbar.js';
      
// 페이지 로드 시
document.addEventListener('DOMContentLoaded', () => {
    const accessToken = localStorage.getItem('accessToken');  // 액세스 토큰 가져오기
    const isLoggedIn = !!accessToken;  // 액세스 토큰이 있으면 로그인 상태
    createNavbar(isLoggedIn);
  });
  
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = Number(urlParams.get('id')); // postId를 숫자로 변환합니다.

    fetch(`http://localhost:8080/api/notice/detail?noticeId=${postId}`)
        .then(response => response.json())
        .then(post => {
            const date = new Date(post.date);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-content').textContent = post.content;
            document.getElementById('post-views').textContent = `조회수: ${post.views}`;
            document.getElementById('post-date').textContent = `날짜: ${formattedDate}`;

            const prevPostLink = document.querySelector('#prev-post');
            const nextPostLink = document.querySelector('#next-post');

            // 이전 게시물 링크 설정
            if (postId > 1) {
                prevPostLink.href = `./NoticeRead.html?id=${postId - 1}`;
            } else {
                prevPostLink.style.display = 'none';  
            }

            // 다음 게시물 링크 설정
            nextPostLink.href = `./NoticeRead.html?id=${postId + 1}`;

            fetch(`http://localhost:3000/posts/${postId + 1}`).then(response => {
                if (!response.ok) {
                    nextPostLink.style.display = 'none';
                }
            });
        });
}
