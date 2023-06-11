//  text-encoding-polyfill.js

import { TextEncoder, TextDecoder } from 'fast-text-encoding';

// Polyfill the global TextEncoder and TextDecoder objects if they are not available
if (typeof window !== 'undefined' && !window.TextEncoder) {
  window.TextEncoder = TextEncoder;
}
if (typeof window !== 'undefined' && !window.TextDecoder) {
  window.TextDecoder = TextDecoder;
}
