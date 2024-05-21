export type Mappings = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
  0?: number
  1?: number
  O?: number
  I?: number
  L?: number
}

export type RFC4648 = {
  alphabet: string,
  charmap: { 0?: number, 1?: number }
}

export type Crockford = {
  alphabet: string;
  charmap: {
    O?: number;
    I?: number;
    L?: number;
  }
}

export type Base32Hex = {
  alphabet: string;
  charmap: { [key: string]: number }
}

export type Alphabet = 'rfc4648' | 'crockford' | 'base32hex'

export type CharMap = 'rfc4648' | 'crockford' | 'base32hex'
