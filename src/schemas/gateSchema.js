const { Schema, model, models } = require("mongoose")

const GateSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
    joinChannelId: { type: String, default: null },
    leaveChannelId: { type: String, default: null },
    joinEnabled: { type: Boolean, default: false },
    leaveEnabled: { type: Boolean, default: false }
})
module.exports = models.GateConfig || model('GateConfig', GateSchema);

