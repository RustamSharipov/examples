import { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { useRouter } from 'next/router'

import { ConnectedComponent } from 'types'
import { LatLng } from 'types/map'

import routes from 'routes'

import { detectUserPosition } from 'utils/map'

const PlacesData: ConnectedComponent = ({ shortPlacesStore, rootState }) => {
  const router = useRouter()

  const {
    placeType,
    userPosition,
    setPlaceType,
    disableUserPositionDetecting,
    setUserPosition,
  } = rootState

  const {
    isFetched,
    isFetchedAll,
    fetchAround,
    fetchAll,
  } = shortPlacesStore

  const handleUserPositionDetectSuccess = (latLng: LatLng) => {
    setUserPosition(latLng)
  }

  useEffect(() => {
    const [homePath] = routes.home.all()

    if (homePath === router.asPath) {
      setPlaceType('restaurant')
    }

    detectUserPosition(
      handleUserPositionDetectSuccess,
      disableUserPositionDetecting,
    )
  }, [])

  useEffect(() => {
    if (!placeType && router.query.place) {
      setPlaceType(router.query.place)
    }
  }, [router.query.place])

  useEffect(() => {
    if (userPosition) {
      fetchAround(userPosition)
    }
  }, [userPosition])

  useEffect(() => {
    if (isFetched && !isFetchedAll) {
      setTimeout(
        () => {
          fetchAll(userPosition)
        },
        1000,
      )
    }
  }, [isFetched, isFetchedAll, userPosition])

  return null
}

export default inject('shortPlacesStore', 'rootState')(observer(PlacesData))
