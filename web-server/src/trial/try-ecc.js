// the native crypto module from nodejs do not have
// elliptic curve based encryption/decryption so
// we use third-party module here
const EthCrypto = require('eth-crypto');

async function main() {
  // recipients generate private and public key
  const recipient = EthCrypto.createIdentity();

  // recipients share the public key to senders
  // then...

  // this is the data that senders want to encrypt
  const message = "this is a secret message";
  // senders encrypt message with recipients public key
  const encryptedObj = await EthCrypto.encryptWithPublicKey(recipient.publicKey, message);
  const ciphertext = EthCrypto.cipher.stringify(encryptedObj);

  console.log("Message:", message);
  console.log("Private Key:", recipient.privateKey);
  console.log("Public Key:", recipient.publicKey);
  console.log("Encrypted Message:", ciphertext);

  // senders send ciphertext to recipients
  // then...

  // recipients decrypt the message and recover the plaintext
  const receivedCiphertextObj = EthCrypto.cipher.parse(ciphertext);
  const recoveredPlaintext = await EthCrypto.decryptWithPrivateKey(recipient.privateKey, receivedCiphertextObj);

  console.log("Recovered Plaintext:", recoveredPlaintext);
}

main();
