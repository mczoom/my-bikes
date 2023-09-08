import logo from '../../images/logo.png'


interface FeatureProps {
  feature: any
  i: number
}

export default function Feature({feature, i}: FeatureProps) {

  const featureClassName = `feature ${ i % 2 === 0 ? '' : 'feature_reverse' }`;

  return (
    <div className={featureClassName}>
      <img src={logo} className='feature_image'></img>
      <p className='feature__text'>{feature.text}</p>
    </div>
  )
}
