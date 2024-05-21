import { Alphabet } from '../types/CustomTypes'
import { rfc4648, crockford, base32hex } from './CharMap'

/**
 * Create a new `Encoder` with the given options.
 *
 * @param {string} [type] The alphabet type to use for encoding. Default is 'rfc4648'.
 * @param {boolean} [lowercase] Use lower-case alphabet. Default is false.
 * @constructor
 */

export default class Encoder {
  private buffer: string
  private shift: number
  private carry: number
  private alphabet: string = ''

  constructor(type: Alphabet = 'rfc4648', lowercase: boolean = false) {
    this.buffer = ''
    this.shift = 3
    this.carry = 0

    switch (type) {
      case 'rfc4648':
        this.alphabet = rfc4648.alphabet
        break
      case 'crockford':
        this.alphabet = crockford.alphabet
        break
      case 'base32hex':
        this.alphabet = base32hex.alphabet
        break
      default:
        throw new Error('Invalid alphabet type. Must be one of "rfc4648", "crockford", or "base32hex"')
    }

    if (lowercase) this.alphabet = this.alphabet.toLowerCase()

  }

  /**
   * Finalizes the encoding process and returns the encoded buffer.
   * @param buffer - The remaining buffer to be encoded.
   * @returns The encoded buffer.
   */

  finalize = (buffer: Buffer): Buffer => {
    // encode remaining buffer
    this._write(buffer)

    // flush remaining buffer
    while (this.shift !== 3) {
      this.buffer += this.alphabet[this.carry & 31]
      this.shift = (this.shift + 5) % 8
      this.carry = 0
    }

    // add padding
    while (this.buffer.length % 8 !== 0) {
      this.buffer += '='
    }

    return Buffer.from(this.buffer)
  }

  /**
 * Writes the encoded representation of the given buffer to the internal buffer.
 *
 * @param buffer - The buffer to encode.
 * @returns The instance of the class for chaining.
 */

  private _write = (buffer: Buffer): this => {
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
      this.buffer += this.alphabet[symbol & 31]

      if (shift > 5) {
        shift -= 5
        symbol = byte >> shift
        this.buffer += this.alphabet[symbol & 31]
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
}
