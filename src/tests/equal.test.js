import { filterExpression, calculate } from "./equal";

test('filterExpression 3 + 4 - 2 x 4 / 2', () => {
    expect(filterExpression('3+4-2x4/2')).toEqual(["3", "+", "4", "-", "2", "x", "4", "/", "2"]);
});

test('filterExpression 5 x - 5', () => {
    expect(filterExpression('5x-5')).toEqual(["5", "x", "-5"]);
});

test('filterExpression 5 x - + 5', () => {
    expect(filterExpression('5x-+5')).toEqual(["5", "+", "5"]);
});

test('calculate 1 + 2', () => {
    expect(calculate('1+2')).toBe('3');
});

test('calculate 3 + 5', () => {
    expect(calculate('3+5')).toBe('8');
});

test('calculate 2 * + 3', () => {
    expect(calculate('2x+3')).toBe('5');
});

test('calculate 5 x - 5', () => {
    expect(calculate('5x-5')).toBe('-25');
});

test('calculate 3 + 2 - 1 x 4', () => {
    expect(calculate('3+2-1x4')).toBe('16');
});

test('calculate 10.5 - 5.5', () => {
    expect(calculate('10.5-5.5')).toBe('5');
});

test('calculate 3 + 4 - 2 x 4 / 2', () => {
    expect(calculate('3+4-2x4/2')).toBe('10');
});