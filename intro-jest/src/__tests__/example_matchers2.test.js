describe('matchers', () => {
    test('toBe', () => {
        expect(true).toBe(true);
    });

    test('toEqual', () => {
        const data = { one: 1 };
        data['two'] = 2;
        expect(data).toEqual({
            one: 1,
            two: 2
        });

        const arra = ['one', 'two'];
        expect(arra).toEqual(['one', 'two']);
    });

    test('not', () => {
        expect(true).not.toBe(false);
    });

    test('string not match', () => {
        expect('team').not.toMatch(/I/);
    });

    test('string match', () => {
        expect('William').toMatch('ill');
    });

});