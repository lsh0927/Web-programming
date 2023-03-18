var express= require('express');
var app=express();

var cookieParser=require('cookie-parser'); //미들웨어
app.use(cookieParser('23421342341253g234wf#@$q')); //key값

var products={
    1:{title:'The history of web 1'}, //객체에 담겨있는 값
    2:{title:'The next web'}
}; //database 대용


//사용자의 컴퓨터에 데이터를 저장하고, 가져올수있는 쿠키
//서버와 컴퓨터가 통신하는 과정에서 중요한 데이터가 노출되거나 심어져있는 것은 보안상 매우매우매우 위험
//쿠키 기능 & 데이터 저장 공간을 조합해 session을 만들어 동작시킴
//session: save only id


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

/*
cart ={앞은 제품 번호, 뒤는 수량
    1:2,
    2:1,
    
}
*/


app.get('/cart/:id',function(req,res){
    var id= req.params.id;
    if(req.signedCookies.cart){//세팅되어있다면
        var cart=req.signedCookies.cart;
    }else{
        var cart= {};
    }
    if(!cart[id]){//cart[id]가 존재하지 않을때
        cart[id]=0;
    }
    cart[id]= parseInt(cart[id])+1;
    res.cookie('cart',cart,{signed:true});
    res.redirect('/cart');
});

app.get('/cart',function(req,res){
   var cart= req.signedCookies.cart;
   if(!cart){
    res.send('emthy!');
   }
   else{
        var output='';
        for(var id in cart){
            output+=`<li>${products[id].title} (${cart[id]})</li>`;
        }
   }
    res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products List</a>`);
});


app.get('/count',function(req,res){
    
    if(req.signedCookies.count){//암호화!
        var count= parseInt(req.signedCookies.count); //쿠키 카운터 1을 숫자로 바꿈
    }
    else{
        var count=0;
    }
    count=count+1;
    //응답할때 count++하여 웹서버에 보낼거니까
    res.cookie('count',count,{signed:true});//미들웨어로 cookie라는 메서드가 생김
    res.send('count : '+req.signedCookies.count);
});

app.listen(3003,function(){
    console.log('connected 3003 port!!!');
});