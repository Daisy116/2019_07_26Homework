//產生三位數，可以零開頭，三個數字都不同
let logtext = '';
let times = 0;     //設為全域變數
let answer;
let guslength = 3;

answer = createAnswer(guslength);
console.log(answer);

function createAnswer(guslength = 3){    //預設猜三位數
    let poker = [];
    for(let i=0; i<10; i++) poker[i] = i;
    for(let i = poker.length-1 ; i>0; i--){
        let rand = parseInt(Math.random()*(i+1));
        [poker[i], poker[rand]] = [poker[rand], poker[i]];
    }

    let ret = '';   //ret是字串，所以ret +=  才能執行!!
    for(let i = 0; i<guslength; i++){
        ret += poker[i];
    }
    return ret;
}

function checkAB(ans, gus){      //判斷猜中幾A幾B
    let a = 0;
    let b = 0;
    for(let i=0 ; i<gus.length ; i++){
        if(gus.charAt(i) == ans.charAt(i)){
            a++;
        }else if(ans.indexOf(gus.charAt(i)) >= 0){  //ans字串中沒有第i碼的gus的話，值是-1
            b++;
        }
    }
    return(`${a}A${b}B`);
}

function checkGuess(){        //判斷有無輸入重複的數字
    let guess = document.getElementById('input').value;

    for(let i=0; i<guess.length; i++){
        let letters = guess.substring(i+1);
        if(letters.indexOf(guess.charAt(i)) >= 0){
            alert(`請勿輸入相同的數字兩次(含)以上!!`);
        }
    }
    // n1 = guess.charAt(0);
    // document.getElementById('log').innerHTML += guess.substring(1);   
}


function doGuess(){
    times ++;
    let guess = document.getElementById('input').value;  //取得使用者輸入的值
    let result = checkAB(answer, guess);
    let gusnum = document.getElementById('input').innerText;

    alert(`${guess} => ${result}`);
    logtext += `${times} : ${guess} => ${result}<br>`;
    document.getElementById('log').innerHTML = logtext;
    gusnum = " ";    

    if(result == `${guslength}A0B`){
        alert(`YOU WIN`);
    }else if(times >= 10){
        alert(`Loser: answer = ${answer}`);
    }
    document.getElementById('input').focus();  //打字的聚焦一直在textbox
}

function replay(){
    answer = createAnswer(guslength);
    logtext = "";
    times = 0;
    document.getElementById('log').innerHTML = logtext;
    document.getElementById('input').value = logtext;
    document.getElementById('input').focus();

    console.log(answer);
}

function changeLength(){
    let op = document.getElementById("guslength");
    logtext = "";
    if(op.value == "3"){
        guslength = 3;
    }else if(op.value == "4"){
        guslength = 4;
    }else if(op.value == "5"){
        guslength = 5;     
    }

    console.log(guslength);
    answer = createAnswer(guslength);
    console.log(answer);

    times = 0;
    document.getElementById('input').value = logtext;
    document.getElementById('log').innerHTML = logtext;
    document.getElementById('input').focus();
}