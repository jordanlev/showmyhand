import React, { useState, useEffect } from 'react'
import socket from '../socket'

export default function() {
  const [name, setName] = useState('')

  const handleChange = e => {
    setName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const normalizedName = name.trim()
    if (normalizedName) {
      socket.emit('login', name)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Your name:
        <input type="text" value={name} onChange={handleChange} autoFocus />
      </label>
      <button type="submit">OK</button>
    </form>
  )
}
