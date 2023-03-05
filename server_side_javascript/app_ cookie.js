var express= require('express');
var app=express();

var cookieParser=require('cookie-parser'); //미들웨어
app.use(cookieParser());

app.get('/count',function(req,res){
    
    if(req.cookies.count){
        var count= parseInt(req.cookies.count); //쿠키 카운터 1을 숫자로 바꿈
    }
    else{
        var count=0;
    }
    count=count+1;
    //응답할때 count++하여 웹서버에 보낼거니까
    res.cookie('count',count);//미들웨어로 cookie라는 메서드가 생김
    res.send('count : '+req.cookies.count);
});

app.listen(3003,function(){
    console.log('connected 3003 port!!!');
})