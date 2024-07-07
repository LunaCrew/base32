import Encoder from './base32/Encoder'
import Decoder from './base32/Decoder'
import { Alphabet, CharMap } from './types/CustomTypes'

export { Encoder, Decoder }

/**
 * Base32 encoding and decoding.
 */
export default class Base32 {
  /**
   * Convenience encoder.
   *
   * @param {string} input - The string to encode.
   * @param {Alphabet} [type] - The alphabet type to use for encoding. Defaults to 'rfc4648'.
   * @param {boolean} [lowercase] - Use lower-case alphabet. Defaults to false.
   * @returns {Buffer} The encoded string as a Buffer.
   */

  static readonly encode = (input: string, type: Alphabet = 'rfc4648', lowercase: boolean = false): Buffer => {
    return new Encoder(type, lowercase).finalize(Buffer.from(input))
  }

  /**
   * Convenience decoder.
   *
   * @param {string} input - The base32 encoded string to decode.
   * @param {CharMap} [type] - The character map type to use for decoding. Defaults to 'rfc4648'.
   * @returns {Buffer} The decoded data as a Buffer.
   */

  static readonly decode = (input: string, type: CharMap = 'rfc4648'): Buffer => {
    return new Decoder(type).finalize(input)
  }
}
