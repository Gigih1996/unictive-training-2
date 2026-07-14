import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true,
      }
    }

    // Try to get the requested asset
    let response = await getAssetFromKV(event, options).catch(() => null)

    // If asset not found, fall back to index.html and include query string
    if (!response) {
      options.mapRequestToAsset = req => {
        // Redirect to index.html with original query string
        const newUrl = new URL(req.url)
        newUrl.pathname = '/index.html'
        return new Request(newUrl.toString(), req)
      }
      response = await getAssetFromKV(event, options)
    }

    // Set security headers
    response.headers.set("X-XSS-Protection", "1; mode=block")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("Referrer-Policy", "unsafe-url")
    response.headers.set("Feature-Policy", "none")

    return response

  } catch (e) {
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })
        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}
