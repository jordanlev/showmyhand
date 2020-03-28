import React from 'react'
import socket from '../socket'

function toggleHand() {
  socket.emit('hand')
}

export default function({ users, hands }) {
  return (
    <ol>
      {hands.map(id => {
        const isCurrentUser = id === socket.id
        const button = (
          <button type="button" onClick={toggleHand}>
            HIDE MY HAND
          </button>
        )

        return (
          <li key={id}>
            {users[id]}
            {isCurrentUser && button}
          </li>
        )
      })}
    </ol>
  )
}
