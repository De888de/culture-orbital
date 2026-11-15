import { Telegram } from 'puregram';
import { config } from 'dotenv';

config();

if (!process.env.BOT_TOKEN) {
  console.error('BOT_TOKEN не найден');
  process.exit(1);
}

const bot = Telegram.fromToken(process.env.BOT_TOKEN);
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://example.com';

bot.on('message', async (ctx) => {
  const text = ctx.text;
  if (text === '/start' || text === '/orbital') {
    await ctx.send('Добро пожаловать на Орбиталь.\n\nНажми кнопку, чтобы войти в систему управления энергией.', {
      reply_markup: {
        inline_keyboard: [[
          { text: 'Открыть Орбиталь', web_app: { url: WEBAPP_URL } }
        ]]
      }
    });
  }
});

bot.startPolling()
  .then(() => console.log('Culture Orbital Bot запущен'))
  .catch(err => console.error(err));
