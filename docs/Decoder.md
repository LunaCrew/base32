# Decoder

```ts
/**
 * Create a new `Decoder` with the given options.
 *
 * @param {DecoderOptions} [options]
 *   @param {string} [options.type] Supported Base-32 variants are:
 *     "rfc4648", "base32hex", and "crockford".
 *   @param {CharacterMap} [options.charmap] Override the character map used in decoding.
 * @constructor
 */
```

## Class

The `Decoder` class that is used for decoding base32 encoded strings.
The class has four properties: `buffer`, `shift`, `carry`, and `charmap`.

- `buffer`: is an array of numbers that holds the decoded bytes.
- `shift`: is a number that represents the current shift in bits during the decoding process.
- `carry`: is a number that holds the remaining bits that have not yet been fully processed.
- `charmap`: is an object that maps characters to their corresponding values in the base32 encoding scheme.

## Constructor

The constructor of the `Decoder` class initializes these properties. It takes an options object as a parameter, which should contain a `type` and a `charmap`. 

- `type`: is a string that specifies the type of base32 encoding scheme to use.
- `charmap`: is a string that provides a custom character map for the encoding scheme.

The constructor also sets up the character map based on the specified type.

## Methods

### Write

The `write()` method is used to decode a base32 encoded string. It takes a string as input, converts it to uppercase, and then processes each character in the string.

For each character, it looks up the corresponding value in the character map, shifts the bits accordingly, and adds the result to the buffer. The method also updates the `shift` and `carry` properties based on the current state of the decoding process.

### Finalize

The `finalize()` method is used to finish the decoding process. It takes a string as `input`, decodes it if provided, and then flushes the remaining bits in the carry to the buffer. It also removes leading and trailing empty spaces from the buffer. The method returns the buffer as a `Buffer object`, which represents the decoded byte array.

---

<p align="center">

| ⬅️ [Encoder](Encoder.md)| [🏠 Summary](Summary.md) | [References](References.md) ➡️|
|:------------------------:|:-------------------------:|:------------------------------:|
</p>
