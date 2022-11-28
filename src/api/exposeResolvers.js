import {merge} from 'lodash'
import { parse } from 'graphql'

export function exposeResolvers ({resolvers: resolverClasses, logger, options}) {
  const resolvers = {}
  const resolverTypeDefs = []
  for (const [name, Resolver] of Object.entries(resolverClasses)) {
    logger.debug(`Exposing resolver ${name}`)
    const resolver = new Resolver(options)
    merge(resolvers, resolver.expose())
    resolverTypeDefs.push(resolver.typeDefs())
  }

  const typeDefs = resolverTypeDefs.join('\n')

  return {
    resolvers,
    typeDefs
  }
}

export default exposeResolvers
