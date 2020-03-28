import React from 'react'
import socket from '../socket'

function toggleHand() {
  socket.emit('hand')
}

export default function({ users, hands }) {
  return (
    <ul>
      {Object.entries(users).map(([id, name]) => {
        const isHandShown = hands.includes(id)
        if (isHandShown) {
          return
        }

        const isCurrentUser = id === socket.id
        const button = (
          <button type="button" onClick={toggleHand}>
            SHOW MY HAND
          </button>
        )

        return (
          <li key={id}>
            {name}
            {isCurrentUser && button}
          </li>
        )
      })}
    </ul>
  )
}
