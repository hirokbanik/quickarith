// Select Elements
let o1 = select('#o1');
let o = select('#o');
let o2 = select('#o2');
let ans = select('#ans');
let btn = select('#btn');
let lyf = select('#life');
let lvl = select('#level');
let scr = select('#score');
let tmr = select('#timer');
let wrp = select('#wrapper');
let btxnum = select('#btx-num');
let btnSub = select('#btnSub');
let btnback = select('#btnback');
const timerConst = 10;

let life = 3;
let score = 0;
let level = 1;
let timer = timerConst;
let count;
let oArr = ['+', '-', '*', '/'];

btn.addEventListener('click', start);


// Functions
function start() {
    btn.removeEventListener('click', start);
    btnSub.addEventListener('click', submit);
    btnBack.addEventListener('click', backspace);
    btxnum.addEventListener('click', enterNumber);
    wrp.style.transform = 'translateX(-100%)';
    ans.addEventListener('keyup', enter);
    ans.style.width = '70%';

    btn.innerText = 'SUBMIT';
    load();
}

function load() {
    scr.innerHTML = `Score<br>${score}`;
    lyf.innerHTML = `Life<br>${life}`;
    lvl.innerHTML = `Level<br>${level}`;

    if (life == 0) {
        over();
        return;
    }
    if (score == 40) {
        over();
        lvl.innerHTML = `Level<br>${level}`;
        return;
    }

    timer = timerConst;
    o.innerText = oArr[Math.floor(Math.random() * level)];

    let nums = generateNumber();

    o1.innerText = nums[0];
    o2.innerText = nums[1];
    ans.value = '';
    ans.disabled = false;
    // ans.focus();
    clearInterval(count);
    countDown();
}

function unload() {
    tmr.innerText = `SCORE`
    o1.innerText = '';
    o.innerText = score;
    o2.innerText = '';
    ans.style.width = '90%';
    ans.disabled = true;
    ans.value = level == 5 ? 'Congrats' : 'Game Over';

    life = 3;
    score = 0;
    level = 1;
    timer = timerConst;
}

function countDown() {
    tmr.innerText = timer;
    count = setInterval(() => {
        timer--;
        // document.documentElement.style.setProperty('--primary-color', `var(--c${timer})`);
        tmr.innerText = timer;
        if (timer == 0) {
            clearInterval(count);
            submit();
        }
    }, 1000);
}

function over() {
    clearInterval(count);
    btn.innerText = 'PLAY AGAIN'
    btnSub.removeEventListener('click', submit);
    btnBack.removeEventListener('click', backspace);
    btxnum.removeEventListener('click', enterNumber);
    btn.addEventListener('click', start);
    wrp.style.transform = 'translateX(0%)';
    ans.removeEventListener('click', enter);
    unload();
}

function generateNumber() {
    let operator = o.innerText;
    if (operator == '+') return plus();
    if (operator == '-') return minus();
    if (operator == '*') return multiply();
    if (operator == '/') return divide();
}

function minus() {
    let a = Math.round(Math.random() * 100);
    let b = Math.round(Math.random() * 100);
    if (a > b) return [a, b];
    else return [b, a];
}

function plus() {
    let a = Math.round(Math.random() * 100);
    let b = Math.round(Math.random() * 100);
    return [a, b];
}

function multiply() {
    let a = Math.round(Math.random() * 20);
    let b = Math.round(Math.random() * 10);
    return [a, b];
}

function divide() {
    let b = Math.ceil(Math.random() * 20);
    console.log(b);
    let a = Math.floor(Math.random() * 10);
    console.log(a);
    a = a * b;
    console.log(a);
    return [a, b];
}

function levelplus() {
    if (score % 10 === 0) level = (score / 10) + 1;
}

function enter(e) {
    if (e.keyCode == 13) submit();
}

function enterNumber(e) {
    if (e.target.id != 'btnSub' || e.target.id != 'btnback')
        ans.value += e.target.innerText;
    // console.log(e.target.id != 'numSub')
    // debugger
}

function submit() {
    let answer = eval(o1.innerText + o.innerText + o2.innerText);
    if (btn.innerText == 'SUBMIT') {
        if (answer == ans.value) {
            showCorrect();
            score++;
            levelplus();
        } else {
            showWrong();
            life--;
        }
    }
    setTimeout(load, 1000);
}

function showCorrect() {
    tmr.innerText = '❤';
    ans.value = '❤';
    clearInterval(count);
}

function showWrong() {
    tmr.innerText = '✖';
    ans.value = '✖';
    clearInterval(count);
}

function backspace(e) {
    ans.value = (ans.value).slice(0, -1);
}

function select(selector) {
    let elArr = document.querySelectorAll(selector);
    if (elArr.length == 1) return elArr[0];
    return elArr;
}