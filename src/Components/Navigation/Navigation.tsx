import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navigation() {

const navLinks = [
  {
    title: 'Главная страница',
    link: '/'
  },
  {
    title: 'О проекте',
    link: '/about'
  },
  {
    title: 'Мои велосипеды',
    link: '/garage'
  },
  {
    title: 'Моя статистика',
    link: '/stats'
  }
]

  return (
    <nav className='navigation'>
      <ul className='navLinks'>
        {navLinks.map((nav, i) => (
          <li key={i}>
            <NavLink to={nav.link} className='navLinks__navLink link'>{nav.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
