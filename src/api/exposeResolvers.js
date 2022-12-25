import {merge} from 'lodash'
// import { parse } from 'graphql'

export function exposeResolvers ({controllers, logger, options}) {
  const resolvers = {}
  const resolverTypeDefs = []
  for (const [name, Controller] of Object.entries(controllers)) {
    logger.debug(`Exposing controller ${name}`)
    const controller = new Controller(options)
    merge(resolvers, controller.expose())
    resolverTypeDefs.push(controller.typeDefs())
  }

  const typeDefs = resolverTypeDefs.join('\n')

  return {
    resolvers,
    typeDefs
  }
}

export default exposeResolvers
