import { Mappings, RFC4648, Crockford, Base32Hex } from '../types/CustomTypes'

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

/**
 * base32hex
 * @see {@link https://en.wikipedia.org/wiki/Base32#base32hex}
 */
const base32hex: Base32Hex = {
  alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
  charmap: {}
}

/**
 * Generate a character map.
 * @param {string} alphabet e.g. "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
 * @param {CharacterMap} mappings map overrides from key to value
 * @method
 */

const genCharMap = (alphabet: string, mappings: Mappings): Mappings => {
  // generate map
  alphabet.split('').forEach(function (character, index) {
    if (!(character in mappings)) mappings[character] = index
  })

  return mappings
}

crockford.charmap = genCharMap(crockford.alphabet, crockford.charmap)
rfc4648.charmap = genCharMap(rfc4648.alphabet, rfc4648.charmap)
base32hex.charmap = genCharMap(base32hex.alphabet, base32hex.charmap)

export { rfc4648, crockford, base32hex }
