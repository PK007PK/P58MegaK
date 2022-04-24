import { pool } from "../utils/db"
import {GiftRecord} from "./gift.record"

let gift: GiftRecord;

beforeAll(()=>{
    gift = new GiftRecord({
        name: "Tester",
        count: 123,
    })
});

afterAll(async ()=>{
    await pool.end();
})

test('Not inserted GiftRecord should has no ID', async () => {
    expect(gift.id).toBeUndefined();
})

test('Inserted GiftRecord should has ID', async () => {
    await gift.insert();
    expect(gift.id).toBeDefined();
})