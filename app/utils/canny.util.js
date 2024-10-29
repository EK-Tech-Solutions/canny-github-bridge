import crypto from 'crypto';

// Get the Canny API key from the environment variables
const { CANNY_API_KEY } = process.env;

// Verify the request from Canny.io
export const verify = async (req, res, next) => {
  const { 'canny-nonce': nonce, 'canny-signature': signature } = req.headers;

  // Check if the nonce and signature are present in the headers
  if (!nonce || !signature) {
    res.status(401).send();
    return;
  }

  // Calculate the HMAC SHA-256 signature using the Canny API key and the nonce
  const calculated = crypto
    .createHmac('sha256', CANNY_API_KEY)
    .update(nonce)
    .digest('base64');

  // Compare the calculated signature with the signature from the headers
  if (signature === calculated) {
    // Signature is valid, proceed with the request
    next();
  } else {
    // Signature is invalid, return a 403 Forbidden response
    res.status(403).send();
  }
}