const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const port = 3000

let data = JSON.parse(fs.readFileSync('data.json'))


app.set('views', path.join(__dirname, 'tampilan'))
app.set('view engine','ejs') 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.render('index', {data}))

app.get('/add', (req, res) => res.render('add'))

app.post('/add', (req, res) => { 
    data.push(req.body)
    fs.writeFileSync('data.json', JSON.stringify(data)); 
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id
    data.splice(id, 1)
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.redirect('/')
})


app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    res.render('edit', { item: { ...data[id] }, id });
})

app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    const edit = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    }
    data.splice(id, 1, edit);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))