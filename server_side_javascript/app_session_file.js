var express= require('express');
var session=require('express-session');//메모리에 저장
var bodyParser=require('body-parser');
var app=express(); //
var FileStore = require('express-file-store');
var fileStore = FileStore('s3', {
    key: process.env.AMAZON_ACCESS_KEY_ID,
    secret: process.env.AMAZON_ACCESS_KEY_SECRET,
    bucket: 'test',
    region: 'ap-southeast-1'
  });

app.use(session({
    secret:'1234qwefqsdcweqwe23!@',
    resave: false,
    saveUninitialized:true,
    store:new FileStore()//express-session은 사용자의 session을 store가 가리키는 filestore에 저장
}));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/count',function(req,res){
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    
    res.send('count:' +req.session.count);
});
app.get('/welcome',function(req,res){
    if(req.session.displayName)
    {
        res.send(`
        <h1> Hello, ${req.session.displayName} </h1>
        <a href="/auth/logout">logout</a>
        `);
    }
    else{
        res.send(`
        <h1>Welcome</h1>
        <a href="/auth/login">Login</a>
        `);
    }
   
});

app.get('/auth/logout',function(req,res){
    
    delete req.session.displayName;
    res.redirect('/welcome');
    
});
app.post('/auth/login', function(req,res){
    var user={
        username:'lsh0927',
        password:'dltmdgjs',
        displayName:'이승헌님'
    };
    var uname=req.body.username;
    var pwd=req.body.password;
    
    if(uname===user.username && pwd===user.password){
        req.session.displayName=user.displayName;
        
        res.redirect('/welcome');
    }
    else{
        res.send('who are you?<a href="/auth/login">login</a>' );
    }
   
});

app.get('/auth/login',function(req,res){
    var output=`
    <h1>Login</h1>
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </P>
        <p>
            <input type="password" name="password" placeholder="password">
        </P>
        <p>
            <input type="submit">
        </P>
    </form>
    `;

    res.send(output);
});


app.get('/tmp',function(req,res){
    res.send('result: '+req.session.count);
});

app.listen(3003,function(){
    console.log('connected 3003 port!!!');
});