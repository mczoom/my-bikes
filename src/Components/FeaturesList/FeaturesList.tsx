import React from 'react'
import Feature from '../Feature/Feature'

export default function FeaturesList() {

  const features = [
    {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla fringilla dapibus. Aliquam bibendum, metus non faucibus auctor, sapien ligula vulputate elit, ut mollis nulla eros quis eros. Mauris ut risus at nisl gravida viverra. Donec id neque leo. Donec in orci cursus, congue augue nec, feugiat velit. Praesent porttitor sapien quis quam ornare, eget posuere massa posuere. Donec ornare erat vitae urna facilisis molestie.',
      'img': ''
    },
    {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla fringilla dapibus. Aliquam bibendum, metus non faucibus auctor, sapien ligula vulputate elit, ut mollis nulla eros quis eros. Mauris ut risus at nisl gravida viverra. Donec id neque leo. Donec in orci cursus, congue augue nec, feugiat velit. Praesent porttitor sapien quis quam ornare, eget posuere massa posuere. Donec ornare erat vitae urna facilisis molestie.',
      'img': ''
    },
    {
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla fringilla dapibus. Aliquam bibendum, metus non faucibus auctor, sapien ligula vulputate elit, ut mollis nulla eros quis eros. Mauris ut risus at nisl gravida viverra. Donec id neque leo. Donec in orci cursus, congue augue nec, feugiat velit. Praesent porttitor sapien quis quam ornare, eget posuere massa posuere. Donec ornare erat vitae urna facilisis molestie.',
      'img': ''
    }
  ]

  return (
    <ul className='access-page__features-list'>
      {features.map((feature, i: number) => (
        <li key={i} className='access-page__feature'>
          <Feature feature={feature} />
        </li>
      ))}
    </ul>
  )
}
