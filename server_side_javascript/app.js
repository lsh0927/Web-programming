var express= require('express');
var app= express();


app.get('/',function(req,res){//user가 홈으로 접속하면 두번째 인자의 함수 실행
   res.send('hello home page');
});


app.get('/login',function(req,res){//get은 router (라우팅)
    res.send('<h1>login please</h1>');
})

app.listen(3000,function(){
    console.log('connected 3000 port!')
});