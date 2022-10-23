import { useRouter} from 'next/router'

// TODO: support named routes?
export function useNavigate() {
  const router = useRouter()
  return (path) => {
    const current = router.asPath
    if (current !== path) {
      router.push(path)
    }
  }
}

export function useRouterQuery() {
  const router = useRouter()
  return router.query
}