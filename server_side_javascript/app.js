var express= require('express');
var app= express();
var bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({extended:false }))//모든 요청은 이 미들웨어를 먼저 통과한뒤에 라우터가 동작함
app.locals.pretty = true;

app.set('views','./views'); //이 디렉토리에
app.set('view engine', 'jade'); //jade라는 템플릿엔진과 우리가 만드는 앱 프레임워크인 익스프레스를 연결

app.use(express.static('public')); //정적인 디렉토리를 지정할 범위


// app.get('/topic',function(req,res){//express가 함수를 호출함
//     res.send(req.query.id); //req객체가 갖는 쿼리라는 객체의 id변수를 통해 사용자가 퀴리 스트링으로 접속한 정보전달
// })
//쿼리스트링
app.get('/topic',function(req,res){//web page를 프로그래밍적으로 코딩
    var topics=[
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];
    var str= `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=0">Express</a><br></br>
    `;
    var output=str+topics[req.query.id]
    res.send(output);
})


//시멘틱 url & edit

app.get('/topic/:topic_id',function(req,res){
    var topics=[
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];
    var output=` <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=0">Express</a><br></br>
   ${topics[req.params.topic_id]}
   `
    res.send(output);
})

app.get('/topic/:id/:mode',function(req,res){
    res.send(req.params.id+','+req.params.mode)
})




//라우터
app.get('/template',function(req,res){
    res.render('temp',{time:Date(),_title:'Jade'}); //template이라는 경로로 들어온 유저에게 함수가 실행되면서 temp라는 템플릿 파일을 웹페이지로 렌더링해서 전송

})

app.get('/',function(req,res){//user가 홈으로 접속하면 두번째 인자의 함수 실행
   res.send('hello home page');
});

app.get('/login',function(req,res){//get은 router (라우팅)
    res.send('<h1>login please</h1>');
})


//form
app.get('/form',function(req,res){//어떤 태그에 속성을 나타내고 싶을떄 ()를 쳐준다
    res.render('form');
})


//html에서 form은 url을 생성해주고, 웹브라우저는 form태그에 적당한 url을 자동으로 생성해 서버에 보내준다.
//form_receiver는 사용자가 전송한 title과 descrpition을 저장할 수 있게 됨.
app.get('/form_receiver',function(req,res){
    // var title= req.query.title;
    // var description= req.query.description;
    // res.send(title+','+description);
})

//get과 post의 차이는?
//post->url로 데이터 전송 x, 우리눈에 보이지 않음
//get은 그 반대?

app.post('/form_receiver',function(req,res){
    var title=req.body.title; //body파서를 통해 req객체의 body객체
    var description=req.body.description
    res.send(title+','+description);
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

 //언제 get을 쓰고 post를 쓸까?
 //line 18의 예제에서 원하는 것은 링크를 눌렀을때 주소가 바뀌는 것이다
 //정보에 대한 주소를 나타낼때 주소에 모든 정보를 나타내야한다.

 // get방식이라면, 제출한 정보가 url에 그대로 노출되어버리므로,
 // 전송시 정보를 url에 공유하지 않는 post를 사용한다.
 //그러나 post도 데이터를 가로채지 못하는 것은 아니라 보안상 안전x

//url을 통해서 쿼리스트링을 가지고 데이터를 전송하면 길이의 한계가 있다.