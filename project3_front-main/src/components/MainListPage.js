import React from "react";
import ScrollToTop from "./Main/ScrollToTop.js";
import Banner from "./Main/MainBanner.js";
import Navigation from "./Main/Navigation.js";
import ServeBanner from "./Main/ServeBanner.js";
import "../Style/Main.css";

//메인페이지 각 배너 식당 카테고리,베스트 리뷰,스크롤 버튼
function MainListPage() {
  return (
    //30초 마다 베너 움직임
    <div>
      <Banner />
      <Navigation />
      <ServeBanner />
      <ScrollToTop />
    </div>
  );
}

export default MainListPage;
