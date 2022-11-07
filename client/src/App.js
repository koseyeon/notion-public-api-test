import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ErrorPage } from "./pages/ErrorPage";
import { MainPage } from "./pages/MainPage";
import { AccessTokenProvider } from "./context/accessTokenStore";
function App() {
  return (
    <div className="App">
      <AccessTokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/main" element={<MainPage />}></Route>
            {/* <Route path="/auth/notion/callback" element={<OAuthPage />}></Route> */}
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
      </AccessTokenProvider>
    </div>
  );
}

export default App;
