var express= require('express');
var app=express();

var cookieParser=require('cookie-parser'); //미들웨어
app.use(cookieParser());

var products={
    1:{title:'The history of web 1'}, //객체에 담겨있는 값
    2:{title:'The next web'}
}; //database 대용

app.get('/products',function(req,res){
    //product 객체의 내용가져오기
    var output='';

    for(var name in products){
        output+=
        `<li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`
       // console.log(products[name].title);
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});



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
});