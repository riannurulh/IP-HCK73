const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models'); // Adjust the path to your User model

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

async function verifyGoogleToken(token) {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  return payload;
}

async function findUserByGoogleId(googleId) {
  return await User.findOne({ where: { email:googleId } }); // Adjust this to match your User model's structure
}

module.exports = {
  verifyGoogleToken,
  findUserByGoogleId,
};
