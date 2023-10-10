import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/Header.css";
import { SearchOutlined } from "@ant-design/icons";

//검색창 컴포넌트 완료
export function Search() {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  // react-router v6에서 데이터 전달 하는 방법
  const handleSearch = () => {
    navigate("/restaurant/search", {
      state: { keyword: keyword },
    });
    setKeyword("");
  };
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="검색어를 입력하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        <SearchOutlined />
      </button>
    </div>
  );
}

export default Search;
