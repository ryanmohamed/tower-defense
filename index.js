const express = require('express')
const app = express() 
const path = require('path')

//server files from public directory when root route accessed 
app.use('/', express.static(path.join(__dirname, 'public')));

//handle 404s with some middleware
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
})

app.listen(3000, () => console.log('Listening on port 3000'))
