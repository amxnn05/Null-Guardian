const { Schema, model } = require("mongoose")

const WelcomeSchema = new Schema({
    guildId: { type: String, required: true, unique: true },
    channelId: { type: String, default: null },
    enabled: { type: Boolean, default: false }

})
module.exports = model("Welcomeconfig", WelcomeSchema);

