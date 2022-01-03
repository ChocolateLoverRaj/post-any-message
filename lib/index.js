export const encode = value => {
  const newValue = {}
  const ports = []
  if (typeof value === 'function') {
    newValue.type = 'function'
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = e => {
      const args = decode(e.data)
      const returnValue = value(...args)
      const { value: newValue, ports } = encode(returnValue)
      e.ports[0].postMessage(newValue, { transfer: ports })
    }
    newValue.value = messageChannel.port2
    ports.push(messageChannel.port2)
  } else if (typeof value === 'object') {
    if (value instanceof Array) {
      newValue.type = 'array'
      newValue.value = value.map(value => {
        const { value: newValue, ports: subPorts } = encode(value)
        ports.push(...subPorts)
        return newValue
      })
    } else {
      newValue.type = 'object'
      newValue.value = Object.fromEntries(Object.entries(value).map(([key, value]) => {
        const { value: newValue, ports: subPorts } = encode(value)
        ports.push(...subPorts)
        return [key, newValue]
      }))
    }
  } else {
    newValue.type = 'primitive'
    newValue.value = value
  }
  return { value: newValue, ports }
}

export const decode = transferredApi => {
  const { type, value } = transferredApi
  if (type === 'primitive') {
    return value
  } else if (type === 'function') {
    return async (...args) => await new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel()
      messageChannel.port1.addEventListener('messageerror', reject, { once: true })
      messageChannel.port1.addEventListener('message', e => {
        resolve(decode(e.data))
      }, { once: true })
      messageChannel.port1.start()
      const { value: encodedArgs, ports } = encode(args)
      value.postMessage(encodedArgs, [messageChannel.port2, ...ports])
    })
  } else if (type === 'array') {
    return value.map(value => decode(value))
  } else if (type === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, decode(value)]))
  } else {
    console.log(transferredApi)
    throw new Error(`Cannot handle data with type: '${type}'`)
  }
}
