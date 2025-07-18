/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b3a75ff',   // メイン
        accent: '#ffffffff',    // 返信コメント
        accent2: '#f3f3ffff',    // 返信コメントの返信
        secondary: '#ffffffff', // イエロー
        text: '#4b5563',      // 
        text2: '#a5a6a7ff',      // 
        room: '#ffe3ecff',      // 
      },
    },
  },
  plugins: [],
};
