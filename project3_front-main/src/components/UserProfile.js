import React, { useState, useEffect } from "react";
import { localurl } from "../utils/localUrl";

//사용자 닉네임 컴포넌트 완료
function UserProfile() {
  const [nickValue, setNick] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");

    fetch(`${localurl}/user/getUserNickname`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        setNick(data);
      });
  }, []);

  return (
    <div>
      <p>환영합니다. {nickValue}님</p>
    </div>
  );
}

export default UserProfile;
