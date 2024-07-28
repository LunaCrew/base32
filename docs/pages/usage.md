# Usage

## Installation

```bash
npm install @lunacrew/base32
```

## How to use

### Convenience Functions

```ts
import { Base32 } from '@lunacrew/base32';

/**
 * Convenience encoder.
 *
 * @param {string} input - The string to encode.
 * @param {Alphabet} [type] - The alphabet type to use for encoding. Defaults to 'rfc4648'.
 * @param {boolean} [lowercase] - Use lower-case alphabet. Defaults to false.
 * @returns {Buffer} The encoded string as a Buffer.
 */

const encoded = Base32.encode('Hello World!');
console.log(encoded); // JBSWY3DPEBLW64TMMQQQAA==

/**
 * Convenience decoder.
 *
 * @param {string} input - The base32 encoded string to decode.
 * @param {CharMap} [type] - The character map type to use for decoding. Defaults to 'rfc4648'.
 * @returns {Buffer} The decoded data as a Buffer.
 */

const decoded = Base32.decode(encoded);
console.log(decoded); // Hello World!
```

### Class Interface

```ts
import { Encoder, Decoder } from '@lunacrew/base32';

/**
 * Create a new `Encoder` with the given options.
 *
 * @param {string} [type] The alphabet type to use for encoding. Default is 'rfc4648'.
 * @param {boolean} [lowercase] Use lower-case alphabet. Default is false.
 * @constructor
 */

const encoder = new Encoder();
const encoded = encoder.encode('Hello World!');
console.log(encoded); // JBSWY3DPEBLW64TMMQQQAA==

/**
* Create a new `Decoder` with the given options.
*
* @param {string} [type] The charmap type to use for encoding. Default is 'rfc4648'.
* @constructor
*/

const decoder = new Decoder();
const decoded = decoder.decode(encoded);
console.log(decoded); // Hello World!
```
