const crypto = require('crypto');

// recipients generate private and public key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048, // default is 2048 bits
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// recipients share the public key to senders
// then...

// this is the data that senders want to encrypt
const message = "this is a secret message";
// senders encrypt message with recipients public key
const ciphertext = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(message) // convert string to buffer
);

console.log("Message:", message);
console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
console.log("Encrypted Message:", ciphertext.toString("hex"));

// senders send ciphertext to recipients
// then...

// recipients decrypt the message and recover the plaintext
const recoveredPlaintext = crypto.privateDecrypt(
  {
    key: privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  ciphertext
);

console.log("Recovered Plaintext:", recoveredPlaintext.toString("utf8"));
