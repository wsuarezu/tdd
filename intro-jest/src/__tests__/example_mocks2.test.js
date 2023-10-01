import { storage } from "../lib/storage";
import { saveUsername, getUsername } from "../user";

jest.mock('../lib/storage');

test('first example', () => {
    const myMock = jest.fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce('Hello world')
        .mockReturnValueOnce(5);

    //console.log(myMock);

    const resutl1 = myMock();
    const resutl2 = myMock();
    const resutl3 = myMock();

    //expect(myMock).toHaveBeenCalled();
    expect(myMock).toHaveBeenCalledTimes(3);
    expect(resutl1).toBe(true);
    expect(resutl2).toBe('Hello world');
    expect(resutl3).toBe(5);
});

test('Debe de llamar al método save', () => {
    //console.log({ storage });
    const username = 'William Suárez';
    saveUsername(username);
    expect(storage.save).toHaveBeenCalledTimes(1);
    expect(storage.save).toHaveBeenCalledWith({
        key: 'username',
        value: username
    });
});

test('should have called to method get', () => {
    const username = 'William Suárez';
    storage.get.mockReturnValueOnce(username);
    const result = getUsername();

    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(result).toBe(username);
    expect(storage.get).toHaveBeenCalledWith({
        key: 'username'
    })
})