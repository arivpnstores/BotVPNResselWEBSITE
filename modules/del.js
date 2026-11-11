/**
 * del.js (proxy)
 * Operasi DELETE + pengecekan akun diteruskan ke API BotVPN.
 */
const { opData } = require('./_op');
const api = require('./api-client');
const store = require('./server-store');

async function deleteByUsername(username) {
  try {
    const body = await api.getAccounts();
    const accounts = Array.isArray(body) ? body : (body && body.data) || [];
    const account = accounts.find((item) => item.username === username);
    if (!account || !account.publicId) return '❌ Akun tidak ditemukan.';
    const result = await api.deleteAccount(account.publicId);
    return result && result.message ? result.message : JSON.stringify(result);
  } catch (error) {
    return `❌ ${error.message}`;
  }
}

async function delssh(username) {
  return deleteByUsername(username);
}
async function delvmess(username) {
  return deleteByUsername(username);
}
async function delvless(username) {
  return deleteByUsername(username);
}
async function deltrojan(username) {
  return deleteByUsername(username);
}

async function cekByDomain(domain, username, type) {
  const server = await store.getByDomain(domain);
  if (!server) return null;
  const data = await opData({ action: 'cek', protocol: type, server_id: server.id, username });
  // API membungkus hasil: { success, data: {...} } -> ambil bagian dalam
  if (data && data.data !== undefined) return data.data;
  return data;
}

async function checkAccountExpiry(domain, auth, username, type) {
  try {
    const data = await cekByDomain(domain, username, type);
    if (data && data.expired) return data.expired;
  } catch (e) {
    // diabaikan, caller menangani null
  }
  return null;
}

async function checkAccountFull(domain, auth, username, type) {
  try {
    return await cekByDomain(domain, username, type);
  } catch (e) {
    return null;
  }
}

module.exports = { deltrojan, delvless, delvmess, delssh, checkAccountExpiry, checkAccountFull };
