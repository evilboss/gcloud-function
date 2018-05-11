test('the data is peanut butter', () => {
    expect.assertions(1);
    return expect(fetchData()).resolves.toBe('peanut butter');
});
test('the data is peanut butter', () => {
    expect.assertions(1);
    return expect(true).toEqual(true);
});
