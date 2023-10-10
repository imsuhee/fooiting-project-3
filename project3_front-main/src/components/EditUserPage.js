import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { localurl } from "../utils/localUrl";
import "../Style/EditUserPage.css";

//회원 정보 수정 페이지 완료!!
function EditUserPage() {
  const navigate = useNavigate();
  // navigate의 state 속성 값 받아오기
  const location = useLocation();
  const userEditInfo = location.state.userEditInfo;

  const [newNickname, setNewNickname] = useState(userEditInfo.nickname);
  const [newEmail, setNewEmail] = useState(userEditInfo.email);
  const [newPhonenumber, setNewPhonenumber] = useState(
    userEditInfo.phoneNumber
  );

  const editConfirm = () => {
    const token = localStorage.getItem("refreshToken");

    if (!token) {
      return;
    }

    fetch(`${localurl}/user/editInfo`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: newNickname,
        email: newEmail,
        phoneNumber: newPhonenumber,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("정보가 수정되었습니다");
          navigate("/user/mypage");
          window.location.reload();
        } else {
          alert("정보 수정에 실패하셨습니다");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error. Please try again.");
      });
  };

  return (
    <div className="wrap">
      <div className="Container">
        <div className="name">
          <h3>회원 정보 수정</h3>
        </div>
      </div>

      <div className="list_Container">
        <div className="item">
          <div className="text">
            <span>닉네임 </span>
            <input
              className="my_input"
              defaultValue={userEditInfo.nickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="닉네임"
            />
          </div>
        </div>

        <div className="item">
          <div className="text">
            <span>이메일 </span>
            <input
              className="my_input"
              defaultValue={userEditInfo.email}
              onChange={(e) => setNewEmail(e.target.value)}
              type="email"
              placeholder="이메일"
            />
          </div>
        </div>

        <div className="item">
          <div className="text">
            <span>연락처 </span>
            <input
              className="my_input"
              defaultValue={userEditInfo.phoneNumber}
              onChange={(e) => setNewPhonenumber(e.target.value)}
              placeholder="연락처"
            />
          </div>
        </div>

        <div className="button_container">
          <button className="button" onClick={editConfirm}>
            수정하기
          </button>
        </div>
      </div>
      <div className="summary_Container"></div>

      <div className="info_Container">
        <Link to="/" className="item">
          <div>공지사항</div>
        </Link>
        <Link to="/" className="item">
          <div>이용안내</div>
        </Link>
        <Link to="/" className="item">
          <div>고객센터</div>
        </Link>
      </div>
    </div>
  );
}

export default EditUserPage;
