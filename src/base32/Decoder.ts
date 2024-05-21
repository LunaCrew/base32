import { CharMap } from '../types/CustomTypes'
import { rfc4648, crockford, base32hex } from './CharMap'

/**
 * Create a new `Decoder` with the given options.
 *
 * @param {string} [type] The charmap type to use for encoding. Default is 'rfc4648'.
 * @constructor
 */

export default class Decoder {
  private buffer: number[]
  private shift: number
  private carry: number
  private charmap: { [key: string]: number; }

  constructor(type: CharMap = 'rfc4648') {
    this.buffer = []
    this.shift = 8
    this.carry = 0
    this.charmap = {}

    switch (type) {
      case 'rfc4648':
        this.charmap = rfc4648.charmap
        break
      case 'crockford':
        this.charmap = crockford.charmap
        break
      case 'base32hex':
        this.charmap = base32hex.charmap
        break
      default:
        throw new Error('Invalid charmap type. Must be one of "rfc4648", "crockford", or "base32hex"')
    }

  }

  /**
   * Finalizes the decoding process and returns the decoded buffer.
   *
   * @param input - The remaining input to be decoded.
   * @returns The decoded buffer.
   */

  finalize = (input: string): Buffer => {
    // decode remaining buffer
    this._write(input)

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

  /**
   * Writes the input string to the buffer, decoding it using the base32 encoding scheme.
   *
   * @param input - The input string to be decoded and written to the buffer.
   * @returns The instance of the class for chaining.
   */

  private _write = (input: string): this => {
    const charmap = this.charmap
    const buf = this.buffer
    let shift = this.shift
    let carry = this.carry

    // decode string
    input.toUpperCase().split('').forEach(function (char: string) {
      // ignore padding
      if (char == '=') return

      // lookup symbol
      const symbol = charmap[char] & 255

      // invalid character
      shift -= 5
      if (shift > 0) {
        carry |= symbol << shift
      } else if (shift < 0) {
        buf.push(carry | (symbol >> -shift))
        shift += 8
        carry = (symbol << shift) & 255
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
}
