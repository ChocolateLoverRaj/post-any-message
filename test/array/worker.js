/* eslint-env worker */
import { encode } from '../../lib/index.js'

const { value, ports } = encode([1, 2, 3])

postMessage(value, { transfer: ports })
