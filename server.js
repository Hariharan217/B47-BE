
const express = require("express")

const fs = require('fs/promises');



let app = express()

app.get('/', (req, res)=>{
    
    let content = Date().split(' ');
    let time = content[4].split(':').join('-');

    res.status(200).send("hello");
    fs.writeFile(`./${content[1]}-${content[2]}-${time}.txt`, content, { flag: 'w' }, (err) => {
        if (err) { console.log(err) }
    })
    
})

app.listen(3000)