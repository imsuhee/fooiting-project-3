import React, { useState } from "react";
import "../../Style/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { message } from "antd";
import {
  // toggleDropdown1,
  // toggleDropdown2,
  toggleDropdown3,
} from "./Dropdown.js";
import "../LoginPage";
import UserProfile from "../UserProfile.js";

//------완료---------//

function Header({ userRole }) {
  //검색창

  const navigate = useNavigate();
  //드롭다운
  // const [showDropdown1, setShowDropdown1] = useState(false);
  // const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);

  const doTempLogout = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("로그아웃 되셨습니다.");

      // 로그아웃시 새로고침
      navigate("/");
      window.location.reload();
    } catch (error) {
      // 페이지 이동 또는 다른 작업 수행
      console.error("로그아웃 에러:", error);
      message.error(
        `로그아웃 중 오류가 발생했습니다. 자세한 정보: ${error.message}`
      );
    }
  };

  return (
    <div id="header">
      <div id="header-area">
        <div className="navbar">
          {/*로고*/}
          <Link to="/">
            <img src="/img/icons/fooiting.png" alt="" />
          </Link>

          {/*검색창*/}
          <div className="search-container">
            <Search />
          </div>
        </div>

        {/*상단 메뉴1 */}
        <div className="dropdown-Menu">
          <div className="dropdown">
            <Link to="/restaurant/top" className="navbarMenu">
              인기 TOP
            </Link>
          </div>
          <div className="dropdown">
            <Link to="/restaurant/list" className="navbarMenu">
              식당 목록
            </Link>
          </div>

          {/*유지 닉네임 표시 */}
          <div className="user-profile">
            <div className="navbar-UserProfile">
              <UserProfile />
            </div>
          </div>

          {userRole === null && (
            <div className="dropdown">
              <div className="navbarMenu">
                <Link to="/user/signup" className="navbarMenu">
                  회원가입
                </Link>
              </div>
            </div>
          )}
          {/* {userRole === null && (
            <div className="dropdown">
              <div className="navbarMenu">
                <Link to="/user/login" className="navbarMenu">
                  로그인
                </Link>
              </div>
            </div>
          )} */}
          {userRole === "ROLE_USER" && (
            <div className="dropdown">
              <Link to="/user/mypage" className="navbarMenu">
                마이페이지
              </Link>
            </div>
          )}
          {userRole === "ROLE_ADMIN" && (
            <div className="dropdown">
              <Link to="/admin/registerRestaurant" className="navbarMenu">
                업체등록
              </Link>
            </div>
          )}
          {userRole === "ROLE_ADMIN" && (
            <div className="dropdown">
              <Link to="/admin/restaurantList" className="navbarMenu">
                식당 목록(관리자용)
              </Link>
            </div>
          )}
          {userRole === "ROLE_ADMIN" && (
            <div className="dropdown">
              <Link to="/admin/userList" className="navbarMenu">
                유저 목록(관리자용)
              </Link>
            </div>
          )}

          {userRole !== null && (
            <div className="dropdown">
              <div className="navbarMenu">
                <button onClick={doTempLogout} className="logout-button">
                  로그아웃
                </button>
              </div>
            </div>
          )}
          <div className="dropdown">
            <span
              className="navbarMenu"
              onClick={() => toggleDropdown3(showDropdown3, setShowDropdown3)}
            >
              고객센터▼
            </span>
            {showDropdown3 && (
              <div className="dropdownContent">
                <Link to="/">공지사항</Link>
                <Link to="/">자주하는 질문</Link>
                <Link to="/">1 : 1 문의</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
