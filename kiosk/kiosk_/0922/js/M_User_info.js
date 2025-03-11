document.addEventListener("DOMContentLoaded", function(){
    const main_display = document.getElementById("main_display");
    const popup_display = document.getElementById("popup_display");
    const close_popup = document.getElementById("close_popup");
    const popup_user_info = document.getElementById("popup_user_info");
    const user_info_section = document.getElementById("user_info_section");
    const popup_flex_info = document.getElementById("popup_flex_info");
    const user_info_name = document.getElementById("user_info_name");
    const input_name_correction = document.getElementById("input_name_correction");
    const user_info_sex = document.getElementById("user_info_sex");
    const user_sex_radio_wrap = document.getElementById("user_sex_radio_wrap");
    const user_radio_male = document.getElementById("user_radio_male");
    const radio_male_input = document.getElementById("radio_male_input");
    const radio_male_input_label = document.getElementById("radio_male_input_label");
    const user_radio_female = document.getElementById("user_radio_female");
    const radio_female_input = document.getElementById("radio_female_input");
    const radio_female_input_label = document.getElementById("radio_female_input_label");
    const user_tel_input_label = document.getElementById("user_tel_input_label");
    const user_tel_input = document.getElementById("user_tel_input");
    const user_purchase_history = document.getElementById("user_purchase_history");
    const user_pay_remainingday = document.getElementById("user_pay_remainingday");
    const user_remainingday = document.getElementById("remainingday");
    const remaining_ticket = document.getElementById("remaining_ticket");
    const remaining_ticket_period = document.getElementById("remaining_ticket_period");
    const remaining_saunaticket = document.getElementById("remaining_saunaticket");
    const remaining_saunaticket_period = document.getElementById("remaining_saunaticket_period");
    const user_pay_previous = document.getElementById("user_pay_previous");
    const user_pay_previous_history = document.getElementById("user_pay_previous_history");
    const previous_pay_ticket = document.getElementById("previous_pay_ticket");
    const previous_ticket_period = document.getElementById("previous_ticket_period");
    const pervious_ticket_period_year = document.getElementById("pervious_ticket_period_year");
    const pervious_ticket_period_month = document.getElementById("pervious_ticket_period_month");
    const pervious_ticket_period_day = document.getElementById("pervious_ticket_period_day");
    const previous_pay_saunaticket = document.getElementById("previous_pay_saunaticket");
    const previous_saunaticket_period = document.getElementById("previous_saunaticket_period");
    const previous_saunaticket_period_year = document.getElementById("previous_saunaticket_period_year");
    const previous_saunaticket_period_month = document.getElementById("previous_saunaticket_period_month");
    const previous_saunaticket_period_day = document.getElementById("previous_saunaticket_period_day");
    const name_error_message = document.getElementById("name_error_message");
    const phone_error_message = document.getElementById("error_message");

    document.getElementById("input_name_correction").addEventListener("input", function() {
        const nameInput = document.getElementById("input_name_correction").value;
        const nameErrorMessage = document.getElementById("name_error_message");

        // 정규식: 공백 미포함, 한글, 영문, 2~10자 제한
        const nameRegExp = /^[a-zA-Z가-힣]{2,10}$/;

        if (!nameRegExp.test(nameInput)) {
            nameErrorMessage.textContent = "이름은 2~10자의 한글 또는 영문이어야 하며 공백을 포함할 수 없습니다.";
        } else {
            nameErrorMessage.textContent = ""; // 에러 메시지 제거
        }
    });


    document.getElementById("user_tel_input").addEventListener("keyup", function(event) {
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

    document.getElementById("user_sex_radio_wrap").addEventListener("change", function() {
        const selectedGender = document.querySelector('input[name="userSex"]:checked').value;
        validateGender(selectedGender);
    });

    function validateGender(gender) {
        const genderErrorMessage = document.getElementById("gender_error_message");
        
        if (gender === "male" || gender === "female") {
            genderErrorMessage.textContent = "";  // 에러 메시지 제거
            console.log("성별이 입력되었습니다:", gender === "male" ? "남자" : "여자");
        } else {
            genderErrorMessage.textContent = "성별을 선택하세요.";
        }
    }
});