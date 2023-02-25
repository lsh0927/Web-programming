var OrientDB = require('orientjs');

var server= OrientDB({
    host:'localhost',
    port: 2424,
    username:'root',
    password:'dltmdgjs0927'
});
var db=server.use('o2');
//var client = pyorient.OrientDB("localhost", 2424)
client.get_session_token(true);

/*
db.record.get('#35:0')//rid값
.then(function(record){
    console.log('Loaded record', record);
});
*/
//data입력(변경)
/*
1. CREATE
2. READ
3. UPDATE
4. DELETE
*/

//create
// var sql='SELECT FROM topic';
// db.query(sql).then(function(results){
//     console.log(results);
// });
var sql='SELECT FROM topic WHERE @rid:rid';
var param ={
    params:{
        rid:'#12:1'
    }
};
db.query(sql,parma).then(function(results){
    console.log(results);
});

//data출력