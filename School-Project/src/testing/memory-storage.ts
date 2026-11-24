/**
 * A tiny fake localStorage that keeps everything in memory. ONLY used by the tests.
 *
 * Why: Node 25 has its own built-in localStorage that does not work in tests without extra
 * settings, and it hides the browser-like one. In a real browser this file is not used.
 *
 * Use it in a test like this:  vi.stubGlobal('localStorage', new MemoryStorage());
 */
export class MemoryStorage {
  private readonly data = new Map<string, string>();

  get length(): number {
    return this.data.size;
  }

  clear(): void {
    this.data.clear();
  }

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.data.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  setItem(key: string, value: string): void {
    this.data.set(key, String(value));
  }
}
