import Base32, { Encoder, Decoder } from 'src/index'

describe('Base32 Encoding and Decoding', () => {
  it('should encode and decode a string to base32', () => {
    const input = 'Hello World!'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should encode and decode an empty string', () => {
    const input = ''
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should handle special characters', () => {
    const input = '!@#$%^&*()'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded.toString()).toEqual(input)
  })

  it('should return a buffer from a string', () => {
    const decoder = new Decoder('rfc4648')
    const input = 'Hello World!'
    const encoded = Base32.encode(input, 'rfc4648')
    const decoded = decoder.finalize(encoded.toString())

    expect(Buffer.isBuffer(decoded)).toEqual(true)
  })


  it('should encode and decode bytes to base32', () => {
    const input = Buffer.from([1, 2, 3, 4, 5])
    const encoded = Base32.encode(input.toString(), 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded).toEqual(input)
  })

  it('should encode and decode an empty buffer', () => {
    const input = Buffer.from([])
    const encoded = Base32.encode(input.toString(), 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded).toEqual(input)
  })

  it('should handle special characters in bytes', () => {
    const input = Buffer.from([33, 64, 35, 36, 37, 94, 38, 42, 40, 41])
    const encoded = Base32.encode(input.toString(), 'rfc4648')
    const decoded = Base32.decode(encoded.toString(), 'rfc4648')

    expect(decoded).toEqual(input)
  })

  it('should return a buffer from a string', () => {
    const decoder = new Decoder()
    const encoder = new Encoder()
    const input = Buffer.from([0, 1, 2, 3, 4, 5])
    const encoded = encoder.finalize(input)
    const decoded = decoder.finalize(encoded.toString())

    expect(Buffer.isBuffer(decoded)).toEqual(true)
  })

  it('should decode a base32 encoded string', () => {
    const encoded = Base32.encode('Hello World!')
    const decoded = Base32.decode(encoded.toString())
    console.log(encoded.toString())
    console.log(decoded.toString())

    expect(decoded.toString()).toEqual('Hello World!')
  })
})
