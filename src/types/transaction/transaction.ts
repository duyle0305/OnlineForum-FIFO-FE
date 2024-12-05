import { Pack } from "../pack/pack";
import { Post } from "../post/post";
import { RedeemDocument } from "../redeem/redeem";

export type Transaction = {
    transactionId: string;
    amount: number;
    type: string;
    createdDate: string
    reward: RedeemDocument
    transactionType: string
};

export type DailyPointTransaction = {
    dailyPointId: string,
    pointEarned: number,
    createdDate: string
    post: Post
}

export type BonusPoint = {
    dailyPointId: string,
    pointEarned: number,
    createdDate: string
    post: Post
}

export type OrderPointTransaction = { 
    orderId: string
    amount: number;
    method: string;
    status: string;
    orderDate: string;
    monkeyCoinPack: Pack
}

export type FilterTransaction = {
    transactionList: Transaction[];
    dailyPointList: DailyPointTransaction[];
    bonusPoint: BonusPoint[];
    orderPointList: OrderPointTransaction[];
};