import React, {useState} from 'react'
import garage from '../../images/garage.png';
import stats from '../../images/stats.png';
import maintenance from '../../images/maintenance.png';
import SectionCard from '../SectionCard/SectionCard';
import {Card} from '../../models/Card';



export default function SectionCardsList() {

  const cardsContent: Card[] = [
    {
      title: 'Мои тренировки',
      picture: stats,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla fringilla dapibus. Aliquam bibendum, metus non faucibus auctor, sapien ligula vulputate elit, ut mollis nulla eros quis eros. Mauris ut risus at nisl gravida viverra. Donec id neque leo. Donec in orci cursus, congue augue nec, feugiat velit. Praesent porttitor sapien quis quam ornare, eget posuere massa posuere. Donec ornare erat vitae urna facilisis molestie.',
      path: '/stats'
    },
    {
      title: 'Мои велосипеды',
      picture: garage,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla fringilla dapibus. Aliquam bibendum, metus non faucibus auctor, sapien ligula vulputate elit, ut mollis nulla eros quis eros. Mauris ut risus at nisl gravida viverra. Donec id neque leo. Donec in orci cursus, congue augue nec, feugiat velit. Praesent porttitor sapien quis quam ornare, eget posuere massa posuere. Donec ornare erat vitae urna facilisis molestie.',
      path: '/garage'
    },
    {
      title: 'Техобслуживание',
      picture: maintenance,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla fringilla dapibus. Aliquam bibendum, metus non faucibus auctor, sapien ligula vulputate elit, ut mollis nulla eros quis eros. Mauris ut risus at nisl gravida viverra. Donec id neque leo. Donec in orci cursus, congue augue nec, feugiat velit. Praesent porttitor sapien quis quam ornare, eget posuere massa posuere. Donec ornare erat vitae urna facilisis molestie.',
      path: '/maintenance'
    }
  ]


  return (
    <section className='section-cards-list'>
      <ul>
        {cardsContent.map((card: Card, i: number) => (
          <li key={i} className='section-cards-list__card'>
            <SectionCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  )
}
