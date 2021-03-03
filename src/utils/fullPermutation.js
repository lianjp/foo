const fullPermutation = arr => {
  if (arr.length === 0) {
    return [[]]
  }
  const firstmatrix = arr[0]
  const restmatix = arr.slice(1)
  const restResult = fullPermutation(restmatix)
  const result = []
  let piece = []
  for (const v1 of firstmatrix) {
    for (const v2 of restResult) {
      piece = Array.isArray(v2) ? [v1, ...v2] : [v1, v2]
      result.push(piece)
      piece = []
    }
  }
  return result
}
export default fullPermutation
