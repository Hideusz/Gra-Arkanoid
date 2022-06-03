//odwołanie sie do canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//wielkość płótna canvas
canvas.width = 900;
canvas.height = 500;

//zmienne
const fps = 40;
let lastTime = 0;
        //rozmiary palerki
const PlayerWidith = 120;
const PlayerHeight = 20;
        //połozenie paletki
let PlayerX = canvas.width/2-PlayerWidith/2;
const PlayerY = canvas.height-50;
        //piłka
const BallR = 15;
let BallX = canvas.width/2;
let BallY = PlayerY -BallR;
let BallSpeedX = 10;
let BallSpeedY = 10;
        //gameover
let gameover = false;
        //cegiełki
const bricks = [];
const BricksWidth = canvas.width / 10 - 5;
const bricksHeight = 30;
var a = 0; 

//funkcje

        //Tworzenie stołu
function Table()
{
    ctx.fillStyle = "#333";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}
        //tworzenie paletki gracza
function Player()
{
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(PlayerX,PlayerY,PlayerWidith,PlayerHeight);
    canvas.addEventListener('mousemove',PlayerMove);
}
        //ruch gracza
function PlayerMove(e)
{
    PlayerX = e.clientX - PlayerWidith*2;
        //blokada lewej storny
    if(PlayerX < 0)
    {
        PlayerX = 0;
    }
        //blokada prawej strony
    if (PlayerX + PlayerWidith > canvas.width)
    {
        PlayerX = canvas.width - PlayerWidith;
    }
        
}
        //piłka
function Ball()
{
    ctx.fillStyle = "#FF9900";
    ctx.beginPath();
    ctx.arc(BallX,BallY,BallR,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
}
        //ruch piłki
    function BallMove()
    {
        BallX += BallSpeedX;
        BallY -= BallSpeedY;
        //odbicie prawa i lewe
        if(BallX - BallR <= 0 || BallX + BallR >= canvas.width)
        {
            BallSpeedX = -BallSpeedX
        }
        //odbicie góra
        if(BallY - BallR <= 0)
        {
            BallSpeedY = -BallSpeedY;
        }
        //odbicie od gracza
        if(BallY + BallR >= PlayerY  && BallX >= PlayerX && BallX <= PlayerX +PlayerWidith)
        {
            BallSpeedY = -BallSpeedY;
        }
        //koniec gry
        if(BallY > PlayerY + BallR * 2)
        {
           /* gameover = true;
            // alert("Koniec gry!");
            ctx.fillStyle = "red";
            ctx.font = "italic bold 30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Koniec gry",canvas.width/2,canvas.height/2);
            */
            BallSpeedY = -BallSpeedY;
        }
    }
        //tworzymy cegiełki w tablicy
function Bricks()
{
    let bricksX = 5;
    let bricksY = 5;
    for(let i = 0; i < 30; i++)
    {
        bricks.push({
            X: bricksX,         //Współrzędne X
            Y: bricksY,         //Współrzędne Y
            W: BricksWidth,     //Szerokość
            H: bricksHeight     //Wysokość
        })
        //pierwszy rząd
        bricksX += BricksWidth + 5;
        //drugi rząd
        if(i == 9)
        {
            bricksX = 5;
            bricksY = bricksHeight + 10;
        }
        //trzeci rząd
        if(i==19)
        {
            bricksX = 5;
            bricksY = bricksHeight*2 + 15;
        }
    }

}

        //rysuje ciegiełki na planszy
function BricksDraw()
{
    ctx.fillStyle = "blue";
    for(const brick of bricks)
    {
        ctx.fillRect(brick.X,brick.Y,brick.W,brick.H);
    }
}
function BricksDraw2()
{
    ctx.fillStyle = "green";
    for(const brick of bricks)
    {
        ctx.fillRect(brick.X,brick.Y,brick.W,brick.H);
    }
}
    //zderzenie piłki z cegiełką
function BricksVBall()
{
    for(const brick of bricks)
    {
        //odbicie od podstaw cegiełki
        if(BallY - BallR < brick.Y + brick.H && BallX > brick.X && BallX < brick.X+brick.W)
        {
            BallSpeedY = -BallSpeedY;
            brick.W = 0;
            brick.H = 0;
            a++;

        }
        
        //odbicie od ścian cegiełki 
    }
}
function nextLvl(){
    if(a >= 30)
    {
            BricksDraw2();
            if(a == 30)
            {
                PlayerX = canvas.width/2-PlayerWidith/2;
                BallX = canvas.width/2;
                BallY = PlayerY -BallR-15;
                Bricks();
                a++;
            }    
    }
}
        //wywołanie funkcji tworzenia ciegiełek
        Bricks();
function game(time)
{
    if(gameover == false)
    {
        requestAnimationFrame(game)
        if(time - lastTime >= 1000/fps)
        {
            lastTime = time;
            //wywołanie funkcji tworzących animacje
            Table();
            Player();
            Ball();
            BallMove();
            BricksDraw();
            BricksVBall();
            nextLvl()
        }
    }
}
game();