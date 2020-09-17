import { useRouter } from 'next/router'

import { MapControl } from 'components/shared'

import routes from 'routes'

const HomeControl = () => {
  const router = useRouter()
  
  const handleHome = () => {
    const [url, as] = routes.home.all()
    router.push(url, as)
  }

  return <MapControl onClick={handleHome} />
}

export default HomeControl
