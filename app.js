const express = require("express")
const path = require("path")
const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

const Product = require("./models/products.model")
const productData = require("./products.json")
//Conexión a la base de datos
require("./db/ironshop-db")

Product.deleteMany()
    .then(Product.create(productData))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.render('index-page')
})

app.get('/tienda', (req, res) => {
    Product
        .find()
        .sort({ price: -1 })
        .select({ thumbnail: 1, title: 1, price: 1, description: 1 })
        .then(allProducts => res.render('tienda', { products: allProducts }))
})


app.listen(5005, () => console.log('servidor levantado en 5005'))