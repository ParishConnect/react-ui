export const createS3 = () => ({
  load: (source, load, error, progress, abort, headers) => {
    const url = `https://cdn.parishconnect.io/${source}`

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'

    xhr.addEventListener('progress', e => {
      progress(e.lengthComputable, e.loaded, e.total)
    })

    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        headers(xhr.getAllResponseHeaders())
        load(xhr.response)
        return
      }

      error('oh no!')
    }

    xhr.send()

    return {
      abort: () => {
        abort()
      }
    }
  }
})
