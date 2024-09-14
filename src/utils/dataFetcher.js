let lastUserId = 0;
let lastMessageId = 0;

async function fetchNewUserIdentities(dbConnection) {
  try {
    const [rows] = await dbConnection.execute(
      'SELECT * FROM vrp_user_identities WHERE user_id > ? ORDER BY user_id ASC',
      [lastUserId]
    );

    if (rows.length > 0) {
      lastUserId = rows[rows.length - 1].user_id;  // Atualiza para o último ID processado
    }

    return rows;
  } catch (error) {
    console.error('Erro ao buscar novas identidades de usuários:', error);
    return [];
  }
}

async function fetchNewPhoneMessages(dbConnection) {
  try {
    const [rows] = await dbConnection.execute(
      'SELECT * FROM phone_messages WHERE id > ? ORDER BY id ASC',
      [lastMessageId]
    );

    if (rows.length > 0) {
      lastMessageId = rows[rows.length - 1].id;  // Atualiza para o último ID processado
    }

    return rows;
  } catch (error) {
    console.error('Erro ao buscar novas mensagens:', error);
    return [];
  }
}

module.exports = {
  fetchNewUserIdentities,
  fetchNewPhoneMessages,
};