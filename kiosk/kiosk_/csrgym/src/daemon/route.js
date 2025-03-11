class MyRoute {
    constructor(id){
        this.id = id;
        this.express = require("express");
        this.app = this.express();
        this.path = require("path");
        this.bodyParser = require("body-parser");
        this.serviceInfo = require('../config/service');
        this.htmlTemplate = require('../config/htmlConfig');
    }
    daemonReady(){
        this.app.use(this.express.static('htmlDocs'));
        this.app.use(this.bodyParser.urlencoded({ extended: true }));
        this.app.set("view engine", "pug");
        this.app.set("views", "pugDocs")
        this.app.listen(this.serviceInfo.port, () => {
            console.log("port " + this.serviceInfo.port + " Daemon start.")
        });
    }
    runRoute(){
        this.app.get("/", (req, res) => {
            const routeRoot = require("../doit/routeIntro.js");
            routeRoot(req, res);
        });
        this.app.get("/new", (req, res) => {
            const routeRoot = require("../doit/routeMain");
            routeRoot(req, res);
        });
        this.app.get("/origin", (req, res) => {
            const routeRoot = require("../doit/routeUserCheck");
            routeRoot(req, res);
        });
        this.app.get("/main", (req, res) => {
            const routeRoot = require("../doit/routeMain");
            routeRoot(req, res);
        });
        this.app.get("/OrderDetail", (req, res) => {
            const routeRoot = require("../doit/routeOrderDetail");
            routeRoot(req, res);
        });
        this.app.get("/Progress", (req, res) => {
            const routeRoot = require("../doit/routeProgress");
            routeRoot(req, res);
        });
        this.app.get("/End", (req, res) => {
            const routeRoot = require("../doit/routeEnd");
            routeRoot(req, res);
        });
        this.app.get("/Receipt", (req, res) => {
            const routeRoot = require("../doit/routeReceipt.js");
            routeRoot(req, res);
        });
    }
    run() {
        this.daemonReady();
        this.runRoute();
    }
}
const daemon = new MyRoute("service1");

module.exports = daemon;