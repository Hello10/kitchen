import { get, capitalize } from 'lodash'

import Resolver from './Resolver'

export class ModelResolver extends Resolver {
  get model () {
    return this.getModel(this.name)
  }

  getModel (name) {
    return this.models[name]
  }

  load ({collection, path}) {
    return (request)=> {
      const loader = request.context.getLoader(collection)
      const id = get(request, path)
      return id ? loader.load(id) : null
    }
  }

  loadMany ({collection, path}) {
    return (request)=> {
      const loader = request.context.getLoader(collection)
      const ids = get(request, path)
      return ids.length ? loader.loadMany(ids) : []
    }
  }

  resolveType (getType) {
    return (request)=> {
      const type = getType(request)
      return request.info.schema.getType(type)
    }
  }

  addSessionUserId (key) {
    return ({data, context})=> {
      return {
        ...data,
        [key]: context.user.id
      }
    }
  }

  pass ({obj, info}) {
    const attr = info.fieldName
    return obj[attr]
  }

  polyRef ({obj, info, context}) {
    const {fieldName: name} = info
    const type = obj[`${name}_type`]
    const id = obj[`${name}_id`]
    if (!(type && id)) {
      return null
    }
    const Loader = context.getLoader(type)
    return Loader.load(id)
  }

  ///////////////////////
  // Generic Resolvers //
  ///////////////////////

  exists = this._toCollection('exists')
  list   = this._toCollection('list')
  create = this._wrapToCollection('create')
  update = this._wrapToCollection('update')
  delete = this._wrapToCollection('delete')

  get = this.load({
    collection: this.name,
    path: 'args.id'
  })

  _toCollection (method) {
    return (request)=> {
      return this.collection[method](request.args)
    }
  }

  _wrapToCollection (method) {
    const cmethod = capitalize(method)
    const before = `before${cmethod}`
    const after = `after${cmethod}`

    return async (request)=> {
      const {args = {}} = request

      let {data} = args
      if (this[before]) {
        data = await this[before]({...request, data})
      }

      let doc = await this.collection[method]({...args, data})
      if (this[after]) {
        const result = await this[after]({...request, data, doc})
        if (result !== undefined) {
          doc = result
        }
      }

      return doc
    }
  }
}

export default ModelResolver