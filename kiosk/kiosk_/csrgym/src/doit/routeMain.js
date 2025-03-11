const routeRoot = (req, res) => {
    const fs = require("fs");
    fs.readFile("./htmlDocs/P_Prod_Main.html", "utf-8", (err, getData)=>{
        if (err) throw err;

        let scriptAdd = `
            <script>
                document.getElementById("btn_user_info").style.visibility = "hidden"
            </script>
        `
        scriptAdd = getData.replace('</body>', `${scriptAdd}</body>`);
        res.send(scriptAdd);
    })
    
}

module.exports = routeRoot;