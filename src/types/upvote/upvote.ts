import { Account } from "../account"
import { Post } from "../post/post"

export type Upvote = {
  upvoteId: string,
  account: Account,
  post: Post
}