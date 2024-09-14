async function getDataCommand(interaction, dbConnection) {
    try {
      const [rows] = await dbConnection.execute('SELECT * FROM sua_tabela LIMIT 10');
  
      let response = 'Dados do Banco de Dados:\n';
      rows.forEach(row => {
        response += `ID: ${row.id}, Nome: ${row.nome}\n`;
      });
  
      await interaction.reply(response);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      await interaction.reply('Ocorreu um erro ao buscar os dados.');
    }
  }
  
  module.exports = { getDataCommand };