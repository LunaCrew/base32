import * as Base32 from './base32'

/**
 * The `finalizeDecode` method of the `Base32.Decoder` class.
 * This method is used to finalize the decoding process and return the decoded data.
 *
 * @returns The decoded data.
 */
const finalizeDecode = Base32.Decoder.prototype.finalize
Base32.Decoder.prototype.finalize = function (buf) {
  const bytes = finalizeDecode.call(this, buf)

  return Buffer.from(bytes)
}

export { Base32 }
