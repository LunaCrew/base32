import { Mappings, RFC4648, Crockford, Base32Hex, Alphabet, CharMap } from './types/CustomTypes'

/**
 * Generate a character map.
 * @param {string} alphabet e.g. "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
 * @param {CharacterMap} mappings map overrides from key to value
 * @method
 */

const charMap = (alphabet: string, mappings: Mappings): Mappings => {
  // generate map
  alphabet.split('').forEach(function (character, index) {
    if (!(character in mappings)) mappings[character] = index
  })

  return mappings
}

/**
 * The RFC 4648 base 32 alphabet and character map.
 * @see {@link https://tools.ietf.org/html/rfc4648}
 */

const rfc4648: RFC4648 = {
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  charmap: {
    0: 14,
    1: 8
  }
}

rfc4648.charmap = charMap(rfc4648.alphabet, rfc4648.charmap)

/**
 * The Crockford base 32 alphabet and character map.
 * @see {@link http://www.crockford.com/wrmg/base32.html}
 */

const crockford: Crockford = {
  alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
  charmap: {
    O: 0,
    I: 1,
    L: 1
  }
}

crockford.charmap = charMap(crockford.alphabet, crockford.charmap)

/**
 * base32hex
 * @see {@link https://en.wikipedia.org/wiki/Base32#base32hex}
 */

const base32hex: Base32Hex = {
  alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  charmap: {}
}

base32hex.charmap = charMap(base32hex.alphabet, base32hex.charmap)

/**
 * Create a new `Decoder` with the given options.
 *   @param {string} [type] Supported Base-32 variants are:
 *     "rfc4648", "base32hex", and "crockford".
 * @constructor
 */

class Decoder {
  buffer: number[]
  shift: number
  carry: number
  charmap: { [key: string]: number }

  constructor(type: CharMap) {
    this.buffer = []
    this.shift = 8
    this.carry = 0
    this.charmap = {}

    switch (type) {
      case 'rfc4648':
        this.charmap = exports.rfc4648.charmap
        break
      case 'crockford':
        this.charmap = exports.crockford.charmap
        break
      case 'base32hex':
        this.charmap = exports.base32hex.charmap
        break
      default:
        throw new Error('Invalid charmap type. Must be one of "rfc4648", "crockford", or "base32hex"')
    }

  }

  /**
 * Decode a string, continuing from the previous state.
 *
 * @param {string} input
 * @return {Decoder} this
 */

  write = (input: string): this => {
    const charmap = this.charmap
    const buf = this.buffer
    let shift = this.shift
    let carry = this.carry

    // decode string
    input.toUpperCase().split('').forEach(function (char: string) {
      // ignore padding
      if (char == '=') return

      // lookup symbol
      const symbol = charmap[char] & 0xff

      // invalid character
      shift -= 5
      if (shift > 0) {
        carry |= symbol << shift
      } else if (shift < 0) {
        buf.push(carry | (symbol >> -shift))
        shift += 8
        carry = (symbol << shift) & 0xff
      } else {
        buf.push(carry | symbol)
        shift = 8
        carry = 0
      }
    })

    // save state
    this.shift = shift
    this.carry = carry

    // for chaining
    return this
  }

  /**
 * Finish decoding.
 *
 * @param {string} [input] The final string to decode.
 * @return {ByteArray} Decoded byte array.
 */

  finalize = (input: string): Buffer => {
    // decode remaining buffer
    if (input) {
      this.write(input)
    }

    // flush remaining buffer
    if (this.shift !== 8 && this.carry !== 0) {
      this.buffer.push(this.carry)
      this.shift = 8
      this.carry = 0
    }

    // remove leading spaces
    let buffer = Buffer.from(this.buffer)
    while (buffer.length > 0 && buffer[0] === 0) {
      buffer = buffer.subarray(1)
    }
    // remove trailing spaces
    while (buffer.length > 0 && buffer[buffer.length - 1] === 0) {
      buffer = buffer.subarray(0, buffer.length - 1)
    }

    return buffer
  }
}

/**
 * Create a new `Encoder` with the given options.
 *
 * @param {EncoderOptions} [options]
 *   @param {string} [options.type] Supported Base-32 variants are:
 *     "rfc4648", "base32hex", and "crockford".
 *   @param {boolean} [options.lowercase] Use lower-case alphabet.
 * @constructor
 */

class Encoder {
  buffer: string
  shift: number
  carry: number
  alphabet: string = ''

  constructor(options: { type: Alphabet; lowercase: boolean }) {
    this.buffer = ''
    this.shift = 3
    this.carry = 0

    switch (options.type) {
      case 'rfc4648':
        this.alphabet = exports.rfc4648.alphabet
        break
      case 'crockford':
        this.alphabet = exports.crockford.alphabet
        break
      case 'base32hex':
        this.alphabet = exports.base32hex.alphabet
        break
      default:
        throw new Error('Invalid alphabet type. Must be one of "rfc4648", "crockford", or "base32hex"')
    }

    if (options.lowercase) this.alphabet = this.alphabet.toLowerCase()

  }

  /**
 * Encode a byte array, continuing from the previous state.
 *
 * @param {ByteArray} buffer The byte array to encode.
 * @return {Encoder} this
 */

  write = (buffer: Buffer): this => {
    let shift = this.shift
    let carry = this.carry
    let symbol
    let byte
    let i

    // encode each byte in buf
    for (i = 0; i < buffer.length; i++) {
      byte = buffer[i]

      // 1: 00000 000
      // 2:          00 00000 0
      // 3:                    0000 0000
      // 4:                             0 00000 00
      // 5:                                       000 00000
      // 6:                                                00000 000
      // 7:                                                         00 00000 0

      symbol = carry | (byte >> shift)
      this.buffer += this.alphabet[symbol & 0x1f]

      if (shift > 5) {
        shift -= 5
        symbol = byte >> shift
        this.buffer += this.alphabet[symbol & 0x1f]
      }

      shift = 5 - shift
      carry = byte << shift
      shift = 8 - shift
    }

    // save state
    this.shift = shift
    this.carry = carry

    // for chaining
    return this
  }

  /**
   * Finish encoding.
   *
   * @param {ByteArray} [buffer] The final byte array to encode.
   * @return {string} The encoded byte array.
   */

  finalize = (buffer: Buffer): Buffer => {
    // encode remaining buffer
    if (buffer) {
      this.write(buffer)
    }

    // flush remaining buffer
    while (this.shift !== 3) {
      this.buffer += this.alphabet[this.carry & 0x1f]
      this.shift = (this.shift + 5) % 8
      this.carry = 0
    }

    // add padding
    while (this.buffer.length % 8 !== 0) {
      this.buffer += '='
    }

    return Buffer.from(this.buffer)
  }
}

/**
 * Convenience encoder.
 *
 * @param {ByteArray} buffer The byte array to encode.
 * @param {EncoderOptions} [options]
 * @param {string} [options.type] Supported Base-32 variants are:
 *     "rfc4648", "base32hex", and "crockford".
 *  @param {boolean} [options.lowercase] Use lower-case alphabet.
 * @return {string} The encoded string.
 */

const encode = (buffer: Buffer, options: { type: Alphabet; lowercase: boolean }): Buffer => {
  return new Encoder(options).finalize(buffer)
}

/**
 * Convenience decoder.
 *
 * @param {string} input The string to decode.
 * @param {string} [type] Supported Base-32 variants are:
 *     "rfc4648", "base32hex", and "crockford".
 * @return {ByteArray} The decoded byte array.
 */

const decode = (input: string, type: CharMap): Buffer => {
  return new Decoder(type).finalize(input)
}

// Exports.
export { Decoder, Encoder, charMap, crockford, rfc4648, base32hex, encode, decode }
