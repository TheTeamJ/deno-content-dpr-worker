import { assertEquals } from 'https://deno.land/std@0.92.0/testing/asserts.ts'
import { handleRequest } from '../index.ts'

Deno.test('"Content-DPR" is included in response headers', async () => {
  console.log(handleRequest)
})
