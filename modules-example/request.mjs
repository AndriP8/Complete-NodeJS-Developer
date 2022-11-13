export function encrypt(data) {
  return "encrypted data";
}

export function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} to ${url}`);
}
