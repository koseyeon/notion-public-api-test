import React from "react";
export const MainPage = () => {
  const pageGetter = () => {
    fetch("http://localhost:3000/page")
      .then((response) => response.json())
      .then((data) => {
        const pageResponseElem = document.querySelector(".page-response");
        pageResponseElem.innerText = JSON.stringify(data, null, 2);
      });
  };
  return (
    <div>
      <h1>메인페이지</h1>
      <button onClick={pageGetter}>페이지 정보 가져오기</button>
      <div className="page-response"></div>
    </div>
  );
};
