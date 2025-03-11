window.onload = function () {
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // 서버 응답이 완료되었을 때 실행할 함수 정의
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // 서버에서 받은 JSON 데이터를 JavaScript 객체로 변환
            const data = JSON.parse(this.responseText);

            // HTML 요소에 JSON 데이터를 반영
            document.querySelector('.name_text span').textContent = data.userName;
            document.querySelector('.date_text').textContent = `${data.membershipPeriod.startDate} ~ ${data.membershipPeriod.endDate}`;
        }
    };

    // JSON 파일을 GET 요청으로 불러옴
    xhr.open("GET", "../json/M_User_infoCheck.json", true); // JSON 파일 경로
    xhr.send(); // 요청 전송
};