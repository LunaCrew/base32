# Types

## CharMap

```ts
export type CharMap = 'rfc4648' | 'crockford' | 'base32hex'
```

This type is an union type that can take one of three string values: `'rfc4648'`, `'crockford'`, or `'base32hex'`.

## Alphabet

```ts
export type Alphabet = 'rfc4648' | 'crockford' | 'base32hex'
```

This type is also an union type that can take one of three string values: `'rfc4648'`, `'crockford'`, or `'base32hex'`.

## Mappings

```ts
export type Mappings = {
  [x: string]: any
  0?: number
  1?: number
  O?: number
  I?: number
  L?: number
}
```

This type is an object type with a string index signature and some optional properties.

- The `[x: string]: any` is an index signature. It means that a Mappings object can have any number of properties, and the keys of these properties are strings. The type of the property values is any, which means it can be of any type in TypeScript.
- The properties `0`, `1`, `O`, `I`, and `L` are optional properties. They are denoted by the `?` after the property name. These properties, if they exist on a Mappings object, must be of type `number`.

## RFC4648

```ts
export type RFC4648 = {
  alphabet: string,
  charmap: { 0?: number, 1?: number }
}
```

The RFC4648 type has two properties: `alphabet` and `charmap`.

- The `alphabet` property is of type string. This means that any object of type RFC4648 should have an alphabet property that is a string.
- The `charmap` property is an object itself with two optional properties: `0` and `1`. Both of these properties are of type number. The `?` after the property name indicates that these properties are optional. This means that an object of type RFC4648 may or may not have these properties, and if they do exist, they should be of type `number`.

## Crockford

```ts
export type Crockford = {
  alphabet: string;
  charmap: {
    O?: number;
    I?: number;
    L?: number;
  }
}
```

The Crockford type has two properties: `alphabet` and `charmap`.

- The `alphabet` property is of type string. This means that any object of type `Crockford` should have a string property named `alphabet`.
- The `charmap` property is an object itself, which can have up to three optional properties: `O`, `I`, and `L`. Each of these properties, if present, should be of type `number`. The `?` after the property name indicates that these properties are optional. This means that an object of type `Crockford` may or may not have these properties.

### Base32Hex

```ts
export type Base32Hex = {
  alphabet: string;
  charmap: { [key: string]: number }
}
```

The Base32Hex type has two properties: `alphabet` and `charmap`.

- The `alphabet` property is of type string. This could be used to represent a set of characters that are valid in a base32 hexadecimal system.
- The `charmap` property is an object that maps string keys to number values. This could be used to represent a mapping from characters in the base32 hexadecimal alphabet to their corresponding values.

> For example, in a base32 hexadecimal system, the character `'A'` might map to the number `0`, `'B'` to `1`, and so on.

The `{ [key: string]: number }` syntax is an index signature in TypeScript. It denotes a type of objects which have string keys and number values. This means that any object of type `Base32Hex` should have a `charmap` property that is an object with string keys and number values.
