import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className='page404'>
    <h2>Страница не найдена</h2>
    <Link to='/'>На главную</Link>
    </div>
  )
}
