/**
 * Merges class name strings, filtering out falsy values.
 * Lightweight alternative to clsx for simple use cases.
 *
 * @example
 * cn('foo', condition && 'bar', undefined) // => 'foo bar'
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
