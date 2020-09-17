import Lottie from 'react-lottie'

import animationData from './assets/planetAnimation.json'

const Animation = () => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <Lottie
      options={options}
      height={200}
      width={200}
    />
  )
}

export default Animation
