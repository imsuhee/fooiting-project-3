import React from "react";
import "../../Style/Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  //드롭다운

  return (
    <div className="Navigation">
      <div>
        <div className="a">
          {/* 카테고리 */}
          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>한식</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>일식</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>중식</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>양식</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>카페</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>피자</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>치킨</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>분식</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>고기</div>
          </Link>

          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>호텔</div>
          </Link>
          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>오마카세</div>
          </Link>
          <Link to="/" className="Nav-item">
            <div className="Nav-icon">
              <img src="/img/icons/kor.png" alt="한식" />
            </div>
            <div>파인다이닝</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Navigation;
