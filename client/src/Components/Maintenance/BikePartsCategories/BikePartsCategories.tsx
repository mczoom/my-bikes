import { Link } from 'react-router-dom';

export default function BikePartsCategories() {
  const parts = [
    {
      title: 'Звёзды',
      url: 'chainrings'
    },
    {
      title: 'Каретки',
      url: 'bbs'
    },
    {
      title: 'Кассеты',
      url: 'cassettes'
    },
    {
      title: 'Колёса',
      url: 'wheels'
    },
    {
      title: 'Педали',
      url: 'pedals'
    },
    {
      title: 'Покрышки',
      url: 'tires'
    },
    {
      title: 'Рамы',
      url: 'frames'
    },
    {
      title: 'Сёдла',
      url: 'saddles'
    },
    {
      title: 'Тормозные колодки',
      url: 'brakepads'
    },
    {
      title: 'Тросики / рубашки',
      url: 'cables'
    },
    {
      title: 'Цепи',
      url: 'chains'
    }
  ];

  return (
    <div>
      <ul>
        {parts.map((part, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            <Link to={part.url}>{part.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
