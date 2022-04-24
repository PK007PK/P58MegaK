import { ChildRecord } from "../records/child.record";

let child: ChildRecord;
beforeAll(async ()=>{
    child = await ChildRecord.getOne('777');
})

//Testowanie metody statycznej 
const myMock = jest
    .spyOn(ChildRecord, 'getOne')
    .mockImplementation(async (id: string) => {
        return new ChildRecord({
            id,
            name: "Testowy",
            giftId: "123",
        });
    })

test("Mock static test", async ()=>{
    console.log(child);
    
    expect(child).toBeDefined();
    expect(child.id).toEqual('777');
})

//Testowanie metody która nie jest statyczna

const myMock2 = jest
    .spyOn(ChildRecord.prototype, 'update')
    .mockImplementation(async () => {
    }) //ten update ma nie robić właśnie nic

test("Mock not static test", async ()=>{
    await child.update();
})