export const isSuccessful = code => {
  return code >= 1 && code < 4000
}
export const isError = code => {
  return (code >= 4000 && code <= 6000) || code === 0
}

export const codeStatus = code => {
  if (isSuccessful(code)) {
    return 'success'
  }
  if (isError(code)) {
    return 'error'
  }
}

export default {
  isSuccessful,
  isError,
  codeStatus
}
