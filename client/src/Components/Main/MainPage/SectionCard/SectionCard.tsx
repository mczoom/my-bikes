import { Link } from 'react-router-dom';
import { Card } from 'types/Card';

interface SectionCardProps {
  card: Card;
}

export default function SectionCard({ card }: SectionCardProps) {
  return (
    <Link to={card.path} className="link">
      <div className="section-card">
        <figure className="section-card__content">
          <img src={card.cover} className="section-card__cover"></img>
          <div className="section-card__gradient"></div>
          <h2 className="section-card__header">{card.title}</h2>
          <figcaption className="section-card__description">
            <h3 className="description__header">{card.header}</h3>
            <p className="description__text">{card.text}</p>
          </figcaption>
        </figure>
      </div>
    </Link>
  );
}
