# Encoder

```ts
/**
 * Create a new `Encoder` with the given options.
 *
 * @param {EncoderOptions} [options]
 *   @param {string} [options.type] Supported Base-32 variants are:
 *     "rfc4648", "base32hex", and "crockford".
 *   @param {string} [options.alphabet] Override the alphabet used in encoding.
 *   @param {boolean} [options.lowercase] Use lower-case alphabet.
 * @constructor
 */
 ```

## Class

The class `Encoder` is used for encoding data into base32 format.
The class has several properties: `buffer`, `shift`, `carry`, and `alphabet`.

- `buffer`: is a `string` that holds the encoded data.
- `shift` and `carry`: are used for bitwise operations during the encoding process.
- `alphabet` is a string of characters used for encoding.

## Constructor

The `Encoder` class constructor takes an `options` object with properties `type`, `alphabet`, and `lowercase`.

- `type`: determines the type of base32 encoding to use. It can be 'rfc4648', 'crockford', or 'base32hex'.
- `alphabet`: allows you to provide a custom alphabet for encoding.
- `lowercase`: if set to true, converts the alphabet to lowercase.

## Methods

### Write

The `write()` method is used to encode a `byte array`. It takes a `Buffer` as an argument and returns the `Encoder` instance for method chaining. The method uses bitwise operations to convert each byte in the buffer to a base32 character.

The state of the encoding process (the `shift` and `carry` values) is saved in the instance `properties`, allowing you to continue encoding with subsequent calls to write.

### Finalize

The `finalize()` method is used to finish the encoding process. It takes an optional `Buffer` as an argument. If provided, it encodes this buffer using the write method. Then, it flushes the remaining buffer and adds padding to make the length of the encoded data a multiple of 8. The method returns a Buffer containing the encoded data.

---

<p align="center">

| ⬅️ [Alphabets](Alphabets.md)| [🏠 Summary](Summary.md) | [Decoder](Decoder.md) ➡️|
|:---------------------------:|:-------------------------:|:------------------------:|
</p>
