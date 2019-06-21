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

let life = 3;
let score = 39;
let level = 1;
let timer = 10;
let count;
let oArr = ['+', '-', '*', '/'];

btn.addEventListener('click', start);


// Functions
function start() {
    btn.removeEventListener('click', start);
    btn.addEventListener('click', submit);
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

    timer = 10;
    o.innerText = oArr[Math.floor(Math.random() * level)];

    let nums = generateNumber();

    o1.innerText = nums[0];
    o2.innerText = nums[1];
    ans.value = '';
    ans.disabled = false;
    ans.focus();
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
    timer = 10;
}

function countDown() {
    tmr.innerText = timer;
    count = setInterval(() => {
        timer--;
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
    btn.removeEventListener('click', submit);
    btn.addEventListener('click', start);
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

function submit() {
    let answer = eval(o1.innerText + o.innerText + o2.innerText);
    if (btn.innerText == 'SUBMIT') {
        if (answer == ans.value) {
            score++;
            levelplus();
        } else {
            life--;
        }
    }
    load();
}

function select(selector) {
    let elArr = document.querySelectorAll(selector);
    if (elArr.length == 1) return elArr[0];
    return elArr;
}