import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RestaurantDetailPage from "./components/RestaurantDetailPage";
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
import EditUserPage from "./components/EditUserPage";
import SearchList from "./components/SearchList";
import RestaurantForm from "./components/RestaurantForm";
import RoleUserList from "./components/RoleUserList";

// 권한에 따른 라우터 처리 하는 메소드
function ProtectedRoute({ element, userRole, requiredRole, redirectTo }) {
  // 사용자 역할과 필요한 역할이 일치하는지 확인하고 라우팅을 처리
  return userRole === requiredRole ? element : <Navigate to={redirectTo} />;
}

//----------완료!!!!-----------

function App() {
  const token = localStorage.getItem("refreshToken");

  let userRole = null;

  if (token != null) {
    const decoded = jwt_decode(token);
    userRole = decoded.role;
  }
  return (
    <BrowserRouter>
      {/* <UserProfile /> */}
      <Header userRole={userRole} />
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
          <Route
            path="/user/mypage"
            element={
              <ProtectedRoute
                element={<MyPage />}
                userRole={userRole}
                requiredRole="ROLE_USER"
                redirectTo="/"
              />
            }
          />
          <Route
            path="/user/edituser"
            element={
              <ProtectedRoute
                element={<EditUserPage />}
                userRole={userRole}
                requiredRole="ROLE_USER"
                redirectTo="/"
              />
            }
          />
          {/*식당 목록 페이지*/}
          <Route path="/restaurant/list" element={<RestaurantList />} />

          {/*식당 상세페이지*/}
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />

          {/*실시간 인기top 리스트*/}
          <Route path="/restaurant/top" element={<TopRatedRestaurantList />} />

          {/*카테고리별 식당을 불러오는 API 호출*/}
          <Route
            path="/restaurant/byCategory/:category"
            element={<CategoryRestaurantList />}
          />
          {/* 검색 결과 */}
          <Route path="/restaurant/search" element={<SearchList />} />

          {/* 식당 등록 페이지 */}
          <Route
            path="/admin/registerRestaurant"
            element={
              <ProtectedRoute
                element={<RestaurantForm />}
                userRole={userRole}
                requiredRole="ROLE_ADMIN"
                redirectTo="/"
              />
            }
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
          <Route
            path="/admin/userList"
            element={
              <ProtectedRoute
                element={<RoleUserList />}
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
