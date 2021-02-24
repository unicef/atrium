const express = require('express')
const router = new express.Router()


router.get('/', (req, res) => {
    const fs = require('fs')
    const file = fs.createReadStream('./public/Blockchain Practical Guide - UN Innovation Network - Final for Distribution.pdf');
    const stat = fs.statSync('./public/Blockchain Practical Guide - UN Innovation Network - Final for Distribution.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=Blockchain Practical Guide - UN Innovation Network.pdf');
    file.pipe(res);
})


module.exports = router