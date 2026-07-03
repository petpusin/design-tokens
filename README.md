# @petpusin/design-tokens

Shared Tailwind color tokens — single source of truth, published as a private npm package via GitHub Packages.

## ก่อน publish — ต้องทำก่อน

`colors.js` มี 4 จุดที่ยัง marked `_conflictNote` อยู่ (`purpleDeep`, `redBrand.400`, `yellowBrand.50/.100`, `dark.input2`) — เลือกค่าที่ต้องการแล้วลบ comment ทิ้งก่อน tag v1.0.0 จริง

## Publish

```bash
# แทน YOUR_GITHUB_USERNAME ในไฟล์ package.json และ .npmrc ก่อน
npm login --registry=https://npm.pkg.github.com
# username: GitHub username ของคุณ
# password: personal access token (ไม่ใช่รหัส GitHub ปกติ)

npm version 1.0.0
npm publish
```

## ใช้งานใน Next.js + Tailwind v3

```bash
# ในโปรเจกต์ที่จะใช้
echo "@petpusin:registry=https://npm.pkg.github.com" >> .npmrc
npm login --registry=https://npm.pkg.github.com
npm install @petpusin/design-tokens
```

```js
// tailwind.config.js
const designTokens = require('@petpusin/design-tokens/tailwind-preset');

module.exports = {
  presets: [designTokens],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
};
```

ใช้ classes ได้เลย: `bg-primary`, `bg-purpleBrand-500`, `text-neutralPrimary-700`, `bg-danger-hover` ฯลฯ

## อัพเดตสีในอนาคต

1. แก้ `colors.js`
2. `npm version patch` (หรือ `minor`/`major` ตามความเหมาะสม)
3. `npm publish`
4. ในแต่ละ repo ที่ใช้: `npm update @petpusin/design-tokens` (ไม่ auto-sync โดยตั้งใจ — กันสีเปลี่ยนกะทันหันในแอปที่ยังไม่พร้อม)
