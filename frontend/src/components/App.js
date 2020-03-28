import React, { useState, useEffect } from 'react'
import socket from '../socket'
import EnterName from './EnterName'
import UserList from './UserList'
import HandList from './HandList'

export default function() {
  const [users, setUsers] = useState({})
  const [hands, setHands] = useState([])

  useEffect(() => {
    socket.on('update', data => {
      setUsers(data.users)
      setHands(data.hands)
    })
  }, [])

  const isLoggedIn = !!users[socket.id]
  if (!isLoggedIn) {
    return <EnterName />
  }

  return (
    <div>
      <UserList users={users} hands={hands} />
      <HandList users={users} hands={hands} />
    </div>
  )
}
