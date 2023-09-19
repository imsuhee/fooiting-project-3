import React, { useState, useEffect } from "react";
import "../../Style/Header.css";
import { Link } from "react-router-dom";
import { Search } from "./Search.js";
import { SearchOutlined } from "@ant-design/icons";
import {
  toggleDropdown1,
  toggleDropdown2,
  toggleDropdown3,
} from "./Dropdown.js";
import "../LoginPage";
import UserProfile from "../UserProfile.js";

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

  //드롭다운
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부

  useEffect(() => {
    // 예시: 로그인 상태와 유저 닉네임을 가져오는 비동기 요청 (서버와의 통신)
    const fetchData = async () => {
      try {
        // 로그인 상태 확인 및 유저 닉네임 가져오기
        const response = await fetch("/api/user"); // 서버 API 엔드포인트로 요청
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn); // 로그인 상태 업데이트
        }
      } catch (error) {
        console.error("로그인 상태 및 닉네임 가져오기 실패:", error);
      }
    };

    fetchData(); // 데이터 가져오는 함수 호출
  }, []); // 빈 배열은 한 번만 호출되도록 설정

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
            <span
              className="navbarMenu"
              onClick={() => toggleDropdown1(showDropdown1, setShowDropdown1)}
            >
              웨이팅TOP
            </span>
            {showDropdown1 && (
              <div className="dropdownContent">
                <Link to="../Main">하위 메뉴 1-1</Link>
                <Link to="/">하위 메뉴 1-2</Link>
                <Link to="/">하위 메뉴 1-3</Link>
              </div>
            )}
          </div>
          <div className="dropdown">
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
          </div>
          <div className="dropdown">
            {isLoggedIn ? (
              // 로그인한 경우
              <div className="navbarMenu">
                <UserProfile />
              </div>
            ) : (
              // 로그인하지 않은 경우
              <Link to="../LoginPage" className="navbarMenu">
                로그인
              </Link>
            )}
          </div>
          <div className="dropdown">
            <Link to="../MyPage" className="navbarMenu">
              마이페이지
            </Link>
          </div>
          <div className="dropdown">
            <Link className="navbarMenu" to={"../SignUpPage"}>
              회원가입
            </Link>
          </div>
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
