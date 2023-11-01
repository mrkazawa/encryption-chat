// the native crypto module from nodejs do not have
// elliptic curve based encryption/decryption so
// we use third-party module here
const EthCrypto = require('eth-crypto');

async function main() {
  // recipient generates private and public key
  const recipient = EthCrypto.createIdentity();
  console.log("Private Key:", recipient.privateKey);
  console.log("Public Key:", recipient.publicKey);

  //------------------ Mock Transmission Start ------------------//
  console.log("Recipient sends PUBLIC KEY to sender");
  //------------------ Mock Transmission End ------------------//

  // sender wants to send a message
  const message = "this is a secret message";
  console.log("Plaintext:", message);

  // sender encrypts message with recipients public key
  const encryptedObj = await EthCrypto.encryptWithPublicKey(recipient.publicKey, message);
  const ciphertext = EthCrypto.cipher.stringify(encryptedObj);
  console.log("Ciphertext:", ciphertext);

  //------------------ Mock Transmission Start ------------------//
  console.log("Sender sends CIPHERTEXT to recipient");
  //------------------ Mock Transmission End ------------------//

  // recipient decrypts the message and recover the plaintext
  const receivedCiphertextObj = EthCrypto.cipher.parse(ciphertext);
  const recoveredPlaintext = await EthCrypto.decryptWithPrivateKey(recipient.privateKey, receivedCiphertextObj);
  console.log("Recovered Plaintext:", recoveredPlaintext);
}

main();
