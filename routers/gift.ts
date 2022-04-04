import {Router, Response, Request} from "express";
import {GiftRecord} from "../records/gift.record";
import { CreateGiftReq } from "../types";
import { ValidationError } from "../utils/errors";

export const giftRouter = Router();

giftRouter

    .get('/', async (req: Request, res: Response) => {
        const giftsList = await GiftRecord.listAll();

        res.json({
            giftsList,
        });
    })

    .delete('/:id', async (req, res) => {
        const gift = await GiftRecord.getOne(req.params.id);

        if (!gift) {
            throw new ValidationError('No such gift');
        }

        if (await gift.countGivenGifts() > 0) {
            throw new ValidationError('Cannot remove given gift');
        }
        await gift.delete();
        res.end();
    })

    .post('/', async (req: Request, res: Response) => {
        const data: CreateGiftReq = req.body
        const newGift = new GiftRecord(data);
        await newGift.insert();
        res.json(newGift);
    });

