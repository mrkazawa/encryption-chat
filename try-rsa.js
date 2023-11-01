const crypto = require('crypto');

const options = {
  modulusLength: 2048, // default is 2048 bits
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
};

// recipient generates private and public key
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", options);
console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);

//------------------ Mock Transmission Start ------------------//
console.log("Recipient sends PUBLIC KEY to sender");
//------------------ Mock Transmission End ------------------//

// sender wants to create a new message
const message = "this is a secret message";
console.log("Plaintext:", message);

// senders encrypt message with recipients public key
const data = Buffer.from(message)
const ciphertext = crypto.publicEncrypt(publicKey, data);
console.log("Ciphertext:", ciphertext.toString("hex"));

//------------------ Mock Transmission Start ------------------//
console.log("Sender sends CIPHERTEXT to recipient");
//------------------ Mock Transmission End ------------------//

// recipient decrypts the message and recover the plaintext
const recoveredPlaintext = crypto.privateDecrypt(privateKey, ciphertext);
console.log("Recovered Plaintext:", recoveredPlaintext.toString("utf8"));
