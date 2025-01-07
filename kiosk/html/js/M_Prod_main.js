// **json test (서버 없이)
// const temp_json_data = [
//     {"desc":"헬스 1일권", "img":"../img/1dayImg.png", "price":"10,000원", "option1":"운동복", "option1_price":"5,000원"},
//     {"desc":"헬스 1개월권", "img":"../img/1month.png", "price":"80,000원", "option1":"운동복", "option1_price":"10,000원", "option2":"락커룸", "option2_price":"10,000원"},
//     {"desc":"헬스 3개월권", "img":"../img/3month.png", "price":"200,000원", "option1":"운동복", "option1_price":"20,000원", "option2":"락커룸", "option2_price":"20,000원"},
//     {"desc":"헬스 6개월권", "img":"../img/6month.png", "price":"350,000원", "option1":"운동복", "option1_price":"30,000원", "option2":"락커룸", "option2_price":"30,000원"},
//     {"desc":"헬스 12개월권", "img":"../img/12month.png", "price":"600,000원", "option1":"운동복", "option1_price":"60,000원", "option2":"락커룸", "option2_price":"60,000원"},
//     {"desc":"태닝", "img":"../img/tanning.png", "price":"20,000원", "option1":"1회", "option1_price":"20,000원", "option2":"10회", "option2_price":"180,000원"},
//     {"desc":"크라이오테라피", "img":"../img/cryotherapy.png", "price":"30,000원", "option1":"1회", "option1_price":"30,000원", "option2":"10회", "option2_price":"270,000원"},
//     {"desc":"사우나", "img":"../img/sauna.png", "price":"10,000원", "option1":"1일", "option1_price":"10,000원", "option2":"1개월", "option2_price":"200,000원"},
//     {"desc":"운동복", "img":"../img/sportswear.png", "price":"5,000원", "option1":"1일", "option1_price":"5,000원", "option2":"1개월", "option2_price":"20,000원"},
//     {"desc":"락커룸", "img":"../img/lockerroom.png", "price":"5,000원", "option1":"1일", "option1_price":"5,000원", "option2":"1개월", "option2_price":"20,000원"}
// ];

// function load_json() {
//     const json_display_area = document.querySelector('.area_menu ul');

//     temp_json_data.forEach((product) => {
//         const li = document.createElement('li');
//         li.className = 'product_item';
//         li.innerHTML = `
//             <img class="service_img" src="${product.img}"></img>
//             <div class="service_name">${product.desc}</div>
//             <div class="service_price">${product.price}</div>
//         `;
//         json_display_area.appendChild(li);
//     });
// }

// load_json();


// **json test (서버 업로드, 별도 json 파일)
window.onload = function () {   //페이지가 load 되었을 때, 실행 함수
    const ajax_E = new XMLHttpRequest();    //웹 객체 생성(new XMLHttpRequest())
    const productCart = new ProductCart();
    productCart.run();

    ajax_E.onreadystatechange = function () {    //객체**method(onreadystatechange) 서버에서 응답이 도착하면 해당 함수 호출
        if (this.readyState == 4 && this.status == 200) {   //error check
            const load_json = () => {
                const json_display_area = document.querySelector('.area_menu ul');
                const json_data = JSON.parse(this.responseText);    //JSON.parse JSON=>OBJECT 자료(형태)변환 (responeseText = 읽어온 값, 요청자료)
                json_data.forEach((product, index) => {
                    const li = document.createElement('li');
                    li.id = `item${index}`
                    li.className = 'product_item';
                    li.onclick = () => {
                        // modalArea.style.display = 'block';
                        sub_listArea(product);
                        sub_listBtn(product);
                    }

                    const itemPrice = parseFloat(product.price).toLocaleString();


                    li.innerHTML = `
                        <img class="service_img" src="${product.img}"></img>
                        <div class="service_name">${product.desc}</div>
                        <div class="service_price">${itemPrice}원</div>
                    `;
                    json_display_area.appendChild(li);
                });
            }
            load_json();
        }
    }
    ajax_E.open("GET", "../json/display_product.json", true);     //객체**method(open) 요청형식 정의
    ajax_E.send();    //객체**method(send) 서버에 자료를 요청

    const sub_listArea = (product) => {
        const modalArea = document.getElementById('sub_prod_modal');
        const json_Sub_list = document.querySelector('.service_info');
        json_Sub_list.innerHTML = '';
        
        const list_li = document.createElement('div');
        list_li.className = `sub_item`;

        const itemPrice = parseInt(product.price).toLocaleString();

        list_li.innerHTML = `
            <img class="service_img sub_item" src="${product.img}">
            <div class="service_name sub_item">${product.desc}</div>
            <div class="service_price sub_item">${itemPrice}원</div>
        `;

        json_Sub_list.appendChild(list_li);
        modalArea.style.display = 'block';
    }

    const sub_listBtn = (product) => {
        const modalArea = document.getElementById('sub_prod_modal');
        const json_Sub_Btn = document.querySelector('.area_option');
        json_Sub_Btn.innerHTML = '';
        
        const sub_btn = document.createElement('div');
        sub_btn.className = `optionBtn`;

        const option1Price = parseInt(product.option1_price).toLocaleString();
        const option2Price = parseInt(product.option2_price).toLocaleString();

        if(product.desc.includes("헬스 1일권")){
            sub_btn.innerHTML = `
            <div class="area_btn">
                <button class="btn_middle btn_default" id="option1_Btn">
                    <p class="prod_subname">${product.option1}</p>
                    <p class="prod_subprice">${option1Price}원</p>
                </button>
            </div>
        `;
        } else {
            sub_btn.innerHTML = `
            <div class="area_btn">
                <button class="btn_middle btn_default" id="option1_Btn">
                    <p class="prod_subname">${product.option1}</p>
                    <p class="prod_subprice">${option1Price}원</p>
                </button>
                <button class="btn_middle btn_default" id="option2_Btn">
                    <p class="prod_subname">${product.option2}</p>
                    <p class="prod_subprice">${option2Price}원</p>
                </button>
            </div>
        `;
        }

        json_Sub_Btn.appendChild(sub_btn);

        const option1Btn = document.querySelector("#option1_Btn");
        const option2Btn = document.querySelector("#option2_Btn");

        if (product.desc.includes("태닝") || product.desc.includes("사우나") || product.desc.includes("크라이오테라피") || product.desc.includes("운동복") || product.desc.includes("락커룸")) {
            productCart.option1Selected = true;
            option1Btn.style.backgroundColor = '#0f151f';
            option1Btn.style.color = productCart.option1Selected ? '#ffffff' : '';
            option1Btn.addEventListener('click', (e) => {
                productCart.option1Selected = true;
                productCart.option2Selected = false;
                option1Btn.style.backgroundColor = productCart.option1Selected ? '#0f151f' : '';
                option1Btn.style.color = '#ffffff';
                option2Btn.style.backgroundColor = '';
                option2Btn.style.color = '';
            });
    
            option2Btn.addEventListener('click', (e) => {
                productCart.option1Selected = false;
                productCart.option2Selected = true;
                option2Btn.style.backgroundColor = '#0f151f';
                option2Btn.style.color = '#ffffff';
                option1Btn.style.backgroundColor = '';
                option1Btn.style.color = '';
            });
        } else if (product.desc.includes("헬스 1일권")) {
            option1Btn.addEventListener('click', (e) => {
                productCart.option1Selected = !productCart.option1Selected;
                option1Btn.style.backgroundColor = productCart.option1Selected ? '#0f151f' : '';
                option1Btn.style.color = productCart.option1Selected ? '#ffffff' : '';
            });
        } else {
            option1Btn.addEventListener('click', (e) => {
                productCart.option1Selected = !productCart.option1Selected;
                option1Btn.style.backgroundColor = productCart.option1Selected ? '#0f151f' : '';
                option1Btn.style.color = productCart.option1Selected ? '#ffffff' : '';
            });
    
            option2Btn.addEventListener('click', (e) => {
                productCart.option2Selected = !productCart.option2Selected;
                option2Btn.style.backgroundColor = productCart.option2Selected ? '#0f151f' : '';
                option2Btn.style.color = productCart.option2Selected ? '#ffffff' : '';
            });
        }

        productCart.selectedProduct(product);

        modalArea.style.display = 'block';
    }
}  

class ProductCart {
    constructor(id) {
        this.id = id;
        this.option1Selected = false;
        this.option2Selected = false;
        this.selectedProducts = null;
        this.cartItems = [];
    }

    init() {
        const optionCount = document.querySelector("#option_Number");
        const cartList = document.getElementById('cart_list');
        // cartList.addEventListener('click', (e) => {
        //     if (e.target.classList.contains('btn_cancel')) {
        //         const cartItem = e.target.closest(".cart_item");
        //         if (cartItem) {
        //             cartItem.remove();
        //         }
        //     }
        // });

        cartList.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn_cancel')) {
                const cartItem = e.target.closest(".cart_item");
                if (cartItem) {
                    const serviceName = cartItem.querySelector(".service_name").textContent;
                    const optionName = cartItem.querySelector(".option_name").textContent;

                    const itemIndex = this.cartItems.findIndex(item => 
                        item.serviceName === serviceName && item.optionName === optionName
                    );

                    if (itemIndex !== -1) {
                        this.cartItems.splice(itemIndex, 1);
                    }

                    cartItem.remove();
        
                    console.log('Updated Cart:', this.cartItems); // 배열 상태 확인용
                }
            }
        });

        const userInfoBtn = document.querySelector("#btn_user_info");
        userInfoBtn.addEventListener('click', (e) => {
            const userInfo = document.querySelector("#userInfo");
            userInfo.style.display = 'block';
        });

        const userInfoCloseBtn = document.querySelector("#user_info_close");
        userInfoCloseBtn.addEventListener('click', (e) => {
            const userInfo = document.querySelector("#userInfo");
            userInfo.style.display = 'none';
        });

        const productCartBtn = document.querySelector("#product_cartBtn");
        productCartBtn.addEventListener('click', (e) => {
            let addToCart = (serviceName, optionName, quantity, price) => {
                this.cartItems.push({ serviceName, optionName, quantity, price });
            }
            
            const product = this.selectedProducts;
            const price = parseInt(product.price);
            const quantity = parseInt(optionCount.value, 10);
            const option1Price = parseInt(product.option1_price) * quantity;
            const option2Price = parseInt(product.option2_price) * quantity;
            const totalPrice = parseInt(price) * quantity;

            if(product.desc.includes("헬스 1일권")){
                if (this.option1Selected) {
                    const finalPrice = (totalPrice + option1Price).toLocaleString();
                    const dataPrice = Number(totalPrice + option1Price);
                    
                    this.addCartItem(`${product.desc}`, `${product.option1}`, quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, `${product.option1}`, quantity, dataPrice);
                } else {
                    const finalPrice = (totalPrice).toLocaleString();
                    const dataPrice = Number(totalPrice);

                    this.addCartItem(`${product.desc}`, '', quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, '', quantity, dataPrice);
                }
            } else if(product.desc.includes("헬스 1개월권") || product.desc.includes("헬스 3개월권") || product.desc.includes("헬스 6개월권") || product.desc.includes("헬스 12개월권")) {
                if (this.option2Selected && this.option1Selected){
                    const finalPrice = (totalPrice + option1Price + option2Price).toLocaleString();
                    const dataPrice = Number(totalPrice + option1Price + option2Price);

                    this.addCartItem(`${product.desc}`, `${product.option1},${product.option2}` , quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, `${product.option1},${product.option2}` , quantity, dataPrice);
                } else if(this.option2Selected){
                    const finalPrice = (totalPrice + option2Price).toLocaleString();
                    const dataPrice = Number(totalPrice + option2Price);

                    this.addCartItem(`${product.desc}`, `${product.option2}` , quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, `${product.option2}` , quantity, dataPrice);
                } else if(this.option1Selected){
                    const finalPrice = (totalPrice + option1Price).toLocaleString();
                    const dataPrice = Number(totalPrice + option1Price);

                    this.addCartItem(`${product.desc}`, `${product.option1}` , quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, `${product.option1}` , quantity, dataPrice);
                } else if(!this.option1Selected && !this.option2Selected){
                    const finalPrice = (totalPrice).toLocaleString();
                    const dataPrice = Number(totalPrice);

                    this.addCartItem(`${product.desc}`, '' , quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, '' , quantity, dataPrice);
                }
            } else {
                if(this.option2Selected){
                    const finalPrice = (option2Price).toLocaleString();
                    const dataPrice = Number(option2Price);

                    this.addCartItem(`${product.desc}`, `${product.option2}` , quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, `${product.option2}` , quantity, dataPrice);
                } else if(this.option1Selected){
                    const finalPrice = (totalPrice).toLocaleString();
                    const dataPrice = Number(totalPrice);

                    this.addCartItem(`${product.desc}`, `${product.option1}` , quantity, `${finalPrice}원`);
                    addToCart(`${product.desc}`, `${product.option1}` , quantity, dataPrice);
                }
            }

            modalArea.style.display = 'none';
            optionCount.value = 1;
            this.resetSelections();
            this.resetButtonStyles();
        });

        const modalCloseBtn = document.getElementById('modalClose');
        modalCloseBtn.addEventListener('click', (e) => {
            modalArea.style.display = 'none';
            optionCount.value = 1;
            this.resetSelections();
            this.resetButtonStyles();
        });
    }

    addCartItem(serviceName, optionName, quantity, price) {
        const cartList = document.getElementById('cart_list');
        const newCartItem = document.createElement('li');
        newCartItem.classList.add('cart_item');

        newCartItem.innerHTML = `
            <div class="service_name">${serviceName}</div>
            <div class="option_name">${optionName}</div>
            <div class="service_quantity">${quantity}</div>
            <div class="service_price">${price}</div>
            <div class="area_btn">
                <button class="btn_cancel cartItemClose"></button>
            </div>
        `;

        cartList.appendChild(newCartItem);

        console.log(this.cartItems)

        payOrderBtn.addEventListener('click', (e) => {
            let queryString = '';

            this.cartItems.forEach((item, index) => {
                const itemString = `serviceName[]=${encodeURIComponent(item.serviceName)}&optionName[]=${encodeURIComponent(item.optionName)}&quantity[]=${item.quantity}&price[]=${encodeURIComponent(item.price)}`;
                queryString += itemString;
                if (index < this.cartItems.length - 1) {
                    queryString += '&';
                }
            });
        console.log(queryString);
        window.location.href = `../html/P_Pay_OrderDetail.html?${queryString}`;
        // window.location.href = `../html/P_Pay_Receipt.html?${queryString}`;
        });
    }

    countNumber() {
        const plusBtn = document.querySelector(".plusBtn");
        const minusBtn = document.querySelector(".minusBtn");
        

        plusBtn.addEventListener('click', (e) => {
            const optionCount = document.querySelector("#option_Number");
            if (optionCount.value < 10) {
                optionCount.value++;
            }
        });

        minusBtn.addEventListener('click', (e) => {
            const optionCount = document.querySelector("#option_Number");
            if (optionCount.value > 1) {
                optionCount.value--;
            }
        })
    }

    resetSelections() {
        this.option1Selected = false;
        this.option2Selected = false;
    }

    resetButtonStyles() {
        const option1Btn = document.querySelector("#option1_Btn");
        const option2Btn = document.querySelector("#option2_Btn");

        if (option1Btn) {
            option1Btn.style.backgroundColor = '';
        }
    
        if (option2Btn) {
            option2Btn.style.backgroundColor = '';
        }
    }

    selectedProduct(product) {
        this.selectedProducts = product;
    }

    run() {
        this.countNumber();
        this.init();
    }
}