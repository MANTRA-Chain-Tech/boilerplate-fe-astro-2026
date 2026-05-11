import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('joins multiple class strings', () => {
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const active = true;
    const disabled = false;
    expect(cn('base', active && 'active', disabled && 'disabled')).toBe('base active');
  });

  it('returns an empty string when all values are falsy', () => {
    expect(cn(false, null, undefined)).toBe('');
  });

  it('handles a single class', () => {
    expect(cn('only')).toBe('only');
  });
});
