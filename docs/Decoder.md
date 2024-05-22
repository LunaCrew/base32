# Decoder

```ts
/**
 * Create a new `Decoder` with the given options.
 *
 * @param {string} [type] The charmap type to use for encoding. Default is 'rfc4648'.
 * @constructor
 */
```

## Class

The class Decoder is used for decoding base32 encoded strings. The class has four private properties: `buffer`, `shift`, `carry`, and `charmap`.

- The `buffer` is an array of numbers that holds the decoded values.
- The `shift` and `carry` are used in the decoding process.
- The `charmap` is an object that maps characters to their corresponding values in the base32 encoding scheme.

### Constructor

The constructor of the Decoder class accepts an optional parameter `type` which specifies the character map to use for decoding. By default, it uses the `rfc4648` character map. It can also use `crockford` or `base32hex` character maps. If an invalid type is provided, it throws an error.

### Methods

#### finalize()

The finalize method finalizes the decoding process and returns the decoded `buffer`. It first decodes any remaining input, then flushes any remaining `buffer`. It also removes any leading and trailing spaces from the `buffer`.

#### _write()

The _write method is a private method that decodes an input string and writes it to the `buffer`.

It first converts the input string to uppercase and splits it into an array of characters. Then it iterates over each character, ignores any padding, looks up the symbol for the character in the character map, and decodes it.

The decoded value is then written to the `buffer`. The method also updates the `shift` and `carry` properties based on the decoding process. The method returns the instance of the class, allowing for method chaining.

---

| ⬅️ [Encoder](Encoder)| 🏠 [Summary](index) | [Types](Types) ➡️ |
|----------------------|----------------------|--------------------|
