import React from 'react'

export default function AccessButton() {
  return (
    <a href='http://www.strava.com/oauth/authorize?client_id=98790&response_type=code&redirect_uri=http://localhost:3000/access&scope=profile:read_all'>
        <button type='button' className='access-button'>Authorize at Strava</button>
    </a>
  )
}
