const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const GateConfig = require('../../schemas/gateSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome-setup')
        .setDescription('setup your welcome message')
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
            { joinChannelId: channel.id, joinEnabled: true },
            { upsert: true, new: true }
        )

        await interaction.reply({
            content: `Channel is set in ${channel}. ;)`,
            // ephemeral: true
        })



    }

};