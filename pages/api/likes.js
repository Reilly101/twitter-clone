import prisma from 'lib/prisma'
import { getLikes } from 'lib/data.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(501).end()
  }

  const tweetId = parseInt(req.query.tweetId)



  const likes = await getLikes(tweetId, prisma)
  res.json(likes)
}