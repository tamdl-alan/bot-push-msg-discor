const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('tam')
    .setDescription('Gửi tin nhắn theo tên bạn')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Nội dung')
        .setRequired(true))
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken('MTM4OTA5NTUyMzE5NzEyODc4NA.GsH7oi.4_qgdWR2VHBSn0axawWKIzGOykOYptgWmZU43A');

(async () => {
  try {
    console.log('⏳ Registering slash command...');
    await rest.put(
      Routes.applicationCommands('1389095523197128784'),
      { body: commands },
    );
    console.log('✅ Slash command registered!');
  } catch (err) {
    console.error(err);
  }
})();
