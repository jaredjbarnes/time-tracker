import { findOrThrow, getOrThrow } from '@neo/commons/utils/hex/utils';

test('findOrThrow', () => {
  const things: string[] = ['a', 'b', 'c'];
  const b = findOrThrow(things, t => t === 'b');
  expect(b).toBe('b');

  expect(() => findOrThrow(things, t => t === 'd')).toThrow();
});

test('getOrThrow', () => {
  const myMap = new Map<string, string>();
  myMap.set('a', 'a');
  const a = getOrThrow(myMap, 'a');
  expect(a).toBe('a');

  expect(() => getOrThrow(myMap, 'b')).toThrow();
});
