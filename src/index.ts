import express from "express";
import * as path from 'path';
import prisma from './db.ts';
import { create } from 'express-handlebars';
import { listUsers } from './views/helpers/users.helper.ts';

const app = express();
const port = 8081;

const hbs = create({
    extname: '.html',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: [
        __dirname + '/views',
        __dirname + '/views/partials',
    ],
    // Specify helpers which are only registered on this instance.
    helpers: {
        listUsers,
    }
});

app.engine('html', hbs.engine);
app.set('view engine', 'html');
app.set('views', './src/views');

app.get("/scripts/htmx.min.js", function(req, res) {
    res.sendFile(path.join(__dirname, "../node_modules/htmx.org/dist/htmx.js"));
});

app.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.render('home', {
        showTitle: true,
        users: users,
    });
});


app.get("/api/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.render('usersList', {
        layout: "partial",
        users: users,
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});