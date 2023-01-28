import React from 'react'

interface BikesTypeFilter {
  toggleBikesFilter: () => void
}

export default function BikesTypeFilter({toggleBikesFilter}: BikesTypeFilter) {



  return (
    <div className='type-filter'>
      <label className='type-filter__label'>
        Показать только велостанки
      <input type='checkbox' className='type-filter__checkbox' value='off' onChange={toggleBikesFilter}/>
      </label>
    </div>
  )
}
