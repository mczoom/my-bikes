import React from 'react'
import {Link} from 'react-router-dom';
import {Card} from '../../models/Card';
import { refreshToken } from '../../utils/stravaAuthApi';


interface SectionCardProps {
  card: Card
}





export default function SectionCard({card}: SectionCardProps) {
  return (
    <Link to={card.path} className='section-card link' onClick={refreshToken}>
        <h2 className='section-card__header'>{card.title}</h2>
        <div className='section-card__wrapper'>
          <img src={card.picture} className='section-card__image' alt='иконка секции'></img>
          <p className='section-card__text'>{card.text}</p>
        </div>
    </Link>
  )
}
