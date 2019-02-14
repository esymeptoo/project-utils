import ERest from './rest'
import normalHttp from './fetch'

const rest = new ERest({
  baseUrl: 'https://www.wozaihui.com/',
  adapter: normalHttp,
})

rest.get('/api/v1/', {
  params: {
    name: 'zc',
  },
  cache: 'no-cache',
})
