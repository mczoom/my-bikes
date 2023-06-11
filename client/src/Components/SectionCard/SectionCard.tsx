import {Link} from 'react-router-dom';
import {Card} from '../../models/Card';


interface SectionCardProps {
  card: Card
}



export default function SectionCard({card}: SectionCardProps) {
  return (
    
    <Link to={card.path} className='section-card link' >
      <div className='section-card__container'>
        <div className='section-card__wrapper'>        
          <img src={card.icon} className='section-card__image' alt='иконка раздела'></img>
          <h2 className='section-card__header'>{card.title}</h2>
        </div>
        <figure className='section-card__content'>
          <img src={card.cover} className='section-card__cover'></img> 
          <figcaption className='section-card__description'>
            <h3 className='description__header'>{card.header}</h3>        
            <p className='description__text'>{card.text}</p>
          </figcaption>
        </figure>
      </div>
    </Link>
    
  )
}
