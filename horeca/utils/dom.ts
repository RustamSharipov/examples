export const getTouchCoords = (event) => {
  const touch = event.touches[0]

  if (touch) {
    const { clientX, clientY } = touch
    return [clientX, clientY]
  }

  return []
}
