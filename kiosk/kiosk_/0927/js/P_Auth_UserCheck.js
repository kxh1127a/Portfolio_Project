addNumber = (number) => {
    const phoneNumber = document.getElementById("phoneNumber");

    if(phoneNumber.value.length < 11){
        phoneNumber.value += number;
    } else {
        phoneNumber.value = phoneNumber.value;
    }
}

clearNumber = () => {
    document.getElementById("phoneNumber").value = '';
}

removeLast = () => {
    const phoneNumber = document.getElementById("phoneNumber");
    phoneNumber.value = phoneNumber.value.slice(0, -1);
}

clearInput = () => {
    clearNumber();
}

submitPhone = () => {
    document.querySelector(".modal_back").style.display = "block"
}

