var express= require('express');
var app= express();


app.locals.pretty = true;

app.set('views','./views'); //이 디렉토리에
app.set('view engine', 'jade'); //jade라는 템플릿엔진과 우리가 만드는 앱 프레임워크인 익스프레스를 연결

app.use(express.static('public')); //정적인 디렉토리를 지정할 범위


app.get('/topic',function(req,res){//express가 함수를 호출함
    res.send(req.query.id); //req객체가 갖는 쿼리라는 객체의 id변수를 통해 사용자가 퀴리 스트링으로 접속한 정보전달
})
// app.get('/topic',function(req,res){//web page를 프로그래밍적으로 코딩
//     var topics=[
//         'Javascript is...',
//         'Nodejs is...',
//         'Express is...'
//     ];
//     var str= `
//     <a href="/topic?id=0">JavaScript</a><br>
//     <a href="/topic?id=1">Nodejs</a><br>
//     <a href="/topic?id=0">Express</a><br></br>
//     `;
//     var output=str+topics[req.query.id]
//     res.send(output);
// })





app.get('/template',function(req,res){
    res.render('temp',{time:Date(),_title:'Jade'}); //template이라는 경로로 들어온 유저에게 함수가 실행되면서 temp라는 템플릿 파일을 웹페이지로 렌더링해서 전송

})

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