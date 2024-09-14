const { Client, GatewayIntentBits } = require('discord.js');
const mysql = require('mysql2/promise');
const config = require('../config/config');
const { fetchNewUserIdentities, fetchNewPhoneMessages } = require('./utils/dataFetcher');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let dbConnection;

async function connectDatabase() {
  try {
    dbConnection = await mysql.createConnection(config.dbConfig);
    console.log('Conectado ao banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

async function postUserIdentities(channel) {
  const newIdentities = await fetchNewUserIdentities(dbConnection);

  if (newIdentities.length > 0) {
    const messages = newIdentities.map(identity => 
      `ID: ${identity.user_id}, Nome: ${identity.firstname} ${identity.name}, Registro: ${identity.registration}, Telefone: ${identity.phone}, Idade: ${identity.age}`
    ).join('\n');
    
    await channel.send(messages);
  }
}

async function postPhoneMessages(channel) {
  const newMessages = await fetchNewPhoneMessages(dbConnection);

  if (newMessages.length > 0) {
    const messages = newMessages.map(msg => 
      `De: ${msg.transmitter}, Para: ${msg.receiver}, Mensagem: ${msg.message}, Lida: ${msg.isRead}, Data: ${msg.time}`
    ).join('\n');
    
    await channel.send(messages);
  }
}

client.once('ready', async () => {
  console.log(`Logado como ${client.user.tag}!`);
  
  const userIdentitiesChannel = await client.channels.fetch(config.channels.userIdentities);
  const phoneMessagesChannel = await client.channels.fetch(config.channels.phoneMessages);

  // A cada 10 segundos, o bot verifica por novos dados
  setInterval(async () => {
    await postUserIdentities(userIdentitiesChannel);
    await postPhoneMessages(phoneMessagesChannel);
  }, 10000); // 10 segundos
});

client.login(config.discordToken);
connectDatabase();