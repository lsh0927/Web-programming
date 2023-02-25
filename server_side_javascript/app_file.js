//data를 파일에 저장, file기반

//1. 익스프레스를 가져욤
var express =require('express');
//2.app객체를 만듦
var app=express();
app.locals.pretty = true;
var bodyparser=require('body-parser');
var fs=require('fs');

app.use(bodyparser.urlencoded({extended:false }))//모든 요청은 이 미들웨어를 먼저 통과한뒤에 라우터가 동작함

app.set('views','./views_file');
app.set('view engine','jade')//jade를 쓸것이다. ->npm install jade...
//app객체가 갖고있는 메소드를 이용(listen)
app.listen(3000,function(){
    console.log('Connected,3000 port!');
}) //여기까지가 연결

//라우팅(어떤 주소로 접근했을때 url에 따라 정보를 보여주어야함)

//1.topic/new로 접속하면 form을 출력

app.get('/topic/new',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500),send('internal server error')
        }
        res.render('new',{topics:files});
    });       
})

//form을 만들어야함(views_file폴더에 템플릿엔진을 넣으려면 ->set이용)

//new.jade에 html로 코딩, form옆에 action으로 get인지 post인지 입력

//post로 들어온 정보를 라우처에서 캐치하게 함
app.post('/topic',function(req,res){
    var title=req.body.title;
    var description=req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err)
        {
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title); //콜백함수가 실행된 후에
        //응답할수 있음

    }) //data안에 title을 제목 des를 본문으로 저장할것임
})
//form에서 전송된 post형식의 data를 이 안에서 사용해야함

//바디파서 모듈을 쓰는 방법---

//data라는 디렉토리를 만들어 파일을 저장(비추,but 간단하게만 다룸)
//fs를 가져와야함

//data를 출력해봅시다
app.get(['/topic','/topic/:id'],function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err);
            res.status(500),send('internal server error')
        }
        var id=req.params.id;
        //id값이 있을 때
        if(id){
            fs.readFile('data/'+id,'utf8',function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view',{topics:files, title:id,description:data});//id값을 보냄
            })
        } else{
        //id값이 없을 때
        res.render('view',{topics:files, title:'Welcome',description:'hello, javascript for server.'}); //35강 10분(인프런)
        }
       
    }) 
});
//jade tamplet 반복문 사용

