const input_exception = () => {
    // const def_char = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
    // const def_number = /^\d{0,11}$/;

    //input name 숫자, 특수문자 예외처리
    document.getElementById('input_signup_name').addEventListener('input', (e) => {
        const input_signup_name = e.target.value;
        const def_char = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
        const correct_char = /^[가-힣a-zA-Z]+$/;

        if (correct_char.test(input_signup_name)) {
            e.target.className = 'successPlaing'
            document.getElementById('signup_name_error_text').style.display = 'none';
        } else {
            if (def_char.test(input_signup_name)) {
                e.target.className = 'successPla'
                document.getElementById('signup_name_error_text').style.display = 'none';
            }
            else {
                e.target.className = 'errorPla'
                document.getElementById('signup_name_error_text').style.display = 'block';
                e.target.value = e.target.value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, '');
            }
        };
    })

    //input phone 문자, 특수문자 예외처리
    // document.getElementById('input_signup_phone').addEventListener('input', (e) => {
    //     const input_signup_phone_number = e.target.value;

    //     if (input_signup_phone_number.length < 4) {
    //         console.log(input_signup_phone_number);
    //     } else if (input_signup_phone_number.length < 7) {
    //         input_signup_phone_number.slice(0, 3) + '-' + input_signup_phone_number.slice(3);
    //         console.log(input_signup_phone_number);
    //     } else if (input_signup_phone_number.length < 11) {
    //         // phone.value = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6);
    //     } else {
    //         // phone.value = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 7) + '-' + phoneNumber.slice(7, 11);
    //     }

    //     if (def_number.test(input_signup_phone_number)) {
    //         e.target.className = 'successPlaing'
    //         document.getElementById('signup_phone_error_text').style.display = 'none';
    //     } else {
    //         e.target.className = 'errorPla'
    //         document.getElementById('signup_phone_error_text').style.display = 'block';
    //         e.target.value = e.target.value.replace(/[^-0-9]/g, '');
    //     };
    // })

    document.getElementById('input_signup_phone').addEventListener('input', (e) => {
        const input_signup_phone_number = e.target.value.replace(/[^0-9]/g, '');
        let formatted_number = '';

        if (input_signup_phone_number.length < 4) {
            formatted_number = input_signup_phone_number;
        } else if (input_signup_phone_number.length < 7) {
            formatted_number = input_signup_phone_number.slice(0, 3) + '-' + input_signup_phone_number.slice(3);
        } else if (input_signup_phone_number.length < 11) {
            formatted_number = input_signup_phone_number.slice(0, 3) + '-' +
                input_signup_phone_number.slice(3, 6) + '-' +
                input_signup_phone_number.slice(6);
        } else {
            formatted_number = input_signup_phone_number.slice(0, 3) + '-' +
                input_signup_phone_number.slice(3, 7) + '-' +
                input_signup_phone_number.slice(7, 11);
        }

        e.target.value = formatted_number; // 형식이 적용된 번호를 입력란에 설정

        const def_number = /^[0][1][0]-\d{3,4}-\d{4}$/; // 수정: 한국 전화번호 형식

        if (def_number.test(e.target.value)) {
            e.target.className = 'successPlaing';
            document.getElementById('signup_phone_error_text').style.display = 'none';
        } else {
            e.target.className = 'errorPla';
            document.getElementById('signup_phone_error_text').style.display = 'block';
        }
    });

}

input_exception();


document.getElementById('sign_up_btn').addEventListener('click', (e) => {
    e.preventDefault();
    const isChecked = document.getElementById('checkbox_agree').checked;
    const state_input_name = document.getElementById('input_signup_name').className;
    const state_input_phone = document.getElementById('input_signup_phone').className;
    // const state_check_box = document.getElementById('checkbox_agree')

    if (isChecked && state_input_name === 'successPlaing' && state_input_phone === 'successPlaing') {
        window.location.href = 'P_Pay_OrderDetail.html';
    } else {
        document.getElementById('sign_up_error').style.display = 'block';
    }
})

document.getElementById('sign_up_error_btn').addEventListener('click', (e) => {
    document.getElementById('sign_up_error').style.display = 'none';
})