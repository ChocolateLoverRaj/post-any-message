/* eslint-env worker */
import { encode } from '../../lib/index.js'

const { value, ports } = encode(true)

postMessage(value, { transfer: ports })
