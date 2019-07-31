let ctx = canvas.getContext('2d');  //2d為渲染

let bg = new Image();      //bg為背景
let brick = new Image();   //brick為板子
let ball = new Image();    //ball為球
let wall = new Image();    //wall為磚塊
bg.src = 'bg2.jpg'; 
brick.src = 'brick.png';
ball.src = 'ball.png';
wall.src = 'wall2.png';

let ballobj = {x: 250, y: 200, width: 33, height: 50, dx : 8, dy : 8}
let brickobj = {x: 200, y: 500, width: 62, height: 64}
let wallobj = {x: 200, y: 0, width: 116, height: 116}
let disapear = false;           //判斷球是否碰到磚塊
let random = parseInt(Math.random()*canvas.width);    //隨機產生磚塊的位置

canvas.onmousemove = function(e){
    brickobj.x = e.offsetX - brickobj.width/2;  //板子隨著滑鼠移動     
}

let timer = 3000;       //倒數3秒
let gamelose;
!function timeCounter(){
    document.getElementById("time").innerText = "倒數" + timer/1000 + "秒";
    if(timer <= 0){     //倒數完成
        gamelose = setInterval(moveBall, 25);
    }else{
        console.log((timer/1000) + " sec...");
        setTimeout(timeCounter, 1000);
    }
    timer -= 1000;      //每執行一次減1秒
}();

function refreshView(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(ball, ballobj.x, ballobj.y);    
    ctx.drawImage(brick, brickobj.x, brickobj.y);
    wallobj.x = random;

    if(!disapear){                //如果球沒有碰到磚塊   
        ctx.drawImage(wall, wallobj.x, wallobj.y); 
    }else{                        //如果球有碰到磚塊 
        clearInterval(gamewin);   //不再執行refreshView()
        clearInterval(gamelose);
        alert("You win!");
        if (confirm("是否再玩一次?")) {
            document.location.reload();   //重新加載網頁
        }
    }
}
let gamewin = setInterval(refreshView, 30);   //用setInterval()，不斷循環地執行refreshView函式

function moveBall(){                          //執行球的移動
    if(ballobj.x + ballobj.dx < 0 || ballobj.x + ballobj.width + ballobj.dx > canvas.width){    //球位於左右兩邊的牆壁之間
        ballobj.dx *= -1;
    }
    if(ballobj.y + ballobj.dy < 0 || ballobj.y + ballobj.dy + ballobj.height >= brickobj.y || isTouch2() > 0){   //球位於上下兩邊的牆壁之間
        if(isTouch() > 0 || ballobj.y < 0){
            ballobj.dy *= -1;
        }else{
            ballobj.dy *= 1;
        }       
    }
    if(ballobj.y > canvas.height){    //如果球超出canvas邊界
        clearInterval(gamelose);      //不再執行moveBall()
        alert("GAME OVER");
        document.location.reload();   //reload()方法用於重新加載當前網頁
    }
    ballobj.x += ballobj.dx;   
    ballobj.y += ballobj.dy;   
}

function isTouch(){                   //針對球和板子的collision detected!
    if (ballobj.x < brickobj.x + brickobj.width &&
        ballobj.x + ballobj.width > brickobj.x &&
        ballobj.y < brickobj.y + brickobj.height &&
        ballobj.height + ballobj.y > brickobj.y) {
        return 1;
    }else{
        return 0;
    }
}

function isTouch2(){                   // 針對球和磚塊的collision detected!
    if (ballobj.x < wallobj.x + wallobj.width &&
        ballobj.x + ballobj.width > wallobj.x &&
        ballobj.y < wallobj.y + wallobj.height &&
        ballobj.height + ballobj.y > wallobj.y) {
        disapear = true;              //如果球有碰到磚塊
        return 1;
    }else{
        disapear = false;             //如果球沒有碰到磚塊
        return 0;
    }
}