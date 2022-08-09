const express = require('express')
var app = express()
app.use(express.json())
app.use(express.static('screen'));
const PORT = 3000

const rootRoute = require('./routes/api/root');
const usersRoute = require('./routes/api/users');
const moviesRoute = require('./routes/api/movies');
const genresRoute = require('./routes/api/genres');
const webRoute = require('./routes/web/root')
 
app.use('/', webRoute)
app.use('/api/', rootRoute)
app.use('/api/users', usersRoute)
app.use('/api/movies', moviesRoute)
app.use('/api/genres', genresRoute)

app.listen(PORT, () => console.log('http://localhost:' + PORT, 'test server'));