var express = require('express');
var router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../screen/frame.html'))
});

router.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../screen/login.html'))
})

router.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../screen/signup.html'))
})

router.get('/help', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../screen/helpcenter.html'))
})

router.get('/contact', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../screen/contactform.html'))
})

router.get('/plan', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../../screen/pricing.html'))
})

// router.get('/watch/:id', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, '../../screen/help.html'))
// })

module.exports = router