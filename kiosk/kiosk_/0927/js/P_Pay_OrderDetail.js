/////////////// 버튼 배경 변환 //////////////////
function chgColor(n) {
    const all = document.getElementById('all');
    const three = document.getElementById('three');
    const six = document.getElementById('six');
    const twelve = document.getElementById('twelve');
    switch (n) {
        case 1:
            all.setAttribute("class", "btn_black btn_middle");
            three.setAttribute("class", "btn_white btn_middle");
            six.setAttribute("class", "btn_white btn_middle");
            twelve.setAttribute("class", "btn_white btn_middle");
            break;
        case 2:
            three.setAttribute("class", "btn_black btn_middle");
            all.setAttribute("class", "btn_white btn_middle");
            six.setAttribute("class", "btn_white btn_middle");
            twelve.setAttribute("class", "btn_white btn_middle");
            break;
        case 3:
            six.setAttribute("class", "btn_black btn_middle");
            all.setAttribute("class", "btn_white btn_middle");
            three.setAttribute("class", "btn_white btn_middle");
            twelve.setAttribute("class", "btn_white btn_middle");
            break;
        case 4:
            twelve.setAttribute("class", "btn_black btn_middle");
            all.setAttribute("class", "btn_white btn_middle");
            three.setAttribute("class", "btn_white btn_middle");
            six.setAttribute("class", "btn_white btn_middle");
            break;
    };
};
/////////////////JSON////////////////////////
// const cart_json = [
//     { "desc": "pro-1", "option": "opt-1", "qty": 11, "price": "100000" },
//     { "desc": "pro-2", "option": "opt-2", "qty": 22, "price": "100000" },
//     { "desc": "pro-3", "option": "opt-3", "qty": 33, "price": "200000" },
//     { "desc": "pro-4", "option": "opt-4", "qty": 44, "price": "100000" },
//     { "desc": "pro-5", "option": "opt-5", "qty": 55, "price": "200000" }
// ];
// function load_json() {
//     const orderDetail_json_display = document.getElementById('cart_ul');

//     cart_json.forEach((product) => {
//         const orderDetail_newli = document.createElement('li');
//         orderDetail_newli.innerHTML = `
//             <div class="detailbox_txt">${product.desc}</div>
//             <div class="detailbox_txt">${product.option}</div>
//             <div class="detailbox_txt">${product.qty}</div>
//             <div class="detailbox_txt order_price">${product.price}</div>
//         `;
//         orderDetail_json_display.appendChild(orderDetail_newli);
//     });
// }
// load_json();

/////////할부 버튼 json////////
const installment_json_data = [
    {"month": 0, "desc": "일시불", "idname": "all"},
    {"month": 3, "desc": "3개월", "idname": "three"},
    {"month": 6, "desc": "6개월", "idname": "six"},
    {"month": 12, "desc": "12개월", "idname": "twelve"}
];
function load_json_2() {
    const installment_btns = document.querySelectorAll('.install');

    installment_json_data.forEach((product, index) => {
        installment_btns[index].innerText= product.desc;
        installment_btns[index].id = product.idname;
    });
}
load_json_2();


//서버 JSON
// window.onload = function () {
//     const ajax_E = new XMLHttpRequest();

//     ajax_E.onreadystatechange = function () { 
//         if (this.readyState == 4 && this.status == 200) {
//             function load_json() {
//                 const orderDetail_json_display = document.getElementById('cart_ul');
            
//                 cart_json.forEach((product) => {
//                     const orderDetail_newli = document.createElement('li');
//                     orderDetail_newli.innerHTML = `
//                         <div class="detailbox_txt">${product.desc}</div>
//                         <div class="detailbox_txt">${product.option}</div>
//                         <div class="detailbox_txt">${product.qty}</div>
//                         <div class="detailbox_txt order_price">${product.price}</div>
//                     `;
//                     orderDetail_json_display.appendChild(orderDetail_newli);
//                 });
//             }
//             load_json();
//         }
//     }
//     ajax_E.open("GET", "../json/receipt_product.json", true); 
//     ajax_E.send();
// }
//////////////////가격 (localeString, 뒤에 "원" 붙이기, 합계 출력)//////////////////////
// const cartIn_price = document.querySelectorAll('.order_price');

// let total = 0;
// cartIn_price.forEach((price) => {
//     const product_prices_float = parseFloat(price.textContent);
//     total += product_prices_float;
//     price.textContent = product_prices_float.toLocaleString('ko-KR') + "원";
// });
// const locale_total = total.toLocaleString('ko-KR');
// document.getElementById('orderDetail_total_price').innerText = locale_total + " 원";

const params = new URLSearchParams(window.location.search);
const serviceNames = params.getAll('serviceName[]');
const optionNames = params.getAll('optionName[]');
const quantities = params.getAll('quantity[]');
const prices = params.getAll('price[]');
const orderDetail_json_display = document.getElementById('cart_ul');
const orderDetail_total_price = document.getElementById('orderDetail_total_price');

let total = 0;

serviceNames.forEach((serviceName, index) => {
    const orderDetail_newli = document.createElement('li');
    orderDetail_newli.innerHTML = `
        <div class="detailbox_txt">${serviceName}</div>
        <div class="detailbox_txt">${optionNames[index] || ''}</div>
        <div class="detailbox_txt">${quantities[index]}</div>
        <div class="detailbox_txt order_price">${prices[index]}원</div>
    `;
    
    total += Number(`${prices[index]}`);

    orderDetail_total_price.innerHTML = total.toLocaleString() + '원';

    orderDetail_json_display.appendChild(orderDetail_newli);
});