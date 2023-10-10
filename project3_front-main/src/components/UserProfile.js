import { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";
import { Link } from "react-router-dom";
import "../Style/Header.css";
//----------완료!!!!-----------

function UserProfile() {
  const [userNickname, setUserNickname] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  //사용자 닉네임 컴포넌트
  useEffect(() => {
    const token = localStorage.getItem("refreshToken");

    // 토큰이 없으면 fetch를 호출하지 않고 종료
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch(`${localurl}/user/getUserNickname`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setIsAuthenticated(false); // 토큰이 유효하지 않으면 인증 상태를 false로 설정
        }
        return response.text();
      })
      .then((data) => {
        setUserNickname(data);
      });
  }, []);

  return isAuthenticated ? (
    <p className="UserProfile">{userNickname}님</p>
  ) : (
    <Link to={"/user/login"} className="User-Profile">
      로그인
    </Link>
  );
}

export default UserProfile;
