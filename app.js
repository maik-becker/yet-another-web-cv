/*
 *  Copyright © 2018 Yuri Becker <hi@yuri.li>
 *
 *  This work is free. You can redistribute it and/or modify it under the terms of the
 *  Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar.
 *  See http://www.wtfpl.net/ for more details.
 */
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const fs = require('fs')
const http = require('http')
const express = require('express')
const app = express()

app.set('views', path.join(__dirname, 'views/'))
app.set('view engine', 'pug')
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}))

app.use(express.static(path.join(__dirname, 'public')))

const contentDirectory = path.join(__dirname, 'content')
fs.readdirSync(contentDirectory).forEach(file => {
  const fileName = file.substring(0, file.lastIndexOf('.'))
  console.log(`setting up /${fileName}...`)

  app.use(`/${fileName}`, function(req, res) {
    fs.readFile(path.join(contentDirectory, file), 'utf-8', function(err, data) {
      res.render('index', JSON.parse(data))
    })
  })
})

const port = process.env.PORT
app.set('port', port);

const server = http.createServer(app)

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen')
    throw error

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port
  console.log('Listening on ' + bind);
}
