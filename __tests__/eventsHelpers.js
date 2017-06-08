function createClientXY(x, y) {
  return {pageX: x, pageY: y};
}

export function createStartTouchEventObject({x=0, y=0}) {
  return {touches: [createClientXY(x, y)]};
}

export function createMoveTouchEventObject({x=0, y=0}) {
  return {touches: [createClientXY(x, y)]};
}
