import { Link } from "react-router-dom"

export default function BikePartsCategories() {

const parts = [
    {
      title: 'Рамы',
      url: 'frames'
    },
    {
      title: 'Колёса',
      url: 'wheels'
    },
    {
      title: 'Покрышки',
      url: 'tires'
    },
    {
      title: 'Кассеты',
      url: 'cassettes'
    },
    {
      title: 'Звёзды',
      url: 'chainrings'
    },
    {
      title: 'Цепи',
      url: 'chains'
    },
    {
      title: 'Тормозные колодки',
      url: 'brakepads'
    },
    {
      title: 'Каретки',
      url: 'bb'
    },
    {
      title: 'Сёдла',
      url: 'saddles'
    },
    {
      title: 'Педали',
      url: 'pedals'
    },
    {
      title: 'Тросики / рубашки',
      url: 'cables'
    },
    
]

  return (
    <div>      
      <ul >
        {parts.map((part) => (
          <li style={{marginBottom: '10px'}}><Link to={part.url}>{part.title}</Link></li>
        ))}
      </ul>
  </div>
  )
}
