declare module '@lunacrew/base32' {
  /**
  * Represents a Base32 encoding and decoding utility.
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
    static readonly encode: (input: string, type?: string, lowercase?: boolean) => Buffer

    /**
     * Convenience decoder.
     *
     * @param {string} input - The base32 encoded string to decode.
     * @param {CharMap} [type] - The character map type to use for decoding. Defaults to 'rfc4648'.
     * @returns {Buffer} The decoded data as a Buffer.
     */
    static readonly decode: (input: string, type?: string) => Buffer
  }

  /**
   * Create a new `Encoder` with the given options.
   *
   * @param {string} [type] The alphabet type to use for encoding. Default is 'rfc4648'.
   * @param {boolean} [lowercase] Use lower-case alphabet. Default is false.
   * @constructor
   */
  export class Encoder {
    constructor(type?: string, lowercase?: boolean)
    finalize: (buffer: Buffer) => Buffer
  }

  /**
  * Create a new `Decoder` with the given options.
  *
  * @param {string} [type] The charmap type to use for encoding. Default is 'rfc4648'.
  * @constructor
  */
  export class Decoder {
    constructor(type?: string)
    finalize: (input: string) => Buffer
  }
}
