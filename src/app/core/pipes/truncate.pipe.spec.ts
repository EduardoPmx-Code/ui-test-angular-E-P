import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original string if length is less than the limit', () => {
    const value = 'Short string';
    const result = pipe.transform(value, 20);
    expect(result).toBe(value);
  });

  it('should truncate the string if length exceeds the limit', () => {
    const value = 'This is a longer string that needs to be truncated';
    const result = pipe.transform(value, 10);
    expect(result).toBe('This is a ...');
  });

  it('should append "..." if the string is truncated', () => {
    const value = 'Another long string';
    const result = pipe.transform(value, 7);
    expect(result).toBe('Another...');
  });

  it('should return an empty string if the input value is null or undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should use the default limit of 100 if no limit is provided', () => {
    const value = 'This is a string that is intentionally made very long to test the default truncation behavior of the pipe.';
    const result = pipe.transform(value);
    expect(result).toBe('This is a string that is intentionally made very long to test the default truncation behavior of the...');
  });
});
