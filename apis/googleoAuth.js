const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE);

async function verify(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE
    });
    return ticket.getPayload();
}
// verify().catch(console.error);

module.exports = verify