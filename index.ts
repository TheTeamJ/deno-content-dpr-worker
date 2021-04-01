import { parsePngFormat } from 'https://raw.githubusercontent.com/daiiz/deno-png-dpi-reader-writer/master/mod.ts'
const { Buffer } = Deno

async function handleRequest(srcUrl: string) {
  if (!srcUrl) {
    return new Response('', { status: 400 })
  }
  let res
  try {
    res = await fetch(srcUrl)
  } catch (err) {
    return new Response('', { status: 400 })
  }

  try {
    const contentType = res.headers.get('content-type')
    const contentDpr = res.headers.get('content-dpr')
    if (contentDpr || !contentType || !(/^image\/png/.test(contentType))) {
      return res
    }

    console.log("####", Deno.Buffer)
    console.log("####", Deno)
    console.log("###", Buffer)
    const buf: any = Buffer.from(await res.arrayBuffer())
    const { width, height, dpi } = await parsePngFormat(buf)

    const headers: any = {
      'Access-Control-Allow-Origin': '*',
      'Content-DPR': dpi && dpi >= 72 ? dpi / 72 : 1,
      'Content-Type': 'image/png',
    }
    if (width && height) {
      headers['X-Width'] = width
      headers['X-Height'] = height
      headers['Access-Control-Expose-Headers'] = 'X-Width, X-Height'
    }

    return new Response(buf, { headers })
  } catch (err) {
    console.error(err)
  }

  return res
}

// const main = async () => {
//   const res = await handleRequest('https://i.gyazo.com/7127a0c2a987ea50dbba0ebd6455c206.png')
//   console.log(res)
// }

addEventListener('fetch', event => {
  const req = event.request
  const params = (new URL(req.url)).searchParams
  const src: string = params.get('src') || ''
  event.respondWith(handleRequest(src))
})
