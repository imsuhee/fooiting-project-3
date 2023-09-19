import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
//import RegisterPage from "./components/RegisterPage"; 회원가입 페이지
import RestaurantDetailPage from "./components/RestaurantDetailPage";
import RestaurantForm from "./components/RestaurantForm";
import SamplePage from "./components/SamplePage";
import UserProfile from "./components/UserProfile";
import MainListPage from "./components/MainListPage";
import SignUpPage from "./components/SignUpPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MyPage from "./components/MyPage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div id="body">
        <Routes>
          <Route path="/" element={<MainListPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/MyPage" element={<MyPage />} />
          {/* <Route path="/RegisterPage" element={<RegisterPage />} /> */}
          <Route path="/SamplePage" element={<SamplePage />} />
          <Route path="/RestaurantForm" element={<RestaurantForm />} />
          <Route
            path="/RestaurantDetailPage"
            element={<RestaurantDetailPage />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
