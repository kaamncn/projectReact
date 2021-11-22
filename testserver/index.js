const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;
app.listen(PORT,() => console.log(`server is running on port ${PORT}`))
const cors = require("cors");
const corsOptions = { origin: '*', credentials: true, }
const fs = require('fs');
app.use(cors(corsOptions))

app.get('/csv',(req,res)=> {
    var readFile = fs.readFileSync('./data/csv.csv','utf-8');
    res.send(readFile);
});