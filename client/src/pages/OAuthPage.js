// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAccessTokenDispatch } from "../context/accessTokenStore";
// export const OAuthPage = () => {
//   const navagate = useNavigate();
//   const accessTokenDispatch = useAccessTokenDispatch();
//   const accessTokenGetter = async () => {
//     const code = new URL(window.location.href).searchParams.get("code");
//     if (code !== "null") {
//       const response = await axios({
//         method: "POST",
//         url: "https://api.notion.com/v1/oauth/token",
//         auth: {
//           username: process.env.REACT_APP_CLIENT_ID,
//           password: process.env.REACT_APP_CLIENT_SECRET,
//         },
//         headers: {
//           // Authorization: `Basic ${authValue}`,
//           "Content-Type": "application/json",
//         },
//         data: {
//           grant_type: "authorization_code",
//           code: code,
//           redirect_uri: "http://localhost:3000/auth/notion/callback",
//         },
//       });
//       const accessToken = response.data.access_token;
//       if (accessToken) {
//         accessTokenDispatch({ type: "SET_ACCESSTOKEN", value: `${accessToken}` });
//         navagate("/main");
//       }
//     }
//   };
//   useEffect(() => {
//     accessTokenGetter();
//   });
//   return (
//     <div>
//       <h1>oauth페이지</h1>
//     </div>
//   );
// };
