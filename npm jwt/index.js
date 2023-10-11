const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretKey";
app.get("/", (req, res) => {
    res.json({ message: "a sample api" });
})

app.post("/login", (req, res) => {
    const user = {
        username: req.query.userName,
        password: req.query.password,
        age: req.query.age
    }
    jwt.sign({ user }, secretKey, { expiresIn: '3000s' }, (err, token) => {
        res.json({ token })
    })
})

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.send({ result: "invalid token" })
        } else {
            res.json({ message: "Profile Accessed", authData })
        }
    })
})

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({ result: "token is not valid" });
    }
}

app.listen(8080, () => {
    console.log("App is running on 8080 port");
})