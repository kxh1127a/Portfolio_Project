// server.js
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 45212;
const cors = require('cors');
app.use(cors());

// MariaDB 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'c20st21', // MariaDB 사용자 이름
  password: 'Fxe1gAywXT0Puskn', // MariaDB 비밀번호
  database: 'c20st21' // 사용 중인 데이터베이스 이름
});

// MariaDB 연결
connection.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err.stack);
    return;
  }
  console.log('MariaDB에 연결되었습니다.');
});

// 클라이언트에 정적 파일 제공
app.use(express.static('public'));

// API 엔드포인트 생성: '/api/data'에서 데이터 가져오기
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM `music player`';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('데이터 조회 실패:', err);
      res.status(500).send('데이터 조회 실패');
      return;
    }
    console.log(results)
    res.json(results); // JSON 형식으로 클라이언트에 데이터 전송
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
