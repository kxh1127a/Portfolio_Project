// **json
window.onload = function () {   //페이지가 load 되었을 때, 실행 함수
    const DaySales = new XMLHttpRequest();    //웹 객체 생성(new XMLHttpRequest())
    const MonthSales = new XMLHttpRequest();
    const UserInfo = new XMLHttpRequest();

    // 일매출
    DaySales.onreadystatechange = function () {    //객체**method(onreadystatechange) 서버에서 응답이 도착하면 해당 함수 호출
        if (this.readyState == 4 && this.status == 200) {   //error check
            const load_json = () => {
                const json_display_area = document.getElementById('DaySalesTable');
                const json_data = JSON.parse(this.responseText);    //JSON.parse JSON=>OBJECT 자료(형태)변환 (responeseText = 읽어온 값, 요청자료)
                json_data.forEach((data, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div class="product_name">${data.prodName}</div>
                        <div class="product_count">${data.salesCount}</div>
                        <div class="product_price">${data.salesAmount}<span>원</span></div>
                    `;
                    json_display_area.appendChild(li);
                });
            }
            load_json();
        }
    }

    // 월매출
    MonthSales.onreadystatechange = function () {    //객체**method(onreadystatechange) 서버에서 응답이 도착하면 해당 함수 호출
        if (this.readyState == 4 && this.status == 200) {   //error check
            const load_json = () => {
                const json_display_area = document.getElementById('MonthSalesTable');
                const json_data = JSON.parse(this.responseText);    //JSON.parse JSON=>OBJECT 자료(형태)변환 (responeseText = 읽어온 값, 요청자료)
                json_data.forEach((data, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <div class="product_name">${data.prodName}</div>
                        <div class="product_count">${data.salesCount}</div>
                        <div class="product_price">${data.salesAmount}<span>원</span></div>
                    `;
                    json_display_area.appendChild(li);
                });
            }
            load_json();
        }
    }

    // 회원정보
    UserInfo.onreadystatechange = function () {    //객체**method(onreadystatechange) 서버에서 응답이 도착하면 해당 함수 호출
        if (this.readyState == 4 && this.status == 200) {   //error check
            const load_json = () => {
                const json_display_area = document.getElementById('searchedUserList');
                const json_data = JSON.parse(this.responseText);    //JSON.parse JSON=>OBJECT 자료(형태)변환 (responeseText = 읽어온 값, 요청자료)
                json_data.forEach((data, index) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${data.name}</td>
                        <td>${data.sex}</td>
                        <td>${data.phone}</td>
                        <td><i class="xi-search"></i></td>
                    `;
                    json_display_area.appendChild(tr);
                });

                // 검색 기능
                function search(){
                    const searchInput = document.getElementById('searchInput');
                    const searchedUserList = document.getElementById('searchedUserList');
                    const searchBtn = document.getElementById('searchBtn');
                    let searchedDataList = [];

                    function searchClick(){
                        const searchValue = searchInput.value;
                        if (searchValue !== '') {
                            function isEven(value) {
                                // 이름 또는 전번 일치
                                return value.name.includes(searchValue) || value.phone.includes(searchValue);
                            }
                            // 위에서 거른거 출력
                            searchedDataList = json_data.filter(isEven);
                            // console.log(searchedDataList)

                            searchedUserList.innerHTML = searchedDataList
                                .map((data) => {
                                    return `
                                        <tr>
                                            <td>${data.name}</td>
                                            <td>${data.sex}</td>
                                            <td>${data.phone}</td>
                                            <td><i class="xi-search"></i></td>
                                        </tr>`;
                                })
                                .join('');
                            } else {

                            // 검색어가 없을 시 리스트 초기화 및 숨김 처리
                            searchedUserList.style.display = 'none';
                            searchedDataList = [];
                        }
                    }

                    // 엔터치면
                    searchInput.addEventListener(
                        'keyup',
                        (event)=>{
                            if (event.key === 'Enter') {
                                searchClick();
                            }
                        }
                    )

                    // 돋보기 버튼 클릭하면
                    searchBtn.addEventListener(
                        'click',
                        (event)=>{
                            searchClick();
                        }
                    )
                }
                search();
            }
            load_json();
            
        }
    }

    DaySales.open("GET", "../json/P_Admin_Main_DaySale.json", true);     //객체**method(open) 요청형식 정의
    DaySales.send();    //객체**method(send) 서버에 자료를 요청

    MonthSales.open("GET", "../json/P_Admin_Main_MonthSale.json", true);
    MonthSales.send();

    UserInfo.open("GET", "../json/P_Admin_Main_UserInfo.json", true);
    UserInfo.send();
}

const priceBtn = document.querySelector(".priceAll_Btn");
const memberBtn = document.querySelector(".member_Btn");
const dayPrice = document.querySelector(".days_price");
const monthPrice = document.querySelector(".month_price");
const dataBox = document.querySelector(".day_data");
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
    document.querySelector('.month_data').style.display = 'none';
    document.querySelector('.day_data').style.display = 'none';
});

priceBtn.addEventListener('click', (e) => {
    memberBtn.classList.remove('btn_black');
    priceBtn.classList.add('btn_black');
    monthPrice.classList.remove('btn_black');
    dayPrice.classList.add('btn_black');

    document.querySelector('.month_data').style.display = 'none';
    document.querySelector('.day_data').style.display = 'flex';
    monthBox.style.display = 'flex';
    customerBox.style.display = 'none';
});

dayPrice.addEventListener('click', (e) => {
    monthPrice.classList.remove('btn_black');
    dayPrice.classList.add('btn_black');
    document.querySelector('.month_data').style.display = 'none';
    document.querySelector('.day_data').style.display = 'flex';
});

monthPrice.addEventListener('click', (e) => {
    dayPrice.classList.remove('btn_black');
    monthPrice.classList.add('btn_black');
    document.querySelector('.month_data').style.display = 'flex';
    document.querySelector('.day_data').style.display = 'none';
});