const express = require('express');
// var pg = require("pg");
const { Client } = require('pg');
// const router = express.Router();

// var conStr = "postgres://adouglas@localhost:5432/equity_dash";
// var pool = new pg.Pool({
//   connectionString: conStr
// });

// const client = new Client({
//   host: 'rebny-test.cxa8lq0lsxfl.us-east-2.rds.amazonaws.com',
//   user: 'rebnyuser',
//   port: 5432,
//   password: 'rebnytest1',
//   database: 'rebny'
// });

const client = new Client({
  host: '34.83.93.220',
  user: 'postgres',
  port: 5432,
  password: '12345',
  database: 'postgres'
});

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

client.connect(err => {
  if (err) {
    console.error('connection failed: ', err.stack);
  } else {
    console.log('connected postgres');
  }
});

app.get('/', async (req, res) => {
  const { symbol } = req.query;

  try {
    // const data = await client.query("SELECT * FROM combined LIMIT 1");
    const newsData = await client.query(`SELECT * FROM news   WHERE "symbol" = '${symbol}' ORDER BY "published_at" DESC LIMIT 10`);
    const twtrData = await client.query(`SELECT * FROM tweets WHERE "symbol" LIKE '%${symbol}%' ORDER BY "created_at"   DESC LIMIT 10`);
    // console.log(data.rows);
    return res.status(200).send({
      newsData: newsData.rows,
      twtrData: twtrData.rows
    });

  } catch (e) {
    console.log('error: ', e);
    return res.status(501).send({ error: e });
  }
});

// app.get('/', function (req, res, next) {
//     // pool.connect(function(err,client,done) {
//     //    if(err){
//     //        console.log("not able to get connection "+ err);
//     //        res.status(400).send(err);
//     //    }
//     //    client.query('SELECT * FROM historical_prices LIMIT 1', [1],function(err,result) {
//     //        done(); // closing the connection;
//     //        if(err){
//     //            console.log(err);
//     //            res.status(400).send(err);
//     //        }
//     //        console.log(res);
//     //        res.status(200).send(result.rows);
//     //    });
//     // });
//
//     const data = client.query("SELECT * FROM combined LIMIT 1");
//     console.log(data.rows);
//     return res.status(200).send(data.rows);
// });

app.listen(4000, function () {
    console.log('Server is running on Port 4000');
});
