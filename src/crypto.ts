// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// See utils.ts for details.
declare const globalThis: Record<string, any> | undefined;
const crypto =
  typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;

export function randomBytes(bytesLength = 32): Uint8Array {
  if (crypto && typeof crypto.getRandomValues === 'function') {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  }
  throw new Error('crypto.getRandomValues must be defined');
}

export function getWebcryptoSubtle() {
  if (crypto && typeof crypto.subtle === 'object' && crypto.subtle != null) return crypto.subtle;
  throw new Error('crypto.subtle must be defined');
}
