// src/setupTests.js 또는 별도의 모킹 파일에서
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios, { delayResponse: 500 });
mock.onPost("http://localhost:8586/api/signup").reply((config) => {
  // 요청 데이터를 확인할 수도 있습니다.
  const requestData = JSON.parse(config.data);
  // 예시: 성공 응답 반환
  return [200, { message: "회원가입 성공", user: { id: 1, ...requestData } }];
});
