import React from 'react'
import cn from 'classnames'

export function Button({ className = '', children, loading, ...props }) {
  return (
    <button
      {...props}
      className={cn('underline text-s', className )}
    >
      { loading ? '...' : children }
    </button>
  )
}

export default Button