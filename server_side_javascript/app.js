var express= require('express');
var app= express();

app.use(express.static('public')); //정적인 디렉토리를 지정할 범위

app.get('/',function(req,res){//user가 홈으로 접속하면 두번째 인자의 함수 실행
   res.send('hello home page');
});

app.get('/login',function(req,res){//get은 router (라우팅)
    res.send('<h1>login please</h1>');
})

app.get('/dynamic',function(req,res){
    var lis=' ';
    for(var i=0;i<5; i++)
    {
        lis =lis + '<li>coding</li>';
    }
    var time=Date();
    var output=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello,Dynamic!
        <ul>
            ${lis} 
            ${time}
        </ul>
       
    </body>
    </html>`;//$는문자열 안에 변수를 선언
    res.send(output);//정적인 파일을 작성시 node.js를 재실행할 필요없음
})

app.listen(3000,function(){
    console.log('connected 3000 port!')
});

app.get('/route',function(req,res){//user가 홈으로 접속하면 두번째 인자의 함수 실행
    res.send('hello router');
 });