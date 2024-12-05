import { Account } from "../account";

export interface Follow {
  followId: string;
  status: string;
  followee: Account;
  follower: Account;
}
