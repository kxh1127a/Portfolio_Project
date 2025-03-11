const m_username_update = document.getElementById("m_username_update");
const m_usertel_update = document.getElementById("m_usertel_update");
const radio_user_sex_btn_male = document.getElementById("radio_user_sex_btn_male");
const radio_user_sex_btn_female = document.getElementById("radio_user_sex_btn_female");
const user_info_update = document.getElementById("user_info_update");
const user_info_update_success = document.getElementById("user_info_update_success");

// 수정 버튼 클릭 이벤트
user_info_update.addEventListener("click", function() {
    toggleEditable(true); // input과 radio의 editable 상태로 전환
    user_info_update.style.display = "none"; // 수정 버튼 숨기기
    user_info_update_success.style.display = "block"; // 확인 버튼 보이기
});

// 확인 버튼 클릭 이벤트
user_info_update_success.addEventListener("click", function() {
    toggleEditable(false); // input과 radio의 readonly 상태로 전환
    user_info_update_success.style.display = "none"; // 확인 버튼 숨기기
    user_info_update.style.display = "block"; // 수정 버튼 보이기

    // 여기서 데이터를 저장하는 추가 로직을 넣으면 됩니다.
    // 예: 서버에 전송하거나 로컬 저장소에 저장.
});

// input 및 radio의 editable 상태 토글 함수
function toggleEditable(isEditable) {
    m_username_update.readOnly = !isEditable;
    m_usertel_update.readOnly = !isEditable;
    radio_user_sex_btn_male.disabled = !isEditable;
    radio_user_sex_btn_female.disabled = !isEditable;

    // 스타일 변경을 통해 사용자가 편집 가능 여부를 알 수 있도록 함
    if (isEditable) {
        m_username_update.classList.remove('readonly_class');
        m_usertel_update.classList.remove('readonly_class');
    } else {
        m_username_update.classList.add('readonly_class');
        m_usertel_update.classList.add('readonly_class');
    }
}

// 처음에는 input 및 radio가 readonly/disabled 상태입니다.
toggleEditable(false);

// 이름 입력 유효성 검사
m_username_update.addEventListener("input", function() {
    const username_value = m_username_update.value;
    const nameErrorMessage = document.getElementById("name_error_message");

    // 입력값에서 영문, 한글을 제외한 모든 문자(숫자, 특수문자, 공백) 제거
    const filteredUsername = username_value.replace(/[^가-힣a-zA-Z]/g, "");

    // 입력값이 변경되면 해당 필터링된 값으로 업데이트
    if (username_value !== filteredUsername) {
        m_username_update.value = filteredUsername;
    }

    // 정규식: 공백, 특수문자, 숫자 미포함, 영문 또는 한글만 허용 (1~10자)
    const nameRegExp = /^[가-힣a-zA-Z]{1,10}$/g;

    if (!nameRegExp.test(filteredUsername)) {
        nameErrorMessage.textContent = "이름은 1~10자의 한글 또는 영문이어야 하며 특수문자나 공백, 숫자를 포함할 수 없습니다.";
        m_username_update.classList.add("error");
    } else {
        nameErrorMessage.textContent = ""; // 에러 메시지 제거
        m_username_update.classList.remove("error");
    }

    // 최대 길이 제한 (자동으로 10자로 자르기)
    if (filteredUsername.length > 10) {
        m_username_update.value = filteredUsername.substring(0, 10);
    }
});


// 전화번호 입력 유효성 검사 및 형식 변환
m_usertel_update.addEventListener("keyup", function(event) {
    inputPhoneNumber(event.target);
});

function inputPhoneNumber(phone) {
    const phoneErrorMessage = document.getElementById("phone_error_message");
    let phoneNumber = phone.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거

    // 한국 전화번호 형식에 맞게 변환 (2자리 지역번호 또는 3자리 앞번호)
    if (phoneNumber.length < 4) {
        phone.value = phoneNumber;
    } else if (phoneNumber.length < 7) {
        phone.value = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3);
    } else if (phoneNumber.length < 11) {
        phone.value = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6);
    } else {
        phone.value = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 7) + '-' + phoneNumber.slice(7, 11);
    }

    // 전화번호 유효성 검사 (정규식: 010 또는 011로 시작하고, 총 10자리 또는 11자리)
    const phoneRegExp = /^01[0|1]-\d{3,4}-\d{4}$/;

    if (phoneRegExp.test(phone.value)) {
        phoneErrorMessage.textContent = ""; // 에러 메시지 제거
        phone.classList.remove("error");
    } else {
        phoneErrorMessage.textContent = "올바른 전화번호 형식이 아닙니다.";
        phone.classList.add("error");
    }
}

window.onload = function () {
    const ajax_E = new XMLHttpRequest(); // XMLHttpRequest 객체 생성

    ajax_E.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { // 요청 완료 및 성공 시
            const load_json = () => {
                // JSON 데이터 파싱
                const json_data = JSON.parse(this.responseText);

                // 이름, 전화번호, 성별 업데이트
                document.getElementById('m_username_update').value = json_data.userName;
                document.getElementById('m_usertel_update').value = json_data.userPhone;

                if (json_data.userSex === 'male') {
                    document.getElementById('radio_user_sex_btn_male').checked = true;
                } else {
                    document.getElementById('radio_user_sex_btn_female').checked = true;
                }

                // 잔여일수 업데이트
                const remainingDaysContainer = document.querySelector('.area_history .box');
                remainingDaysContainer.innerHTML = ''; // 기존 내용 초기화
                json_data.remainingDays.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${item.product}</span><span class="day">${item.days}</span>`;
                    remainingDaysContainer.appendChild(li);
                });

                // 구매 내역 업데이트
                const purchaseHistoryContainer = document.querySelector('.area_history .area_cont ul');
                purchaseHistoryContainer.innerHTML = ''; // 기존 내용 초기화
                json_data.purchaseHistory.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${item.product}</span><span class="history">${item.date}</span>`;
                    purchaseHistoryContainer.appendChild(li);
                });
            };

            load_json(); // JSON 데이터 로드 및 UI 업데이트 함수 호출
        }
    };

    ajax_E.open("GET", "../json/userInfo.json", true); // JSON 파일 경로와 요청 방식 설정
    ajax_E.send(); // 서버에 요청 전송
};
