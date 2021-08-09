import moment from 'moment'
import { configure } from 'japa'

moment.suppressDeprecationWarnings = true

configure({
    files: ['src/tests/*.test.ts'],
    bail: true
})
