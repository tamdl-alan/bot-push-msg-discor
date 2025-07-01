require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const channelId = '1383995748479401997'; // Thay bằng ID kênh Discord

client.on('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);

  // Lên lịch gửi tin nhắn lúc 16h mỗi ngày
  schedule.scheduleJob('0 16 * * 1-5', () => {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.send(
        `⏰ Đã đến 16h!\n\n` +
        `Hãy nhớ kiểm tra các công việc của bạn và hoàn thành chúng nhé! 💪\n\n` +
        `1> 📌 Daily report trên sheet internal [Daily report](https://docs.google.com/spreadsheets/d/1sv49utfAbiMVuqflAItapMmMpJSuj1h2T7weGug1Dxs/edit?gid=1476772392#gid=1476772392) \n` +
        `2> 📌 Rule deployment [Deployment history](https://docs.google.com/spreadsheets/d/1GOvnOKYSAis738mhg0qEfEymRWbsWQ5Z67qgRkf6-TE/edit?gid=1979966378#gid=1979966378)\n` +
        `3> 📌 Nếu có release thì check lại [Release Note](https://docs.google.com/spreadsheets/d/1G7GVl7yBEqmTk0zOQfockFsnH8TxNBzrKexArsHGrJY/edit?gid=313226932#gid=313226932)\n` +
        `4> 📌 Kiểm tra log time trên [Jira](https://r1repo.atlassian.net/plugins/servlet/ac/com.tda.timesheet.report/main?project.key=IPLATBILL&project.id=10013)\n`
        `5> 📌 Link [Jinken](http://192.168.0.232:8080/)\n`
        `6> 📌 Khi xong task thì nhớ update status trên [Redmine](http://35.73.146.111:4000/projects/cis/issues)\n`
);

    } else {
      console.error('❌ Không tìm thấy kênh để gửi tin nhắn.');
    }
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const msg = interaction.options.getString('message');
  if (interaction.commandName === 'tam') {
    await interaction.reply(`📢 @${interaction.user.username} nói: "${msg}"`);
  }
});

client.login(process.env.BOT_TOKEN);
