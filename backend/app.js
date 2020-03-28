const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

http.listen(3000, () => {
  console.log('listening on *:3000')
})

/****************************************************/

class State {
  constructor(io) {
    this.io = io
    this.users = {}
    this.hands = new Set()
  }

  addUser(id, name) {
    this.users[id] = name
    this.sendUpdate()
  }

  removeUser(id) {
    delete this.users[id]
    this.hands.delete(id)
    this.sendUpdate()
  }

  toggleHand(id) {
    if (this.hands.has(id)) {
      this.hands.delete(id)
    } else {
      this.hands.add(id)
    }

    this.sendUpdate()
  }

  sendUpdate() {
    this.io.emit('update', {
      users: this.users,
      hands: Array.from(this.hands),
    })
  }
}

const state = new State(io)

io.on('connection', socket => {
  socket.on('login', name => {
    state.addUser(socket.id, name)
  })

  socket.on('hand', () => {
    state.toggleHand(socket.id)
  })

  socket.on('disconnect', function() {
    state.removeUser(socket.id)
  })
})
