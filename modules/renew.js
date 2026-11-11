/**
 * renew.js (proxy)
 * Operasi RENEW diteruskan ke API BotVPN.
 */
const api = require('./api-client');

const protocolIndex = { ssh: 0, vmess: 1, vless: 2, trojan: 3 };

async function renew(protocol, username, exp, server_id) {
  try {
    const body = await api.renewAccount({
      username,
      productId: `${server_id}-${protocolIndex[protocol]}`,
      duration: exp
    });
    return body && body.message ? body.message : JSON.stringify(body);
  } catch (error) {
    return `❌ ${error.message}`;
  }
}

async function renewssh(username, exp, limitip, server_id) {
  return renew('ssh', username, exp, server_id);
}
async function renewvmess(username, exp, quota, limitip, server_id) {
  return renew('vmess', username, exp, server_id);
}
async function renewvless(username, exp, quota, limitip, server_id) {
  return renew('vless', username, exp, server_id);
}
async function renewtrojan(username, exp, quota, limitip, server_id) {
  return renew('trojan', username, exp, server_id);
}

module.exports = { renewssh, renewvmess, renewvless, renewtrojan };
