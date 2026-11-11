/**
 * create.js (proxy)
 * Operasi CREATE diteruskan ke API BotVPN. Tidak ada akses panel langsung.
 */
const api = require('./api-client');

const protocolIndex = { ssh: 0, vmess: 1, vless: 2, trojan: 3 };

async function create(protocol, username, password, exp, devices, server_id) {
  try {
    const body = await api.createAccount({
      productId: `${server_id}-${protocolIndex[protocol]}`,
      username,
      ...(password ? { password } : {}),
      duration: exp,
      devices: devices || 1
    });
    return body && body.message ? body.message : JSON.stringify(body);
  } catch (error) {
    return `❌ ${error.message}`;
  }
}

async function createssh(username, password, exp, iplimit, server_id) {
  return create('ssh', username, password, exp, iplimit, server_id);
}
async function createvmess(username, exp, quota, limitip, server_id) {
  return create('vmess', username, null, exp, limitip, server_id);
}
async function createvless(username, exp, quota, limitip, server_id) {
  return create('vless', username, null, exp, limitip, server_id);
}
async function createtrojan(username, exp, quota, limitip, server_id) {
  return create('trojan', username, null, exp, limitip, server_id);
}

module.exports = { createssh, createvmess, createvless, createtrojan };
