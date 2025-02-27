// src/authProvider.js
export default {
  // 로그인: username, password를 받아 백엔드 로그인 API 호출
  login: ({ username, password }) => {
    // 예시: 백엔드에 로그인 요청 (실제 URL과 로직은 프로젝트에 맞게 수정)
    return fetch("http://localhost:8586/api/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password_hash: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error("로그인 실패");
        }
        return response.json();
      })
      .then((data) => {
        // 관리자만 통과: 예를 들어 user_type이 'admin'이어야 함
        if (data.user_type !== "admin") {
          throw new Error("관리자만 접근할 수 있습니다.");
        }
        // 로그인 성공 시, 인증 정보를 로컬스토리지에 저장
        localStorage.setItem("auth", JSON.stringify(data));
      });
  },
  // 인증 체크: 인증 정보가 존재하면 성공, 없으면 실패
  checkAuth: () =>
    localStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),
  // 로그아웃: 로컬스토리지에서 인증 정보를 제거
  logout: () => {
    localStorage.removeItem("auth");
    return Promise.resolve();
  },
  // 에러 처리 (여기서는 단순히 항상 resolve)
  checkError: (error) => Promise.resolve(),
  // 권한 정보 반환: 관리자이면 "admin"을 반환
  getPermissions: () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && auth.user_type === "admin"
      ? Promise.resolve("admin")
      : Promise.reject();
  },
};
