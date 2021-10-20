import React, { useState } from 'react'

export const useField = (type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = e => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const inputConfig = () => {
    return {
      value,
      type,
      onChange
    }
  }

  return {
    value,
    type,
    onChange,
    reset,
    inputConfig
  }
}