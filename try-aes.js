const crypto = require('crypto');

// both party agree on which algorithm to use
const algorithm = "aes-256-cbc";

// recipient generates key and iv (initialization vector)
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
console.log("Key:", secretKey.toString("hex"));
console.log("IV:", iv.toString("hex"));

//------------------ Mock Transmission Start ------------------//
console.log("Recipient sends SECRET KEY and IV to sender");
//------------------ Mock Transmission End ------------------//

// sender wants to send a message
const message = "this is a secret message";
console.log("Plaintext:", message);

// sender encrypts the message
const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
let ciphertext = cipher.update(message, "utf8", "hex");
ciphertext += cipher.final("hex");
console.log("Ciphertext:", ciphertext);

//------------------ Mock Transmission Start ------------------//
console.log("Sender sends CIPHERTEXT to recipient");
//------------------ Mock Transmission End ------------------//

// recipient decrypts the received message
const senderDecipher = crypto.createDecipheriv(algorithm, secretKey, iv);
let recoveredMessageBySender = senderDecipher.update(ciphertext, "hex", "utf8");
recoveredMessageBySender += senderDecipher.final("utf8");
console.log("Recovered Plaintext:", recoveredMessageBySender);
