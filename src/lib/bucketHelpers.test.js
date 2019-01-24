import { addBucket, findById, toggleBucket } from './bucketHelpers';

test('addBucket should not mutate the existing bucket array', () => {
  const startBucket = [
    {id: 1, name: 'one', isComplete: false},
    {id: 2, name: 'two', isComplete: false}
  ]
  const newBucket = {id: 3, name: 'three', isComplete: false}
  const expected = [
    {id: 1, name: 'one', isComplete: false},
    {id: 2, name: 'two', isComplete: false},
    {id: 3, name: 'three', isComplete: false}
  ]
  const result = addBucket(startBucket, newBucket)

  expect(result).not.toBe(startBucket)
});

test('findById should return the expected item from an array', () => {
  const startBucket = [
    {id: 1, name: 'one', isComplete: false},
    {id: 2, name: 'two', isComplete: false},
    {id: 3, name: 'three', isComplete: false}
  ]
  const expected = {id: 2, name: 'two', isComplete: false}
  const result = findById(2, startBucket)
  expect(result).toEqual(expected)
});

test('toggleBucket should toggle the isComplete prop of a bucket', () => {
  const startBucket = {id: 2, name: 'two', isComplete: false}
  const expected = {id: 2, name: 'two', isComplete: true}
  const result = toggleBucket(startBucket)
  expect(result).toEqual(expected)
});

test('toggleBucket should not mutate the original bucket', () => {
  const startBucket = {id: 2, name: 'two', isComplete: false}
  const result = toggleBucket(startBucket)
  expect(result).not.toBe(startBucket)
});
