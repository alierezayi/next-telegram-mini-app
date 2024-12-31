'use server'

import TelegramBot from "node-telegram-bot-api"

const token = process.env.TELEGRAM_BOT_TOKEN
const webAppUrl = process.env.NEXT_PUBLIC_WEBAPP_URL

if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is not set')
  throw new Error('TELEGRAM_BOT_TOKEN is not set')
}

if (!webAppUrl) {
  console.error('NEXT_PUBLIC_WEBAPP_URL is not set')
  throw new Error('NEXT_PUBLIC_WEBAPP_URL is not set')
}

const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  
  bot.sendMessage(chatId, 'Welcome! Click the button below to open the Mini App', {
    reply_markup: {
      keyboard: [[{ text: 'Open Mini App', web_app: { url: webAppUrl } }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  })
})

export async function startBot() {
  console.log('Bot is running...')
  // This function doesn't need to do anything else,
  // as the bot is initialized when this module is imported
}

