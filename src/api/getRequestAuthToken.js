export function getRequestAuthToken(request) {
  console.log(request.headers)
  const header = request.headers.get('Authorization')
  if (!header?.length) {
    return null
  }
  const token = header.replace('Bearer ', '')
  return token
}

export default getRequestAuthToken