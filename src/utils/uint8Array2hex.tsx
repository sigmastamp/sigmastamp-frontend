export function uint8Array2hex(uint8Array: Uint8Array) {
  return [...uint8Array].map(x => x.toString(16).padStart(2, '0')).join('');
}
