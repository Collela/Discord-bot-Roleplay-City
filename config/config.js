require('dotenv').config();

module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  dbConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE,
  },
  channels: {
    userIdentities: '1283859448070275173',
    phoneMessages: '1283860711709347901',
  },
};