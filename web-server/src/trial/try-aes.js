const crypto = require('crypto');

// both party agree on which algorithm to use
const algorithm = "aes-256-cbc";

// recipients generate keys and iv (initialization vector)
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// recipients share key and iv to senders
// then...

// senders encrypt message
const message = "this is a secret message";
const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
let ciphertext = cipher.update(message, "utf8", "hex");
ciphertext += cipher.final("hex");

console.log("Plaintext:", message);
console.log("Key:", secretKey.toString("hex"));
console.log("IV:", iv.toString("hex"));
console.log("Ciphertext:", ciphertext);

// senders send ciphertext to recipients
// then...

// recipients decrypt message
const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
let recoveredMessage = decipher.update(ciphertext, "hex", "utf8");
recoveredMessage += decipher.final("utf8");

console.log("Recovered Plaintext:", recoveredMessage);
