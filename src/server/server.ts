/**
 *                 ApplicationServer
 *             (Do not change this code)
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */
import engine, { Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import Routes from "./routes";
 
 export class Server {

    private readonly engine: Express = engine();
    private readonly routes = new Routes(this.engine); 
    private readonly port: number;
    
    constructor(port: number = 8000) {
        this.port = port;
        this.initEngine();
        this.initMiddleswares();
     }
 
     private initEngine() {
         // Destructuring assignment
         const { engine, port } = this;

         engine.set("port", port);
     }
 
     private initMiddleswares() {
         // Destructuring assignment
         const { engine } = this;

         engine.use(morgan("dev"));
         engine.use(bodyParser.urlencoded({extended:true}));
         engine.use(bodyParser.json());
     }
 
     public run() {
         // Destructuring assignment
         const { engine, routes } = this;

         routes.initBlockchainRoutes();

         engine.listen(engine.get("port"), () => {
             console.log(`Server Listening for port: ${engine.get("port")}`);
         });
     }
 
 }