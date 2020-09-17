import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import { Detail, Wrapper } from '.'

import { ConnectedComponent } from 'types'
import { useEffect } from 'react'

const Content: ConnectedComponent = ({ placesStore, placeState, rootState, router }) => {
  const { showPreloader, hidePreloader, placeType, setPlaceType } = rootState
  const { isFetched, one, fetch } = placesStore
  const { init, clear } = placeState
  const { id, place, view } = router.query

  useEffect(() => {
    if (!placeType) setPlaceType(place)

    return () => {
      showPreloader()
      clear()
    }
  }, [])

  useEffect(() => {
    if (isFetched) {
      init(
        one(id),
        view,
      )
      hidePreloader()
    }

    else {
      fetch([id])
    }
  }, [isFetched])

  return (
    <Wrapper>
      <Detail />
    </Wrapper>
  )
}

export default withRouter(inject('placesStore', 'placeState', 'rootState')(observer(Content)))
