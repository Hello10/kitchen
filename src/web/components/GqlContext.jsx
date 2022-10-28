import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

async function makeGqlRequest({ query, headers = {}, variables = {}}) {
  try {
      const response = await global.fetch('/api/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
    const json = await response.json()
    return json.data
  } catch (error) {
    // TODO: pull out gql error code
    console.error('Error making gql request', error)
    throw error
  }
}

export const GqlContext = createContext()

export function useGqlContext() {
  return useContext(GqlContext)
}

export function GqlProvider({ getToken = ()=> { return null }, children }) {
  const context = {
    getToken
  }

  return (
    <GqlContext.Provider value={context}>
      {children}
    </GqlContext.Provider>
  )
}

export function useGql({
  query,
  mutation,
  headers = {},
  variables = {}
}) {
  const [fetching, setFetching] = useState(!!query)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const { getToken } = useGqlContext()

  async function fetch({ variables: fetchVariables = {}} = {}) {
    setData(null)
    setError(null)
    setFetching(true)
    const token = await getToken()
    const auth = `Bearer ${token}`
    try {
      const data = await makeGqlRequest({
        query: query || mutation,
        variables: {
          ...variables,
          ...fetchVariables
        },
        headers: {
          'Authorization': auth,
          ...headers,
        }
      })
      setData(data)
      setFetching(false)
      return data
    } catch (error) {
      setError(error)
      setFetching(false)
    }
  }

  useEffect(()=> {
    if (query) {
      fetch()
    }
  }, [])

  return {
    fetching,
    fetch,
    data,
    error,
  }
}
