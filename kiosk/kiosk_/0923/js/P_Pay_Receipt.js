        //영수증 날짜 표기
        function get_date_info() {
            const currentDate = new Date();
            document.getElementById('current_year').innerHTML = currentDate.getFullYear();
            document.getElementById('current_month').innerHTML = currentDate.getMonth() + 1;
            document.getElementById('current_day').innerHTML = currentDate.getDate();
        }
        get_date_info();

        //영수증 프린트
        function print_receipt(area) {
            let prt_content = document.getElementById(area);
            let contents = prt_content.innerHTML;
            let init_body = document.body.innerHTML;

            window.onbeforeprint = () => {
                document.body.innerHTML = contents;
            };

            window.onafterprint = () => {
                document.body.innerHTML = init_body;
                window.location.href = 'P_Main_Intro.html';
            };

            window.print();
        }

        document.getElementById('receipt_print_btn').addEventListener('click', () => {
            print_receipt('receipt_wrap_middle');
        });



        // **json test (서버 없이)
        // const temp_json_data = [
        //     { "desc": "pro-1", "option": "opt-1", "qty": 11, "price": "100,000" },
        //     { "desc": "pro-2", "option": "opt-2", "qty": 22, "price": "200,000" },
        //     { "desc": "pro-3", "option": "opt-3", "qty": 33, "price": "300,000" },
        //     { "desc": "pro-4", "option": "opt-4", "qty": 44, "price": "400,000" },
        //     { "desc": "pro-5", "option": "opt-5", "qty": 55, "price": "500,000" },
        //     { "desc": "pro-6", "option": "opt-6", "qty": 66, "price": "600,000" },
        //     { "desc": "pro-7", "option": "opt-7", "qty": 77, "price": "700,000" },
        //     { "desc": "pro-8", "option": "opt-8", "qty": 88, "price": "800,000" },
        //     { "desc": "pro-9", "option": "opt-9", "qty": 99, "price": "900,000" },
        //     { "desc": "pro-10", "option": "opt-10", "qty": 101, "price": "1,000,000" }
        // ];

        // function load_json() {
        //     const json_display_area = document.querySelector('.receipt_product_list');

        //     temp_json_data.forEach((product, index) => {
        //         const label = document.createElement('label');
        //         label.className = `receipt_product_${index + 1}`;
        //         label.innerHTML = `
        //             <div>${product.desc}</div>
        //             <div>${product.option}</div>
        //             <div>${product.qty}</div>
        //             <div>${product.price}</div>
        //         `;
        //         json_display_area.appendChild(label);
        //     });
        // }

        // load_json();




        // **json test (서버 업로드, 별도 json 파일)
        window.onload = function () {   //페이지가 load 되었을 때, 실행 함수
            const ajax_E = new XMLHttpRequest();    //웹 객체 생성(new XMLHttpRequest())

            ajax_E.onreadystatechange = function () {    //객체**method(onreadystatechange) 서버에서 응답이 도착하면 해당 함수 호출
                if (this.readyState == 4 && this.status == 200) {   //error check
                    const load_json = () => {
                        let json_display_area = document.querySelector('.receipt_product_list');
                        const json_data = JSON.parse(this.responseText);    //JSON.parse JSON=>OBJECT 자료(형태)변환 (responeseText = 읽어온 값, 요청자료)
                        json_data.forEach((product, index) => {
                            const label = document.createElement('label');
                            label.className = `receipt_product_${index + 1}`;
                            label.innerHTML = `
                    					<div>${product.desc}</div>
                    					<div>${product.option}</div>
                    					<div>${product.qty}</div>
                    					<div>${product.price}</div>
                				        `;
                            json_display_area.appendChild(label);
                        });
                    }
                    load_json();
                }
            }
            ajax_E.open("GET", "../json/receipt_product.json", true);     //객체**method(open) 요청형식 정의
            ajax_E.send();    //객체**method(send) 서버에 자료를 요청
        }