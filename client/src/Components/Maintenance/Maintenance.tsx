import { Route, Routes } from "react-router-dom";
import BikePartsCategories from "./BikePartsCategories/BikePartsCategories";
import BikePartsList from "./BikePartsList/BikePartsList";

export default function Maintenance() {

  const chains = [
    {
        title: 'цепь',
        name: 'ZX10',
        id: 1
    },
    {
        title: 'цепь',
        name: 'Shimano',
        id: 2
    },
    {
        title: 'цепь',
        name: 'Sram',
        id: 3
    },
]

const frames = [
  {
      title: 'рама',
      name: 'Deli',
      id: 1
  },
  {
      title: 'рама',
      name: 'BXT',
      id: 2
  },
  {
      title: 'рама',
      name: 'NS',
      id: 3
  },
]

    
  return (
    <section className="maintenance">
      <h1 className='maintenance__header'>Раздел для отслеживания пробега различных компонентов велосипеда и проведения своевременного ТО</h1>
      <div className="maintenance__content-wrapper">
        <div className="maintenance__parts-categories">
          <BikePartsCategories />
        </div>
      <div className="maintenance__parts-list">  
        <Routes>
          <Route path='chains' element={<BikePartsList parts={chains} />}/>
          <Route path='wheels' element={<BikePartsList />}/>
          <Route path='frames' element={<BikePartsList parts={frames} />}/>
          <Route path='tires' element={<BikePartsList />}/>
          <Route path='bb' element={<BikePartsList />}/>
          <Route path='chainrings' element={<BikePartsList />}/>
        </Routes>
      </div>
      </div>
    </section>
  )
}

