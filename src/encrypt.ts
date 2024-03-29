/**
 * Applies the Caesar cipher to a given text.
 * @param text - The input text.
 * @param key - The key for the Caesar cipher.
 * @returns The encrypted text using the Caesar cipher.
 */
const caesarCipher = (text: string, key: number): string => {
  key = key % 128;
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 0 && code <= 127) {
        return String.fromCharCode((code + key) % 128);
      }
      return char;
    })
    .join("");
};

/**
 * Applies the XOR cipher to a given text.
 * @param text - The input text.
 * @param key - The key for the XOR cipher.
 * @returns The encrypted text using the XOR cipher.
 */
const XORCipher = (text: string, key: string): string => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return result;
};

/**
 * Encrypts a text using a Caesar cipher and then Base64 encoding.
 * @param text - The input text to be encrypted.
 * @param key - The key for the Caesar cipher.
 * @param salt - The salt added to the text before encryption.
 * @returns The encrypted text.
 */
const encrypt = (text: string, key: number, salt: string): string => {
  const saltedText = text + salt;
  const caesarEncrypted = caesarCipher(saltedText, key);
  const XOREncrypted = XORCipher(caesarEncrypted, salt);
  const base64Encrypted = Buffer.from(XOREncrypted, "binary").toString(
    "base64"
  );
  return base64Encrypted;
};

export { encrypt, XORCipher };
