import DaumPostcode from "react-daum-postcode"; // Daum 우편번호 서비스를 사용하기 위한 모듈
import "../Style/Post.css";

//다음 우편번호 서비스를 활용한 주소 검색
//함수형 컴포넌트 Post를 정의
const Post = (props) => {
  // 주소 검색이 완료되면 호출될 함수 complete를 정의
  const complete = (data) => {
    let fullAddress = data.address; // 검색된 기본 주소
    let extraAddress = "";

    // addressType이 "R"인 경우 (도로명 주소인 경우) 추가 주소 정보를 처리
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname; // 건물명이 존재하면 추가 주소에 포함
      }
      //건물명도 존재하면 추가 주소에 포함
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      // 최종 주소를 구성
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data); // 검색 결과 데이터를 콘솔에 출력
    console.log(fullAddress); // 최종 주소를 콘솔에 출력
    console.log(data.zonecode); // 우편번호 정보를 콘솔에 출력

    props.setcompany({
      ...props.company,
      address: fullAddress, // 주소 필드를 업데이트
    });
  };

  return (
    <div>
      <DaumPostcode className="postmodal" autoClose onComplete={complete} />
    </div>
  );
};

export default Post;
