const http = require('http'); //const=js최신 문법, 변수(상수 한번 할당되면 변하지 않으므로) http에 http모듈을 담음

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {//서버생성
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {//서버가 리스닝을 하도록함.
  console.log(`Server running at http://${hostname}:${port}/`);
});

//웹서버가 되는 코드이다. 
//node.js를 통해 웹서버 어플을 실행시킨것이다.
//이 어플은 우리 컴퓨터에서 요청이 들어오기를 기다리고 있다.
//적힌 주소로 접근하면, webser.js 코드가 동작해 helloworld를 출력한다.
//우리가 작성한 js코드가 웹 브라우저를 통해 요청한 내용을 받아 
//이 텍스트를 전송한것이다.
//웹브라우저가 설치되어 있는 컴퓨터가 클라이언트..요청하는 쪽임
//요청한 정보를 클라이언트에게 보내주는 것이 서버.

