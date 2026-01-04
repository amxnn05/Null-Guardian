const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const GateConfig = require('../../schemas/gateSchema');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('good-bye-setup')
        .setDescription('setup your members leave channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send messages to')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const { options, guildId, guild } = interaction;
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "you need administrator permission!" })
        }
        const channel = options.getChannel('channel');
        await GateConfig.findOneAndUpdate(
            { guildId: guildId },
            { leaveChannelId: channel.id, leaveEnabled: true },
            { upsert: true, new: true }
        )

        await interaction.reply({
            content: `Channel is set in ${channel}. ;)`,
            // ephemeral: true
        })



    }

};
