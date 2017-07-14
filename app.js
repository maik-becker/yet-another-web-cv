/*
 *  Copyright © 2018 Maik Becker <hi@maik.codes>
 *  
 *  This work is free. You can redistribute it and/or modify it under the terms of the 
 *  Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar.
 *  See http://www.wtfpl.net/ for more details.
 */

const express = require('express')
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const fs = require('fs')

const app = express()

app.set('views', path.join(__dirname, 'views/'))
app.set('view engine', 'jade')
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

  app.use(`/${fileName}`, function (req, res) {
    fs.readFile(path.join(contentDirectory, file), 'utf-8', function (err, data) {
      res.render('index', JSON.parse(data))
    })
  })
})

module.exports = app
