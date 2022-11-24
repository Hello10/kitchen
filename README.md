# SCRAPS


## Find right way to generalize this
```js

import React, {Children, cloneElement, isValidElement} from 'react'

function withProps({props, children}) {
  return Children.map(children, (child) => {
    const valid = isValidElement(child)
    return valid ? cloneElement(child, {data, ...props}) : child
  })
}

```