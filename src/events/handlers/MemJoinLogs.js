const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const gateSchema = require('../../schemas/gateSchema');
const file = new AttachmentBuilder('./src/assets/gates/welcome.jpeg');
module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        try {
            const data = await gateSchema.findOne({ guildId: member.guild.id });
            if (!data || !data.joinEnabled) return;

            const welcomechannel = member.guild.channels.cache.get(data.joinChannelId);
            if (!welcomechannel) return;

            const welcomeEmbed = new EmbedBuilder()
                .setColor('#9f0548')
                .setTitle('Welcome!')
                .setDescription(`Hiee ${member}, nice meeting yuhh!! & welcome to **${member.guild.name}**!`)
                .setThumbnail(member.user.displayAvatarURL())
                .setImage('attachment://welcome.jpeg')
                .setTimestamp();


            await welcomechannel.send({ embeds: [welcomeEmbed], files: [file] });
        } catch (err) {
            console.log("Failed to send join message: ", err);
        }
    }
};