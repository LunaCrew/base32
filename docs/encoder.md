# Encoder

```ts
/**
 * Create a new `Encoder` with the given options.
 *
 * @param {string} [type] The `alphabet` type to use for encoding. Default is 'rfc4648'.
 * @param {boolean} [lowercase] Use lower-case `alphabet`. Default is false.
 * @constructor
 */
 ```

## Class

The class Encoder is used for encoding data using different types of alphabets. The alphabets are defined in the [CharMap file](../src/base32/CharMap.ts) and are imported at the top of the file. The Encoder class has four private properties: `buffer`, `shift`, `carry`, and `alphabet`.

- The `buffer` is an array of numbers that holds the encoded values.
- The `shift` and `carry` are used in the encoding process.
- The `alphabet` is an object that maps values to their corresponding characters in the base32 encoding scheme.

### Constructor

The Encoder class constructor takes two parameters: `type` and `lowercase`.

- The `type` parameter is used to specify the type of `alphabet` to use for encoding, and it defaults to 'rfc4648' if not provided.
- The `lowercase` parameter is a boolean that determines whether to use a lower-case `alphabet`, and it defaults to false if not provided.

The constructor initializes the `buffer`, `shift`, and `carry` properties and sets the `alphabet` property based on the type parameter. If the lowercase parameter is true, the `alphabet` is converted to lower case.

### Methods

The Encoder class has two methods: `finalize()` and `_write()`.

#### finalize()

The finalize method takes a Buffer as a parameter, encodes the remaining `buffer`, flushes the remaining `buffer`, adds padding to the `buffer`, and then returns the encoded `buffer`.

#### _write()

The `_write()` method is a private method that takes a Buffer as a parameter and writes the encoded representation of the `buffer` to the internal `buffer`. It uses a for loop to encode each byte in the `buffer`. The method also saves the state of `shift` and `carry` for future use and returns the instance of the class for chaining.

The encoding process in the`_write()` method is a bit complex. It involves bitwise operations to `shift` and manipulate the bits in each byte of the `buffer`. The comments in the code provide a visual representation of how the bits are shifted and combined to form the encoded symbols. The encoded symbols are then added to the internal `buffer`.

---

| [Index](index) | [Usage](Usage) | [Alphabets](Alphabets) | [📍Encoder](Encoder) | [Decoder](Decoder) | [Types](Types) | [References](References) |

> 📍 *You are here*
