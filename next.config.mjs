/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PROXMOX_URL: process.env.PROXMOX_URL,
    PROXMOX_TOKEN_ID: process.env.PROXMOX_TOKEN_ID,
    PROXMOX_TOKEN_SECRET: process.env.PROXMOX_TOKEN_SECRET,
    MOCK: process.env.MOCK,
  },
};
export default nextConfig;
