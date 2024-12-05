import { Account } from "../account";

export interface Notification {
  notificationId: string;
  title: string;
  message: any;
  createdDate: string;
  account: Account;
  read: boolean;
}