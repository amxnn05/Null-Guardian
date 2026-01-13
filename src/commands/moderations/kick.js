const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server.')
        .addUserOption(option =>
            option.setName('target').setDescription('Member to kick').setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason').setDescription('Reason to kick')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id);
        if (!member.kickable) {
            return interaction.reply({ content: 'I cannot kick this user (they may have a higher role).' });
        }
        else {
            await member.kick({ reason });
            await interaction.reply(`**${user.tag}** was banned for: ${reason}`);
        }
    }
};
