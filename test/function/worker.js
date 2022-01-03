/* eslint-env worker */
import { encode } from '../../lib/index.js'

const { value, ports } = encode((a, b) => a + b)

postMessage(value, { transfer: ports })
