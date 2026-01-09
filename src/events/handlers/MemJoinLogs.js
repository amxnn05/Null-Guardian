const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const gateSchema = require('../../schemas/gateSchema');
const file = new AttachmentBuilder('./src/assets/gates/flower.gif');
module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client, interaction) {
        try {
            const data = await gateSchema.findOne({ guildId: member.guild.id });
            if (!data || !data.joinEnabled) return;

            const welcomechannel = member.guild.channels.cache.get(data.joinChannelId);
            if (!welcomechannel) return;

            const welcomeEmbed = new EmbedBuilder()
                .setColor('#9f0548')
                .setTitle('**Welcome !!**')
                .setDescription(`Nice meeting yuhh!! & welcome to **${member.guild.name}**!`)
                .setThumbnail(member.user.displayAvatarURL())
                .setImage('attachment://flower.gif')
                .setTimestamp();

            await welcomechannel.send({ content: `Hieee ${member}`, embeds: [welcomeEmbed], files: [file] });
        } catch (err) {
            console.log("Failed to send join message: ", err);
        }
    }
}; 