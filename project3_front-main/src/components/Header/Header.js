import React, { useState, useEffect } from "react";
import "../../Style/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "./Search.js";
import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import {
  // toggleDropdown1,
  // toggleDropdown2,
  toggleDropdown3,
} from "./Dropdown.js";
import "../LoginPage";
import UserProfile from "../UserProfile.js";

//------완료---------//

function Header() {
  //   const [scrolled, setScrolled] = useState(false);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       if (window.scrollY > 50) {
  //         setScrolled(true); // 스크롤이 일정 이상 내려갔을 때
  //       } else {
  //         setScrolled(false); // 스크롤이 위로 올라갔을 때
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);

  //검색창
  const { query, handleInputChange, handleSearch } = Search();
  const navigate = useNavigate();
  //드롭다운
  // const [showDropdown1, setShowDropdown1] = useState(false);
  // const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 마운트될 때 로그인 상태를 확인
  useEffect(() => {
    const token = localStorage.getItem("refreshToken");
    setIsLoggedIn(!!token); // 토큰이 있는 경우에만 로그인 상태로 간주
  }, []);

  const doTempLogout = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("로그아웃 되셨습니다.");
      // 로그아웃시 새로고침
      window.location.reload();
      navigate("/");
    } catch (error) {
      // 페이지 이동 또는 다른 작업 수행
      console.error("로그아웃 에러:", error);
      message.error(
        `로그아웃 중 오류가 발생했습니다. 자세한 정보: ${error.message}`
      );
    }
  };
  return (
    //<div className={scrolled ? "scrolled-header" : "header"}>
    <div id="header">
      <div id="header-area">
        <div className="navbar">
          {/*로고*/}
          <Link to="/">
            <img src="/img/icons/fooiting.png" alt="" />
          </Link>

          {/*검색창*/}
          <div className="search-container">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={query}
              onChange={handleInputChange}
              className="search-input" // 커스텀 클래스 적용
            />
            <button onClick={handleSearch} className="search-button">
              <SearchOutlined />
            </button>
          </div>
        </div>
        {/*상단 메뉴1 */}
        <div className="dropdown-Menu">
          <div className="dropdown">
            <Link to="/restaurant/top" className="navbarMenu">
              실시간 TOP
            </Link>
          </div>
          {/* <div className="dropdown">
            <span
              className="navbarMenu"
              onClick={() => toggleDropdown2(showDropdown2, setShowDropdown2)}
            >
              지역별TOP
            </span>
            {showDropdown2 && (
              <div className="dropdownContent">
                <Link to="/">하위 메뉴 1-1</Link>
                <Link to="/">하위 메뉴 1-2</Link>
                <Link to="/">하위 메뉴 1-3</Link>
              </div>
            )}
          </div> */}

          {isLoggedIn ? (
            <>
              <div className="user-profile">
                <div className="navbar-UserProfile">
                  <UserProfile />
                </div>
              </div>
              <div className="dropdown">
                <div className="navbarMenu">
                  <button onClick={doTempLogout} className="logout-button">
                    로그아웃
                  </button>
                </div>
              </div>
              <div className="dropdown">
                <Link to="/user/mypage" className="navbarMenu">
                  마이페이지
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="dropdown">
                <div className="navbarMenu">
                  <Link to="/user/login" className="navbarMenu">
                    로그인
                  </Link>
                </div>
              </div>
              <div className="dropdown">
                <div className="navbarMenu">
                  <Link to="/user/signup" className="navbarMenu">
                    회원가입
                  </Link>
                </div>
              </div>
            </>
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
