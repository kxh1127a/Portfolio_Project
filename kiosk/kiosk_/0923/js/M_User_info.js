const m_username_update = document.getElementById("m_username_update");
const m_usertel_update = document.getElementById("m_usertel_update");
const radio_user_sex_btn_male = document.getElementById("radio_user_sex_btn_male");
const radio_user_sex_btn_female = document.getElementById("radio_user_sex_btn_female");
const user_info_update = document.getElementById("user_info_update");
const user_info_update_success = document.getElementById("user_info_update_success");

// editable control
function toggleEditable(isEditable) {
    m_username_update.readOnly = !isEditable;
    m_usertel_update.readOnly = !isEditable;
    radio_user_sex_btn_male.disabled = !isEditable;
    radio_user_sex_btn_female.disabled = !isEditable;

    if (isEditable) {
        m_username_update.classList.remove('readonly_class');
        m_usertel_update.classList.remove('readonly_class');
    } else {
        m_username_update.classList.add('readonly_class');
        m_usertel_update.classList.add('readonly_class');
    }
}
toggleEditable(false); //default

// edit btn
let edit_toggle = () => {
    user_info_update.addEventListener("click", function() {
        toggleEditable(true);
        user_info_update.style.display = "none"; 
        user_info_update_success.style.display = "block";
    });

    user_info_update_success.addEventListener("click", function() {
        toggleEditable(false); 
        user_info_update_success.style.display = "none"; 
        user_info_update.style.display = "block"; 
    });
}
edit_toggle();


// input name
m_username_update.addEventListener('input', (e) => {
    const user_info_name = e.target.value;
    const user_info_def_char = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
    const user_info_correct_char = /^[가-힣a-zA-Z]+$/;

    if (user_info_correct_char.test(user_info_name)) {
        e.target.className = 'successPlaing';
        document.getElementById('name_error_message').style.display = 'none';
    } else if (user_info_def_char.test(user_info_name)) {
        e.target.className = 'successPla';
        document.getElementById('name_error_message').style.display = 'none';
    } else {
        e.target.className = 'errorPla';
        document.getElementById('name_error_message').style.display = 'block';
        e.target.value = user_info_name.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, '');
    }
});


// 전화번호 입력 유효성 검사 및 형식 변환
m_usertel_update.addEventListener('input', (e) => {
    const user_info_phone = e.target.value.replace(/[^0-9]/g, '');
    let user_info_formatted_number = '';

    if (user_info_phone.length < 4) {
        user_info_formatted_number = user_info_phone;
    } else if (user_info_phone.length < 7) {
        user_info_formatted_number = user_info_phone.slice(0, 3) + '-' + user_info_phone.slice(3);
    } else if (user_info_phone.length < 11) {
        user_info_formatted_number = user_info_phone.slice(0, 3) + '-' +
            user_info_phone.slice(3, 6) + '-' +
            user_info_phone.slice(6);
    } else {
        user_info_formatted_number = user_info_phone.slice(0, 3) + '-' +
            user_info_phone.slice(3, 7) + '-' +
            user_info_phone.slice(7, 11);
    }

    e.target.value = user_info_formatted_number;

    const user_info_def_number = /^[0][1][0]-\d{3,4}-\d{4}$/;

    if (user_info_def_number.test(e.target.value)) {
        e.target.className = 'successPlaing';
        document.getElementById('phone_error_message').style.display = 'none';
    } else {
        e.target.className = 'errorPla';
        document.getElementById('phone_error_message').style.display = 'block';
    }
});

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
                json_data.remainingDays.forEach((v,i) => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${json_data.remainingDays[i].product}</span><span class="day">${json_data.remainingDays[i].days}</span>`;
                    remainingDaysContainer.appendChild(li);
                });

                // 구매 내역 업데이트
                const purchaseHistoryContainer = document.querySelector('.area_before .box');
                purchaseHistoryContainer.innerHTML = ''; // 기존 내용 초기화
                json_data.purchaseHistory.forEach((v,i) => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${json_data.purchaseHistory[i].product}</span><span class="history">${json_data.purchaseHistory[i].date}</span>`;
                    purchaseHistoryContainer.appendChild(li);
                });
            };

            load_json(); // JSON 데이터 로드 및 UI 업데이트 함수 호출
        }
    };

    ajax_E.open("GET", "../json/M_User_info.json", true); // JSON 파일 경로와 요청 방식 설정
    ajax_E.send(); // 서버에 요청 전송
};
