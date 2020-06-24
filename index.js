'use Strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const House = require('./models/house')

const app = express()
const port = process.env.PORT || 3002

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/house', (req, res) =>{
    House.find({}, (err, houses ) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if (!houses) return res.status(404).send({messages: 'the house doesnt exist'})

        res.send(200, {houses })
    })

    
})

app.get('/api/house/:houseID', (req, res)=>{
    let houseID = req.params.houseID

    House.findById(houseID,(err, house) =>{
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
        if(!house) return res.status(404).send({message: `The house does not exists`})

        res.status(200).send({house: house})
    })
} )

app.post('/api/house', (req, res) =>{
    console.log('POST /api/house')
    console.log(req.body)

    let house = new House()
    house.title =req.body.title
    house.price = req.body.price
    house.address =req.body.address
    house.rooms =req.body.rooms
    house.area =req.body.area
    house.type =req.body.type
    house.photo =req.body.photo

    house.save((err, housetored) =>{
       if (err)  res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
        
       res.status(200).send({house: housetored})
        
    })
    
})

app.put('/api/house/:houseID', (req, res) =>{
    let houseID = req.params.houseID
    let update = req.body

    House.findByIdAndUpdate(houseID, update,(err, houseUpdate) => {
        if (err) res.status(500).send({message: `Fail to update the house: ${err}`})
        

        res.status(200).send({house: houseUpdate})
    } )
})

app.delete('/api/house/:houseID', (req, res) =>{
    let houseID = req.params.houseID

    House.findById(houseID, (err, house)=>{
        if (err) res.status(500).send({message: `Fail to delete the house: ${err}`})

        house.remove(err =>{
            if (err) res.status(500).send({message: `Fail to delete the house: ${err}`})
            res.status(200).send({message: 'The house has been delete succesfully'})
        })

    })
})



mongoose.connect('mongodb://localhost:27017/hsh', (err, res) =>{
    if (err) throw errconsole.log('Conexion a la base de datos establecida...')

    app.listen(port, () =>{
        console.log(`API REST corriendo en http://localhost:${port}`)
    })

})
