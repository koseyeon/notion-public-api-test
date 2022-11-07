import React from "react";
export const HomePage = () => {
  const connectHandler = async (e) => {
    const redirectUrl = encodeURIComponent("http://localhost:3000/auth/notion/callback");
    window.location.href = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=code`;
  };
  return (
    <div>
      <h1>홈페이지</h1>
      <button onClick={connectHandler}>노션 연결하기</button>
    </div>
  );
};
