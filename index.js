const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const axios = require('axios');

client.on('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const msg = interaction.options.getString('message');
  if (interaction.commandName === 'tam') {
    await interaction.reply(`📢 @${interaction.user.username} nói: "${msg}"`);
  }

  // Gửi lên Google Sheets
    try {
      await sendToSheet(interaction.user.username, msg);
    } catch (err) {
      console.error('❌ Lỗi khi gửi lên Google Sheets:', err.message);
    }
});

client.login('MTM4OTA5NTUyMzE5NzEyODc4NA.GsH7oi.4_qgdWR2VHBSn0axawWKIzGOykOYptgWmZU43A');

async function sendToSheet(username, message) {
  try {
      await axios.post('https://script.google.com/macros/s/AKfycbz1MrJUt0_RIdn-5XsKQj8P5zRAWNLk2D4X6xg1kYDZ5zVlDPtjMU9V06WiBoYszoRv/exec', {
        username,
        message
      });
  } catch (error) {
      console.error('Error sending data to Google Sheets:', error);
      throw error; // Re-throw the error to handle it in the interactionCreate event
  }
}