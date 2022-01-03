/* eslint-env worker */
import { encode } from '../../lib/index.js'

const { value, ports } = encode({
  prime: true,
  palindrome: false
})

postMessage(value, { transfer: ports })
