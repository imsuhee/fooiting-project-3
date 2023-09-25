import React from "react";
import ScrollToTop from "./Main/ScrollToTop.js";
//import Banner from "./Main/MainBanner.js";
import Navigation from "./Main/Navigation.js";
import ServeBanner from "./Main/ServeBanner.js";
import "../Style/Main.css";
import { BrowserRouter as Router } from "react-router-dom";

//메인페이지 각 배너 식당 카테고리,베스트 리뷰,스크롤 버튼
function MainListPage({ userRole }) {
  return (
    <Router>
      <div>
        {/* <Banner /> */}
        <Navigation userRole={userRole} />
        <ServeBanner />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default MainListPage;
