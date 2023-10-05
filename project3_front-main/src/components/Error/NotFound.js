import React from "react";
import "../../Style/NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="box">
      <Link to={"./"}>
        <img src="/img/icons/NotFound.png" alt="메인화면 가기" />
      </Link>
      <div className="notfound">
        찾을 수 없는 페이지 입니다.
        <br />
        요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다.
      </div>
    </div>
  );
}
export default NotFound;
