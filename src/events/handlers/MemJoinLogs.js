const { EmbedBuilder } = require('discord.js');
const gateSchema = require('../../schemas/gateSchema');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        try {
            const data = await gateSchema.findOne({ guildId: member.guild.id });
            if (!data || !data.joinEnabled) return;

            const welcomechannel = member.guild.channels.cache.get(data.joinChannelId);
            if (!welcomechannel) return;

            const welcomeEmbed = new EmbedBuilder()
                .setColor('#FF1493')
                .setTitle('Welcome!')
                .setDescription(`Hello ${member}, welcome to **${member.guild.name}**!`)
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp();

            await welcomechannel.send({ embeds: [welcomeEmbed] });
        } catch (err) {
            console.log("Failed to send join message: ", err);
        }
    }
};