import { Mappings, RFC4648, Crockford, Base32Hex } from 'src/types/Mappings'

describe('Mappings', () => {
  it('should have correct type for Mappings', () => {
    const mappings: Mappings = {
      0: 0,
      1: 1,
      O: 2,
      I: 3,
      L: 4,
    }

    expect(mappings).toBeDefined()
    expect(mappings).toHaveProperty('0', 0)
    expect(mappings).toHaveProperty('1', 1)
    expect(mappings).toHaveProperty('O', 2)
    expect(mappings).toHaveProperty('I', 3)
    expect(mappings).toHaveProperty('L', 4)
  })

  it('should have correct type for RFC4648', () => {
    const rfc4648: RFC4648 = {
      alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
      charmap: {
        0: 0,
        1: 1,
      },
    }

    expect(rfc4648).toBeDefined()
    expect(rfc4648).toHaveProperty('alphabet', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567')
    expect(rfc4648).toHaveProperty('charmap')
    expect(rfc4648.charmap).toHaveProperty('0', 0)
    expect(rfc4648.charmap).toHaveProperty('1', 1)
  })

  it('should have correct type for Crockford', () => {
    const crockford: Crockford = {
      alphabet: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
      charmap: {
        O: 0,
        I: 1,
        L: 2,
      },
    }

    expect(crockford).toBeDefined()
    expect(crockford).toHaveProperty('alphabet', '0123456789ABCDEFGHJKMNPQRSTVWXYZ')
    expect(crockford).toHaveProperty('charmap')
    expect(crockford.charmap).toHaveProperty('O', 0)
    expect(crockford.charmap).toHaveProperty('I', 1)
    expect(crockford.charmap).toHaveProperty('L', 2)
  })

  it('should have correct type for Base32Hex', () => {
    const base32Hex: Base32Hex = {
      alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
      charmap: {},
    }

    expect(base32Hex).toBeDefined()
    expect(base32Hex).toHaveProperty('alphabet', '0123456789ABCDEFGHIJKLMNOPQRSTUV')
    expect(base32Hex).toHaveProperty('charmap')
    expect(base32Hex.charmap).toEqual({})
  })
})
