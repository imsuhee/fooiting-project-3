import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RestaurantDetailPage from "./components/RestaurantDetailPage";
//import SamplePage from "./components/SamplePage";
import MainListPage from "./components/MainListPage";
import RegisterPage from "./components/RegisterPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MyPage from "./components/MyPage/MyPage";
import RestaurantList from "./components/RestaurantList";
import CategoryRestaurantList from "./components/CategoryRestaurantList";
import TopRatedRestaurantList from "./components/TopRatedRestaurantList";
import AdminRestaurantList from "./components/AdminRestaurantList";
import NotFound from "./components/Error/NotFound";
import jwt_decode from "jwt-decode";
//import UserProfile from "./components/UserProfile";

// 권한에 따른 라우터 처리 하는 메소드
function ProtectedRoute({ element, userRole, requiredRole, redirectTo }) {
  // 사용자 역할과 필요한 역할이 일치하는지 확인하고 라우팅을 처리
  return userRole === requiredRole ? element : <Navigate to={redirectTo} />;
}

//----------완료!!!!-----------

function App() {
  //const [isAuthenticated, setIsAuthenticated] = useState(true);
  // 로그인 또는 로그아웃 시에 isAuthenticated 상태를 업데이트
  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  // };
  // 접속 유저 확인
  // 로컬 스토리지에서 refreshToken을 가져와 사용자 역할을 확인
  const token = localStorage.getItem("refreshToken");

  let userRole = null;

  if (token != null) {
    const decoded = jwt_decode(token);
    userRole = decoded.role;
  }
  return (
    <BrowserRouter>
      {/* <UserProfile /> */}
      <Header />
      <div id="body">
        <Routes>
          {/*메인페이지*/}
          <Route path="/" element={<MainListPage />} />

          {/*로그인페이지*/}
          <Route
            path="/user/login"
            element={
              <ProtectedRoute
                element={<LoginPage />}
                userRole={userRole}
                requiredRole={null}
                redirectTo="/"
              />
            }
          />

          {/*회원가입페이지*/}
          <Route
            path="/user/signup"
            element={
              <ProtectedRoute
                element={<RegisterPage />}
                userRole={userRole}
                requiredRole={null}
                redirectTo="/"
              />
            }
          />
          {/*마이페이지 디자인만*/}
          <Route path="/user/mypage" element={<MyPage />} />

          {/* 마이페이지 둘이 합칠 예정
          <Route path="/SamplePage" element={<SamplePage />} /> */}

          {/*식당 등록페이지*/}
          <Route path="/restaurant/list" element={<RestaurantList />} />

          {/*식당 상세페이지*/}
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />

          {/*실시간 인기별 리스트*/}
          <Route path="/restaurant/top" element={<TopRatedRestaurantList />} />

          {/*카테고리별 식당을 불러오는 API 호출*/}
          <Route
            path="/restaurant/byCategory/:category"
            element={<CategoryRestaurantList />}
          />

          {/*식당등록 페이지*/}
          <Route
            path="/admin/restaurantList"
            element={
              <ProtectedRoute
                element={<AdminRestaurantList />}
                userRole={userRole}
                requiredRole="ROLE_ADMIN"
                redirectTo="/"
              />
            }
          />
          {/*NotFound 페이지*/}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
