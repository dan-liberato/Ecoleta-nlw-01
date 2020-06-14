import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'
import { errors } from 'celebrate'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(errors())

app.listen(3333)

// const users = [
// 	"Daniel",
// 	"Diego",
// 	"Cleiton",
// 	"Robson"
// ];


// app.get('/users', (req, res) => {
// 	const search = String( req.query.search )

// 	const filteredUsers = search ? users.filter(user => user.includes(search)) : users

// 	return res.json(filteredUsers)
// })

// app.get('/users/:id', (req, res) => {
// 	const id = Number( req.params.id )

// 	const user = users[id]

// 	return res.json(user)
// })

// app.post('/users', (req, res) => {
// 	const data = req.body

// 	const user = {
// 		nome: data.nome,
// 		email: data.email,
// 	}

// 	return res.json(user)
// })
