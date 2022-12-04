import { expectAll } from '../../shared/expects'

import { getSubdomain, makeGetSubdomainApp } from './domains'

describe('getSubdomains', () => {
  it('gets subdomain from hostname', () => {
    const result = getSubdomain('foo.bar.baz.com')
    expect(result).toBe('foo.bar')
  })

  it('handles localhost', () => {
    const result = getSubdomain('foo.localhost')
    expect(result).toBe('foo')
  })

  it('returns empty string when no subdomain', () => {
    let result = getSubdomain('foo.com')
    expect(result).toBe('')

    result = getSubdomain('com')
    expect(result).toBe('')
  })
})

describe('makeGetSubdomainApp', () => {
  const MainApp = 'MainApp'
  const FooApp = 'FooApp'
  const BarApp = 'BarApp'

  const map = [
    {
      subdomains: ['dev', 'www'],
      app: MainApp,
      main: true
    },
    {
      subdomains: ['dev.foo', 'foo'],
      app: FooApp
    },
    {
      subdomains: ['dev.bar', 'bar'],
      app: BarApp
    }
  ]


  it('gets subdomain from hostname', () => {
    const getSubdomainApp = makeGetSubdomainApp(map);
    expectAll({
      fn: getSubdomainApp,
      toBe: {
        'barf.com': MainApp,
        'dev.barf.com': MainApp,
        'www.barf.com': MainApp,
        'dev.foo.barf.com': FooApp,
        'foo.barf.com': FooApp,
        'dev.bar.barf.com': BarApp,
        'bar.barf.com': BarApp,
        'derp.barf.com': MainApp,
      }
    })
  })

  it('should throw in no main app', () => {
    expect(()=> {
      makeGetSubdomainApp(map.filter((item) => !item.main))
    }).toThrow('Must set')
  })
})
