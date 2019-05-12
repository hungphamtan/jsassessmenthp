import { store, load } from './index';
describe('Data Store', () => {
	describe('Data Store load emtpy array', () => {
		test('store return empty string for falsy value', () => {
      const array = null;
      const expected = '';
      const text = store(array);

      expect(text).toEqual(expected);
    });
	});
	test('store return empty string for emty array', () => {
    const array = [];
    const expected = '';
		const text = store(array);
	
    expect(text).toEqual(expected);
  });
  test('store return a string-type based format when data are valid array', () => {
    const array = [{ key1: 'value1', key2: 'value2' }, { keyA: 'valueA' }];
    const expected = 'key1=value1;key2=value2\nkeyA=valueA';
    const text = store(array);
    expect(text).toEqual(expected);
  });
});

describe('Data Load', () => {
	test('load a empty string-type text should return a empty array', () => {
    const text = '';
    const expected = [];
    const result = load(text);
    expect(result).toEqual(expected);
  });
  test('load a valid string-type text', () => {
    const text = 'key1=value1;key2=value2\nkeyA=valueA';
    const expected = [{ key1: 'value1', key2: 'value2' }, { keyA: 'valueA' }];
    const result = load(text);
    expect(result).toStrictEqual(expected);
  });

  test('load a valid specific charcacter like `=` ', () => {
    const text = 'key1=value1=;key2=value2;';
    const expected = 'value1=';
    const result = load(text);
    expect(result[0]['key1']).toBe(expected);
  });
});
