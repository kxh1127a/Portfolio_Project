const priceBtn = document.querySelector(".priceAll_Btn");
const memberBtn = document.querySelector(".member_Btn");
const dayPrice = document.querySelector(".days_price");
const monthPrice = document.querySelector(".month_price");
const dataBox = document.querySelector(".data_box");
const customerBox = document.querySelector(".customerBox")
const monthBox = document.querySelector(".month_Btn");
const date_data = document.querySelector(".day_date");

let today = new Date();   

let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let date = ('0' + today.getDate()).slice(-2);

date_data.innerHTML = year + '-' + month + '-' + date;

memberBtn.addEventListener('click', (e) => {
    priceBtn.classList.remove('btn_black');
    memberBtn.classList.add('btn_black');

    dataBox.style.display = 'none';
    monthBox.style.display = 'none';
    customerBox.style.display = 'flex';
});

priceBtn.addEventListener('click', (e) => {
    memberBtn.classList.remove('btn_black');
    priceBtn.classList.add('btn_black');

    dataBox.style.display = 'flex';
    monthBox.style.display = 'flex';
    customerBox.style.display = 'none';
});

dayPrice.addEventListener('click', (e) => {
    monthPrice.classList.remove('btn_black');
    dayPrice.classList.add('btn_black');
});

monthPrice.addEventListener('click', (e) => {
    dayPrice.classList.remove('btn_black');
    monthPrice.classList.add('btn_black');
});