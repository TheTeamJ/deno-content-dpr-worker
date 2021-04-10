import { assertEquals } from 'https://deno.land/std@0.92.0/testing/asserts.ts'
import { handleRequest } from '../index.ts'

const imageUrls = {
  retina: 'https://raw.githubusercontent.com/TheTeamJ/deno-content-dpr-worker/main/sample/retina_pancake.png'
}

Deno.test('"Content-DPR" is included in response headers.', async () => {
  const res = await handleRequest(imageUrls.retina)
  const headers = res.headers
  assertEquals(headers.get('Content-DPR'), '2')
  assertEquals(headers.get('X-Width'), '1102')
  assertEquals(headers.get('X-Height'), '994')
})
