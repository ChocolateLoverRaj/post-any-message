/* eslint-env worker */
import { encode } from '../../lib/index.js'

const { value, ports } = encode(3)

postMessage(value, { transfer: ports })
