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
let score = 0;
let level = 1;
let timer = 10;
let count;
let oArr = ['+', '-', '*', '/'];
oArr = ['+', '-'];

btn.addEventListener('click', start);


// Functions
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

function start() {
    btn.removeEventListener('click', start);
    btn.addEventListener('click', submit);
    ans.addEventListener('keyup', enter);

    btn.innerText = 'SUBMIT';
    load();
}

function over() {
    clearInterval(count);
    btn.innerText = 'PLAY AGAIN'
    btn.removeEventListener('click', submit);
    btn.addEventListener('click', start);
    ans.removeEventListener('click', enter);
    unload();
}

function enter(e) {
    if (e.keyCode == 13) submit();
}

function submit() {
    let answer = eval(o1.innerText + o.innerText + o2.innerText);
    if (btn.innerText == 'SUBMIT') {
        if (answer == ans.value) {
            score++;
        } else {
            life--;
        }
    }
    console.log(ans.value, answer);
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

    timer = 10;
    o1.innerText = Math.ceil(Math.random() * 100);
    o.innerText = oArr[Math.floor(Math.random() * level)];
    o2.innerText = Math.ceil(Math.random() * 100);
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
    ans.value = 'Game Over';

    life = 3;
    score = 0;
    level = 1;
    timer = 10;
}

function select(selector) {
    let elArr = document.querySelectorAll(selector);
    if (elArr.length == 1) return elArr[0];
    return elArr;
}