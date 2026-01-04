const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const GateConfig = require('../../schemas/gateSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggle-goodbye-logs')
        .setDescription('toggle logs in leave channel'),
    async execute(interaction, client) {
        const { guildId } = interaction;
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: "you need administrator permission!" })
        }
        try {
            const data = await GateConfig.findOne({
                guildId: guildId
            })
            if (!data || !data.leaveChannelId) {
                return interaction.reply({
                    content: "Please set a channel first."
                })
            }
            data.leaveEnabled = !data.leaveEnabled;
            await data.save();

            return interaction.reply({
                content: `Join messages are now **${data.leaveEnabled ? 'ON' : 'OFF'}**.`
            })
        }
        catch (error) {
            console.log("error occured in toggle-welcome.js", error);
        }
    }
};