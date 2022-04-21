import { GiftEntity } from "./gift.entity";

export type CreateGiftReq = Omit<GiftEntity, 'id'>;//Weź GiftEntity i usuń z niego klucz

export interface GetSingleGiftRes {
    gift: GiftEntity;
    givenCount: number;
}