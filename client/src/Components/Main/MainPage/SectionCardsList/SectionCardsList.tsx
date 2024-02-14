import SectionCard from 'components/Main/MainPage/SectionCard/SectionCard';
import { Card } from 'types/Card';
import garage from 'assets/images/garage.png';
import stats from 'assets/images/stats.png';
import maintenance from 'assets/images/maintenance.png';
import workshop from 'assets/images/workshop.jpeg';
import bikes from 'assets/images/bikes.jpg';
import rides from 'assets/images/rides.jpg';

export default function SectionCardsList() {
  const cardsContent: Card[] = [
    {
      title: 'Заезды',
      cover: rides,
      icon: stats,
      header: 'Здесь собраны все заезды и их статистика',
      text: `Пробег, время, количество тренировок и другая статистика с разбивкой по годам или с момента начала пользования Стравой. 
             А ещё календарь со всеми поездками.`,
      path: '/stats'
    },
    {
      title: 'Велосипеды',
      cover: bikes,
      icon: garage,
      header: 'Это твой велогараж',
      text: 'Там хранятся все твои велосипеды с отдельной статистикой пробега по каждому из них. И, конечно, там есть фотки.',
      path: '/garage'
    },
    {
      title: 'Техобслуживание',
      cover: workshop,
      icon: maintenance,
      header: 'Раздел, где отображается пробег различных компонентов твоих велосипедов',
      text: 'Не забывай заглядывать сюда, чтобы не пропустить замену очередного расходника или сделать отметку о проведённом ТО',
      path: '/maintenance'
    }
  ];

  return (
    <section className="section-cards-list">
      <ul>
        {cardsContent.map((card: Card, i: number) => (
          <li key={i} className="section-cards-list__card">
            <SectionCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
