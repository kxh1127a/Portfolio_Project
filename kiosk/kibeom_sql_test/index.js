const express = require('express');
const path = require('path')
const mysql = require('mysql');
const app = express();
const port = 45210;

app.use(express.static(path.join(__dirname, 'public')));

//input page (input 입력해서 다음페이지에 쿼리로 값 전달)
app.get('/end', (req,res)=>{
	res.sendFile(__dirname + '/public/P_Pay_End.html');
});


//result page (쿼리로 전달받은 값 _title, _body를 db table에 저장)
app.get('/receipt', (req,res)=>{
	res.sendFile(__dirname + '/public/P_Pay_Receipt.html');
	const sql = mysql.createConnection({   //테이블 정보 정의
		host: "localhost",
		user: "c20st21",
		password: "Fxe1gAywXT0Puskn",
		database: "c20st21"
	});
    
	const _title = req.query.title;  //쿼리로 전달받은 값
	const _body = req.query.body;
	const inputString = `INSERT INTO \`receipt\` VALUES ("${_title}", "${_body}")`;  //sql문
	
	sql.connect();                          //테이블 연결
	sql.query(inputString, (err, rows)=>{   //sql 쿼리 실행
		if(err) throw err;
	})
})

app.listen(port, console.log('port 45210!'))
