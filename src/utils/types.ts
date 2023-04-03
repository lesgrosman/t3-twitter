import { Comment, Tweet, TweetLike, User } from '@prisma/client'

export type TweetType = Tweet & {
  comments?: Comment[]
  author: User
  likes?: TweetLike[]
}
