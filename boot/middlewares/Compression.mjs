import compression from 'compression'
import configuration from '../../config/compression.mjs'

const DEFAULT_CONTENT_TYPE = ['json', 'text']
const DEFAULT_THRESHOLD = 1024
const DEFAULT_LEVEL = 6

export default () => {
  return compression({
    // eslint-disable-next-line func-names
    filter: function (request, response) {
      const contentTypesAllowedToCompress = configuration['content-type'] || DEFAULT_CONTENT_TYPE
      const responseContentType = response.getHeader('Content-Type')
      const pattern = new RegExp(contentTypesAllowedToCompress.join('|'), 'gi')

      return !!pattern.exec(responseContentType)
    },
    threshold: configuration.threshold || DEFAULT_THRESHOLD,
    level: configuration.level || DEFAULT_LEVEL
  })
}
