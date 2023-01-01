import React from 'react'
import { NavLink } from 'react-router-dom'


interface navLink {
  title: string
  link: string
}

export default function Navigation() {

const navLinks: navLink[] = [
  {
    title: 'Главная страница',
    link: '/'
  },
  {
    title: 'О проекте',
    link: '/about'
  },
  {
    title: 'Мои тренировки',
    link: '/stats'
  },
  {
    title: 'Моя велосипеды',
    link: '/garage'
  },
  {
    title: 'Техобслуживание',
    link: '/maintenance'
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
