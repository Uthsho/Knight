module.exports = {
    name: "joinchannel",
    category: "music",
    description: "Make the bot join a channel!",
    aliases: ["jc","joinc"],
    Usage: "joinchannel",
    run: (client, message, args) => {
        return new Promise((resolve, reject) => {
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
            voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
        });
    }
}
