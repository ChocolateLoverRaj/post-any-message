/* eslint-env worker */
import { encode } from '../../lib/index.js'

const { value, ports } = encode('Hi')

postMessage(value, { transfer: ports })
