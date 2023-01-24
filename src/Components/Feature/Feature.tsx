import React from 'react'


interface FeatureProps {
  feature: any
}

export default function Feature({feature}: FeatureProps) {
  return (
    <p className='feature__text'>{feature.text}</p>
  )
}
