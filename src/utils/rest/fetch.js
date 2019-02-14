export default async function normalHttp(config) {
  const response = await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.data,
  })

  const finalResponse = {
    config,
    ko: response.ok,
    data: null,
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  }

  const contentType = response.headers.get('content-type')
  if (/application\/json/.test(contentType)) {
    finalResponse.data = await response.json()
  } else if (/text\/.+/.test(contentType)) {
    finalResponse.data = await response.text()
  } else {
    let data
    try {
      data = await response.json()
      if (!data) data = await response.text()
    } catch (e) {} finally {
      finalResponse.data = data
    }
  }
  return finalResponse
}
