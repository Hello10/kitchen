import {createSchema, createYoga} from 'graphql-yoga'

export function createYogaGqlServer({
  typeDefs,
  resolvers,
  buildContext
}) {
  const enableGraphiql = process.env.ENABLE_GRAPHIQL === 'true'

  const schema = createSchema({
    typeDefs,
    resolvers,
  })

  const buildContextFns = Array.isArray(buildContext) ? buildContext : [buildContext]

  return createYoga({
    schema,
    graphqlEndpoint: '/api/graphql',
    graphiql: enableGraphiql,
    context: async (context)=> {
      try {
        return buildContextFns.reduce((result, build)=>
          result.then(build)
        , Promise.resolve(context))
      } catch (error) {
        console.error('Error building context', error)
      }
      return context
    }
  })
}

export default createYogaGqlServer