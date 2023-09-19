import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { localurl } from "../utils/localUrl";
import "../Style/Login.css";

//회원가입 완료
function SignupPage() {
  const [idValue, setId] = useState(""); // 사용자 ID
  const [pwValue, setPw] = useState(""); // 비밀번호
  const [nickValue, setNick] = useState(""); // 사용자 이름
  const [memail, setMemail] = useState(""); // 이메일
  const [mbirthDate, setMbirthDate] = useState(""); // 생일
  const [mphoneNumber, setMphoneNumber] = useState(""); // 핸드폰 번호 입력 관련 상태와 함수 추가

  // 약관 동의 상태 관리
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  //각 아이디, 비번, 이메일, 생년월일,연락처 정규식
  const userid = /^[A-Za-z0-9_-]{5,20}$/; //대소문자,숫자,_,- 길이 5~20이하
  const username = /^[A-Za-z가-힣]{2,20}$/; //대소문자or 한글만 길이2~20이하
  const userpassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/; //하나의 대소문자,숫자,특수문자 길이 8~16이하
  const emailRegex =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i; //대소문자,숫자 @ 도메인
  const birthDateRegex =
    /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/; //년월일구성
  const phoneNumberRegex = /^(\d{0,3}-?\d{0,4}-?\d{0,4})?$/; //숫자,- 구분

  useEffect(() => {
    if (mphoneNumber.length === 11) {
      setMphoneNumber((prevInputValue) =>
        prevInputValue.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
    if (mphoneNumber.length === 13) {
      setMphoneNumber((prevInputValue) =>
        prevInputValue
          .replace(/-/g, "-")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  }, [mphoneNumber]);

  const handleRegister = () => {
    // 아이디와 비밀번호가 패턴과 일치하는지 확인
    // if (!userid.test(mid)) {
    //   alert("아이디는 3~16자의 영문, 숫자, 하이픈, 언더스코어만 허용됩니다.");
    //   return;
    // }

    // if (!userpassword.test(mpw)) {
    //   alert(
    //     "비밀번호는 8자 이상의 대소문자, 숫자, 특수문자를 포함해야 합니다."
    //   );
    //   return;
    // }
    fetch(`${localurl}/user/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // 서버에 전송될 데이터 포맷 변경
      body: JSON.stringify({
        mid: idValue,
        mpw: pwValue,
        nickname: nickValue,
        memail: memail,
        mbirthDate: mbirthDate,
        mphoneNumber: mphoneNumber,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("회원가입 성공");
        } else {
          alert("회원가입 실패");
        }
      })
      .catch((error) => {
        // 페이지 이동 또는 다른 작업 수행
        console.error("회원가입 에러:", error);
        message.error(
          `회원가입 중 오류가 발생했습니다. 자세한 정보: ${error.message}`
        );
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked);
  };

  return (
    <div className="login-form-container">
      <h1 className="login-form-header">회원가입</h1>
      <Form
        name="signupForm"
        initialValues={{
          remember: false,
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login-form"
      >
        {/* 아이디 창 */}
        <Form.Item
          label=""
          name="userid"
          rules={[
            {
              required: true,
              message: "• 아이디를 입력하세요!",
            },
            {
              pattern: userid,
              message:
                "• 아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.",
            },
          ]}
        >
          {/*아이디 input 안 내용물*/}
          <Input
            value={idValue}
            onChange={(e) => setId(e.target.value)}
            size="large"
            placeholder="아이디"
          />
        </Form.Item>
        {/*이름*/}
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: "• 이름을 입력하세요!",
            },

            {
              pattern: username,
              message: "• 이름: 필수 정보입니다.",
            },
          ]}
        >
          {/*이름 input 안 내용물*/}
          <Input
            value={nickValue}
            onChange={(e) => setNick(e.target.value)}
            size="large"
            placeholder="이름"
          />
        </Form.Item>
        {/* 비밀번호 창 */}
        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: "• 비밀번호를 입력하세요!",
            },
            {
              pattern: userpassword,
              message:
                "• 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
            },
          ]}
        >
          <Input.Password
            value={pwValue}
            onChange={(e) => setPw(e.target.value)}
            size="large"
            placeholder="비밀번호"
          />
        </Form.Item>
        <Form.Item
          label=""
          name="confirmPassword"
          dependencies={["password"]} // 의존성 설정
          rules={[
            {
              required: true,
              message: "• 비밀번호를 다시 입력하세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("비밀번호가 일치하지 않습니다.");
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="비밀번호 확인" />
        </Form.Item>

        {/*이메일*/}
        <Form.Item
          label=""
          name="email"
          rules={[
            {
              required: true,
              message: "• 이메일을 입력하세요!",
            },
            {
              type: "email",
              message: "• 올바른 이메일 형식을 입력하세요!",
            },
            {
              pattern: emailRegex,
              message: "• 이메일: 이메일 주소가 정확한지 확인해 주세요.",
            },
          ]}
        >
          {/*이메일input 안 내용물*/}
          <Input
            value={memail}
            onChange={(e) => setMemail(e.target.value)}
            size="large"
            placeholder="이메일"
          />
        </Form.Item>

        {/*생년월일*/}
        <Form.Item
          label=""
          name="birthDate"
          rules={[
            {
              required: true,
              message: "• 생년월일을 입력하세요!",
            },
            {
              pattern: birthDateRegex,
              message: "• 생년월일: 필수 정보입니다.",
            },
          ]}
        >
          {/*생년월일input 안 내용물*/}
          <Input
            value={mbirthDate}
            onChange={(e) => setMbirthDate(e.target.value)}
            size="large"
            placeholder="생년월일 (예: 19900101)"
          />
        </Form.Item>

        {/*핸드폰*/}
        <Form.Item
          label=""
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "• 핸드폰 번호를 입력하세요!",
            },
            {
              pattern: phoneNumberRegex,
              message: "• 휴대전화번호: 필수 정보입니다.",
            },
          ]}
        >
          {/*핸드폰 input 안 내용물*/}

          <Input
            size="large"
            value={mphoneNumber}
            onChange={(e) => setMphoneNumber(e.target.value)}
            placeholder="핸드폰 번호 입력"
          />
        </Form.Item>

        {/*회원가입 버튼*/}
        <Form.Item>
          <Button
            className="login-form-button"
            onClick={handleRegister}
            htmlType="submit"
          >
            회원가입
          </Button>
        </Form.Item>

        {/*약관동의*/}
        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            { required: true, message: "필수 약관에 모두 동의해 주세요." },
          ]}
        >
          <Checkbox
            className="checkbox"
            checked={agreed}
            onChange={handleAgreeChange}
          >
            회원가입 약관에 동의합니다.
          </Checkbox>
        </Form.Item>

        {/*로그인 화면이동*/}
      </Form>
      <div className="login-links">
        이미 계정이 있으신가요?{" "}
        <span className="link" onClick={() => navigate("/LoginPage")}>
          로그인하기
        </span>
      </div>
    </div>
    //   <div>
    //     <input
    //       type="text"
    //       value={mid}
    //       onChange={(e) => setMid(e.target.value)}
    //       placeholder="ID"
    //     />
    //     <br />
    //     <input
    //       type="password"
    //       value={mpw}
    //       onChange={(e) => setMpw(e.target.value)}
    //       placeholder="Password"
    //     />
    //     <br />
    //     <button onClick={handleSignup}>Signup</button>
    //   </div>
    // </div>
  );
}

export default SignupPage;
