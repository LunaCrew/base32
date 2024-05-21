import Encoder from 'src/base32/Encoder'
import Decoder from 'src/base32/Decoder'
import { Base32 } from 'src/index'
import { Alphabet, CharMap } from 'src/types/CustomTypes'

describe('Base32 Encoding and Decoding', () => {
  it('should encode and decode a string using RFC 4648 variant', () => {
    const input = 'Hello World!'
    const encoded = Base32.encode(input)
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string using Crockford variant', () => {
    const input = 'Test string'
    const encoded = Base32.encode(input, 'crockford')
    const decoded = Base32.decode(encoded.toString(), 'crockford')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string using Base32Hex variant', () => {
    const input = '1234567890'
    const encoded = Base32.encode(input, 'base32hex')
    const decoded = Base32.decode(encoded.toString(), 'base32hex')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode an empty string', () => {
    const input = ''
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with special characters', () => {
    const input = '!@#$%^&*()'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with spaces', () => {
    const input = 'Hello World!'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with numbers', () => {
    const input = '1234567890'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with uppercase letters', () => {
    const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with lowercase letters', () => {
    const input = 'abcdefghijklmnopqrstuvwxyz'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with mixed case letters', () => {
    const input = 'Hello World!'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode a string with lowercase true', () => {
    const input = 'Hello World!'
    const encoded = Base32.encode(input, 'rfc4648', true)
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

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
    const encoder = new Encoder('rfc4648')
    const buffer = encoder.finalize(Buffer.from(''))
    expect(buffer.toString()).toEqual('')
  })

  it('should finalize encoding with additional buffer', () => {
    const encoder = new Encoder('rfc4648')
    const buffer = encoder.finalize(Buffer.from([0x0a, 0x0b]))

    expect(buffer.toString()).toEqual('BIFQAA==')
  })

  it('should throw an error invalid decoder type', () => {
    expect(() => new Decoder('a' as CharMap))
      .toThrow(new Error('Invalid charmap type. Must be one of "rfc4648", "crockford", or "base32hex"'))
  })

  it('should throw an error invalid encoder type', () => {
    expect(() => new Encoder('a' as Alphabet))
      .toThrow(new Error('Invalid alphabet type. Must be one of "rfc4648", "crockford", or "base32hex"'))
  })
})
