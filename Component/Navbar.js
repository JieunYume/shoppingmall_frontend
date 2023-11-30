export function createNavbar( isLoggedIn ) {
    
  const navbarElement = document.getElementById("navbar");
  navbarElement.innerHTML = '';
  const navLinks = [
    { title: "Shop", url: "../Main/Main.html" },
    { title: "공지사항", url: "../Notice/Notice.html" },
    { title: "고객센터", url: "../CustomerCenter/CustomerCenter.html" },
  ];

  const ulElement = document.createElement("ul");
  navLinks.forEach((link) => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.href = link.url;
    anchor.textContent = link.title;

    listItem.appendChild(anchor);
    ulElement.appendChild(listItem);
  });

  //로그인 상태에 따라 동적으로 처리해야 할 부분

  const navLinks2 = [
    {
      title: isLoggedIn ? "장바구니" : "로그인",
      url: isLoggedIn ? "../Cart/Cart.html" : "../Login/Login.html",
    },
  ];

  if (isLoggedIn) {
    navLinks2.push({ title: "위시리스트", url: "../WishList/WishList.html" });
    navLinks2.push({ title: "마이페이지", url: "../MyPage/Mypage.html" });
  }

  const ulElement2 = document.createElement("ul");
  navLinks2.forEach((link) => {
    const listItem2 = document.createElement("li");
    const anchor2 = document.createElement("a");
    anchor2.href = link.url;
    anchor2.textContent = link.title;

    listItem2.appendChild(anchor2);
    ulElement2.appendChild(listItem2);
  });

  ulElement.className = "navbar_1";
  ulElement2.className = "navbar_2";
  navbarElement.appendChild(ulElement);
  navbarElement.appendChild(ulElement2);
}

// 로그인 안한 상태 : 로그인 // 로그인 0 : 장바구니 위시리스트 마이페이지
