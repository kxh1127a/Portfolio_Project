const routeRoot = (req, res) => {
    const fs = require("fs");
    fs.readFile("./htmlDocs/P_Pay_End.html", "utf-8", (err, getData)=>{
        if (err) throw err;
        res.send(getData);
    })
}

module.exports = routeRoot;