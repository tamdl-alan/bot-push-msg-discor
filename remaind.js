require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const channelId = '1383995748479401997'; // ID kênh Discord

client.on('ready', async () => {
  console.log(`Bot is online as ${client.user.tag}`);

  const channel = await client.channels.fetch(channelId);
  if (channel) {
    await channel.send(
      `⏰ Đã đến lúc kiểm tra thông tin ${new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()}!\n` +
      `Hãy nhớ kiểm tra các công việc của bạn và hoàn thành chúng nhé! 💪\n\n` +
      `1> 📌 Daily report trên sheet internal [Daily report](https://docs.google.com/spreadsheets/d/1sv49utfAbiMVuqflAItapMmMpJSuj1h2T7weGug1Dxs/edit?gid=1476772392#gid=1476772392) \n` +
      `2> 📌 Nếu có release thì check lại [Release Note](https://docs.google.com/spreadsheets/d/1G7GVl7yBEqmTk0zOQfockFsnH8TxNBzrKexArsHGrJY/edit?gid=313226932#gid=313226932)\n` +
      `3> 📌 Kiểm tra log time trên [Jira](https://r1repo.atlassian.net/plugins/servlet/ac/com.tda.timesheet.report/main?project.key=IPLATBILL&project.id=10013)\n` +
      `4> 📌 Link [Jinken](http://192.168.0.232:8080/)\n` +
      `5> 📌 Khi xong task thì nhớ update status trên [Redmine](http://35.73.146.111:4000/projects/cis/issues)\n\n\n`
    );
    console.log(`✅ Tin nhắn đã được gửi thành công [${new Date()}]!`);
  } else {
    console.error('❌ Không tìm thấy kênh để gửi tin nhắn.');
  }

  client.destroy(); // Logout sau khi gửi xong để job kết thúc
});

client.login(process.env.BOT_TOKEN);

const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running!');
}).listen(PORT, () => {
  console.log(`HTTP server is running on port ${PORT}`);
});