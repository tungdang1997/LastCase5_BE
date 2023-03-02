import express from "express";
import { router } from './src/router/router';
import bodyParser from "body-parser";
import session from "express-session";
import flash from "connect-flash";
import { AppDataSource } from "./src/data-source";
import cors from "cors";

const app = express();

AppDataSource.initialize().then(() => {console.log('database connected');
});
app.use(cors());
app.use(express.static('./public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: Infinity }
}));

app.use('', router);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})