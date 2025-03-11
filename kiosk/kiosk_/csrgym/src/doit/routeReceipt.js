const routeRoot = (req, res) => {
    // const fs = require("fs");
    // fs.readFile("./htmlDocs/P_Pay_Receipt.html", "utf-8", (err, getData)=>{
    //     if (err) throw err;
    //     res.send(getData);
    // })
    const mysql = require('mysql');
    const sqlHandler = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0000",
        database: "receipt_test"
    })



    sqlHandler.connect((err) => {
        if (err) throw err;
        sqlHandler.query('select * from receipt', (err, getData) => {
            console.log(getData)
            getData.forEach((v) => {
                const label = document.createElement('label');
                label.className = `receipt_product_${index + 1}`;
                label.innerHTML = `
                             <div>${v.desc}</div>
                             <div>${v.option}</div>
                             <div>${v.qty}</div>
                             <div>${v.price}</div>
                             `;
                json_display_area.appendChild(label);             
            })

            res.render("P_Pay_Receipt", { desc_01: total })

        });
    })
}

module.exports = routeRoot;