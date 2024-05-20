import { Decoder, Encoder, encode, decode } from 'src/base32'

describe('Base32 Encoding and Decoding', () => {
  it('should encode and decode a string using RFC 4648 variant', () => {
    const input = 'Hello World!'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string using Crockford variant', () => {
    const input = 'Test string'
    const encoded = encode(Buffer.from(input), { type: 'crockford', lowercase: false })
    const decoded = decode(encoded.toString(), 'crockford')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string using Base32Hex variant', () => {
    const input = '1234567890'
    const encoded = encode(Buffer.from(input), { type: 'base32hex', lowercase: false })
    const decoded = decode(encoded.toString(), 'base32hex')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode an empty string', () => {
    const input = ''
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with special characters', () => {
    const input = '!@#$%^&*()'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with spaces', () => {
    const input = 'Hello World!'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with numbers', () => {
    const input = '1234567890'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with uppercase letters', () => {
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with lowercase letters', () => {
    const input = 'abcdefghijklmnopqrstuvwxyz'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with mixed case letters', () => {
    const input = 'Hello World!'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: false })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with lowercase true', () => {
    const input = 'Hello World!'
    const encoded = encode(Buffer.from(input), { type: 'rfc4648', lowercase: true })
    const decoded = decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
    expect(encoded.toString()).toEqual('jbswy3dpeblw64tmmqqqaa==')
  })

  it('should finalize decoding with no additional string', () => {
    const decoder = new Decoder('rfc4648')
    const buffer = decoder.finalize('')

    expect(buffer).toEqual(Buffer.from([]))
  })

  it('should finalize decoding with additional string', () => {
    const decoder = new Decoder('rfc4648')
    const buffer = decoder.finalize('ABCD')

    expect(buffer).toEqual(Buffer.from([0x44, 0x30]))
  })

  it('should finalize encoding with no additional buffer', () => {
    const encoder = new Encoder({ type: 'rfc4648', lowercase: false })
    const buffer = encoder.finalize(Buffer.from(''))
    expect(buffer.toString()).toEqual('')
  })

  it('should finalize encoding with additional buffer', () => {
    const encoder = new Encoder({ type: 'rfc4648', lowercase: false })
    const buffer = encoder.finalize(Buffer.from([0x0a, 0x0b]))

    expect(buffer.toString()).toEqual('BIFQAA==')
  })

  it('should throw an error invalid decoder type', () => {
    expect(() => new Decoder('a'))
      .toThrow(new Error('Invalid charmap type. Must be one of "rfc4648", "crockford", or "base32hex"'))
  })

  it('should throw an error invalid encoder type', () => {
    expect(() => new Encoder({ type: 'a', lowercase: false }))
      .toThrow(new Error('Invalid alphabet type. Must be one of "rfc4648", "crockford", or "base32hex"'))
  })
})
