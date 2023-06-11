import SectionCard from '../SectionCard/SectionCard';
import {Card} from '../../models/Card';
import garage from '../../images/garage.png';
import stats from '../../images/stats.png';
import maintenance from '../../images/maintenance.png';
import workshop from '../../images/workshop.jpeg';
import bikes from '../../images/bikes.jpg';
import rides from '../../images/rides.jpg';



export default function SectionCardsList() {

  const cardsContent: Card[] = [
    {
      title: 'Заезды',
      cover: rides,
      icon: stats,
      header: 'Здесь собраны все заезды и их статистика',
      text: `Хочешь узнать какой у тебя пробег за всё время пользования Стравой? Или посмотреть пробег, время, количество тренировок и другую статистику с разбивкой по годам? 
             Или интересно увидеть наглядно на календаре свои прошлые поездки? Всё это и прочая любопытная статистика собраны в этом разделе`,
      path: '/stats'
    },
    {
      title: 'Мои велосипеды',
      cover: bikes,
      icon: garage,
      header: 'Это твой велогараж',
      text: 'Там хранятся все твои велосипеды с отдельной статистикой пробега по каждому из них. А ещё там есть фотки.',
      path: '/garage'
    },
    {
      title: 'Техобслуживание',
      cover: workshop,
      icon: maintenance,
      header: 'В этом разделе отображается пробег различных компонентов твоих велосипедов',
      text: 'Не забывай заглядывать сюда, чтобы не пропустить замену очередного расходника или сделать отметку о проведённом ТО',
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
