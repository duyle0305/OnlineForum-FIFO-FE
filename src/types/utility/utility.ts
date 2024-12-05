import { Account } from "../account"
import { Category } from "../category/category"
import { Post } from "../post/post"
import { Topic } from "../topic/topic"

export type CategorySearch = {
  accountList: Account[]
  categoryList: Category[]
  topicList: Topic[]
  postList: Post[]
}