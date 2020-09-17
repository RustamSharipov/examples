import { useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { Content, Footer, Wrapper } from '.'

import { ConnectedComponent } from 'types'

const MapView: ConnectedComponent = ({ shortPlacesStore, placesMapState, rootState }) => {
  const { showPreloader, hidePreloader, placeType, setPlaceType } = rootState
  const { isFetched, isFetchedAll, all } = shortPlacesStore
  const { isCreated, isMapLoaded, init, update, clear } = placesMapState

  useEffect(() => {
    if (!placeType) setPlaceType('restaurant')

    return () => {
      showPreloader()
      clear()
    }
  }, [])

  useEffect(() => {
    if (isFetched) {
      init(all())
    }
  }, [isFetched])

  useEffect(() => {
    if (isFetchedAll) {
      update(all())
    }
  }, [isFetchedAll])

  useEffect(
    () => {
      if (isCreated) {
        hidePreloader()
      }
    },
    [isCreated],
  )

  return (
    <Wrapper>
      <Content />
      <Footer />
    </Wrapper>
  )
}

export default inject('shortPlacesStore', 'placesMapState', 'rootState')(observer(MapView))
