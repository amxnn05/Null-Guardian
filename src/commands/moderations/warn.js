const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a member in the server.'),
    async execute(interaction, client) {
        // Command execution logic goes here
    }
};