class Deque {
    constructor(id) {
        this.id = id;
        this.storage = [];
        this.length = 0;
    }
    shiftItem() {
        return this.storage.shift();
    }
    unshiftItem(item) {
        this.storage.unshift(item);
    }
    popItem() {
        return this.storage.pop();
    }
    pushItem(item) {
        this.storage.push(item);
    }
    countDeque() {
        this.length = this.storage.length;
        return this.length;
    }
}

class Hanoi {
    constructor(id) {
        this.id = id;
        this.firstArr = new Deque('firstArr');
        this.secondArr = new Deque('secondArr');
        this.thirdArr = new Deque('thirdArr');
        this.procedureArr = [];
        this.totalDisc = 0;
        this.movingEvent = null;
    }
    //input값 제한
    settingInput() {
        document.getElementById('discNum').addEventListener('input', (e) => {
            if (e.target.value < 1) {
                e.target.value = 1
            } else if (e.target.value > 9) {
                e.target.value = 9
            }
        })
    }
    //input값 첫번째배열에 넣고 첫번째박스에 세팅
    settingDisc() {
        document.getElementById('startBtn').addEventListener('click', (e) => {

            this.totalDisc = Number(document.getElementById('discNum').value);
            console.log(this.totalDisc);
            document.getElementById('firstBox').innerHTML = ''; //화면 초기화
            document.getElementById('secondBox').innerHTML = '';
            document.getElementById('thirdBox').innerHTML = '';
            this.firstArr.storage = []; //배열 초기화
            this.secondArr.storage = [];
            this.thirdArr.storage = [];
            this.procedureArr = []; //순서 초기화
            document.getElementById('countNum').innerHTML = 0;  //카운트 초기화
            for (let i = 1; i <= this.totalDisc; i++) {
                this.firstArr.pushItem(i)
            }
            console.log(this.firstArr);
            // console.log(this.firstArr.length);
            this.visualizeDisc();
            this.algorithm();
            clearTimeout(this.movingEvent);
            this.moveDisc();

            // // 화면 스크롤을 최상단으로 이동
            // window.scrollTo({ top: 0, behavior: 'smooth' })
            // 화면의 중앙으로 body 스크롤 이동
            const bodyMiddle = (document.body.offsetHeight / 2) - (window.innerHeight / 2);
            window.scrollTo({ top: bodyMiddle, behavior: 'smooth' });
        })
    }
    //disc 시각화
    visualizeDisc() {
        // console.log(this.firstArr.length);
        // console.log(this.firstArr.countDeque());
        // console.log(this.firstArr.length);
        this.firstArr.countDeque();
        this.secondArr.countDeque();
        this.thirdArr.countDeque();
        document.getElementById('firstBox').innerHTML = ''; //화면 초기화
        document.getElementById('secondBox').innerHTML = '';
        document.getElementById('thirdBox').innerHTML = '';

        for (let i = 0; i < this.firstArr.length; i++) {
            document.getElementById('firstBox').innerHTML += `<div class=disc${this.firstArr.storage[i]}>${this.firstArr.storage[i]}</div>`;
        }
        for (let i = 0; i < this.secondArr.length; i++) {
            document.getElementById('secondBox').innerHTML += `<div class=disc${this.secondArr.storage[i]}>${this.secondArr.storage[i]}</div>`;
        }
        for (let i = 0; i < this.thirdArr.length; i++) {
            document.getElementById('thirdBox').innerHTML += `<div class=disc${this.thirdArr.storage[i]}>${this.thirdArr.storage[i]}</div>`;
        }
    }
    algorithm() {
        const getProcedure = (Num, from, to, via) => {
            if (Num === 1) {
                (this.procedureArr).push([Num, from, to]);
            } else {
                getProcedure(Num - 1, from, via, to);
                (this.procedureArr).push([Num, from, to]);
                getProcedure(Num - 1, via, to, from);
            }
        }
        console.log(this.totalDisc)
        getProcedure(this.totalDisc, this.firstArr, this.thirdArr, this.secondArr);
        console.log(this.procedureArr)
    }
    moveDisc() {
        this.movingEvent = (
            setTimeout(
                () => {
                    //     (7)[Array(3), Array(3), Array(3), Array(3), Array(3), Array(3), Array(3)]
                    //      Deque { id: 'firstArr', storage: Array(3), length: 3 }
                    const countNumElement = document.getElementById('countNum');
                    const countNum = Number(countNumElement.innerHTML);
                    // const countNum = Number(document.getElementById('countNum').innerHTML);
                    console.log(countNum);
                    console.log(this.procedureArr[countNum]);
                    //[1, Deque, Deque]

                    this.procedureArr[countNum][2].storage.unshift((this.procedureArr[countNum][1].storage.shift()));
                    document.getElementById('countNum').innerHTML = countNum + 1;


                    // Add animation class
                    countNumElement.classList.add('animated');
                    // Remove animation class after animation ends
                    setTimeout(() => {
                        countNumElement.classList.remove('animated');
                    }, 350); // Match the duration of the animation


                    this.visualizeDisc();
                    if (countNum < this.procedureArr.length) {
                        this.moveDisc();
                    }
                },
                500
            )
        )
    }
    resetEvent() {
        document.getElementById('resetBtn').addEventListener('click', () => {
            document.getElementById('firstBox').innerHTML = ''; //화면 초기화
            document.getElementById('secondBox').innerHTML = '';
            document.getElementById('thirdBox').innerHTML = '';
            this.firstArr.storage = []; //배열 초기화
            this.secondArr.storage = [];
            this.thirdArr.storage = [];
            this.procedureArr = []; //순서 초기화
            document.getElementById('countNum').innerHTML = 0;  //카운트 초기화
            document.getElementById('discNum').value = ''; //인풋 초기화
            document.getElementById('procedureSteps').innerHTML = '';
        })
    }
    modalEvent() {
        const modal = document.getElementById('modal');
        const navBtn = document.getElementById('navBtn');
        const closeBtn = document.getElementById('closeBtn');
        const procedureSteps = document.getElementById('procedureSteps');
        const naming = { firstArr: 'START', secondArr: 'CENTER', thirdArr: 'END' };

        navBtn.addEventListener('click', (e) => {
            modal.style.display = 'flex';
            console.log(this.procedureArr);
            //[Array(3), Array(3), Array(3)]
            console.log(this.procedureArr[0]);
            //[1, Deque, Deque]
            //Deque {id: 'firstArr', storage: Array(0), length: 0}

            document.querySelector('.modalContent').scrollTop = 0;

            let inputString = '';
            if (this.procedureArr[0] === undefined) {
                inputString = '<span>❗ 로직을 먼저 실행해주세요.</span>'
                procedureSteps.innerHTML = inputString;
            } else {
                inputString += '<ul>';
                for (let i = 0; i < this.procedureArr.length; i++) {
                    let discName = this.procedureArr[i][0];
                    let discFrom = naming[this.procedureArr[i][1].id];
                    let discTo = naming[this.procedureArr[i][2].id];
                    // console.log(discName, discFrom, discTo)
                    if (i % 5 == 0) {
                        inputString += `</li><li class="devideList"><span class="colored badge ">${i + 1}</span> Move <span>${discName}</span> from <span>${discFrom}</span> to <span>${discTo}</span><br>`
                    } else {
                        inputString += `<li><span class="colored badge">${i + 1}</span> Move <span>${discName}</span> from <span>${discFrom}</span> to <span>${discTo}</span> <br>`
                    }
                }
                inputString += '</ul>';
                procedureSteps.innerHTML = inputString;
            }
        })
        closeBtn.addEventListener('click', (e) => {
            modal.style.display = 'none';
        })
        window.addEventListener('click', (e) => {
            if (e.target.id == 'modal') {
                modal.style.display = 'none';
            }
        })
    }
    running() {
        this.settingInput();
        this.settingDisc();
        // this.visualizeDisc();
        // this.algorithm();
        // this.moveDisc();
        this.resetEvent();
        this.modalEvent();
    }
}

window.onload = () => {
    const hanoi = new Hanoi('hanoi');
    hanoi.running();
};