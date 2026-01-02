const { EmbedBuilder } = require("discord.js")
const GateConfig = require('../../schemas/gateSchema');
module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        try {
            const data = await GateConfig.findOne({ guildId: member.guild.id });
            if (!data || !data.leaveEnabled) return;
            const leavechannel = member.guild.channels.cache.get(data.leaveChannelId);
            if (!leavechannel) return;

            const leaveEmbed = new EmbedBuilder()
                .setColor('#FF1493')
                .setTitle('A Son of a bitch leaves!')
                .setDescription(`Fuck U!! ${member}, Don't join **${member.guild.name}** ever!`)
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp();

            await welcomechannel.send({ embeds: [leaveEmbed] });
        } catch (err) {
            console.log("Failed to send join message: ", err);
        }
    }
};