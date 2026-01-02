const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const Welcomeconfig = require('../../schemas/welcomeSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('toggle-welcome-logs')
		.setDescription('toggle logs in welcome channel'),
	async execute(interaction, client) {
		const { guildId } = interaction;
		if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
			return interaction.reply({ content: "you need administrator permission!" })
		}
		try {
			const data = await Welcomeconfig.findOne({
				guildId: guildId
			})
			if (!data || !data.channelId) {
				return interaction.reply({
					content: "Please set a channel first."
				})

				data.enabled = !data.enabled;
				await data.save();

				return interaction.reply({
					content: `Join messages are now **${data.enabled ? 'ON' : 'OFF'}**.`
				})
			}
		}

		catch (error) {
			console.log("error occured in welcome.js", error);
		}
	}
};