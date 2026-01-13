const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the guild.')
        .addUserOption(option =>
            option.setName('target').setDescription('Member to ban').setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason').setDescription('Reason to ban')
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction, client) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        const member = await interaction.guild.members.fetch(user.id);
        if (!member.bannable) {
            return interaction.reply({ content: 'I cannot ban this user (they may have a higher role).' });
        }
        else {
            await member.ban({ reason });
            await interaction.reply(`**${user.tag}** was banned for: ${reason}`);
        }
    }
};
