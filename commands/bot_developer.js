const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot_developer')
        .setDescription('Show developer info.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(config.EMBED_COLOR)
            .setTitle('👨‍💻 Bot Developer')
            .addFields(
                { name: 'Discord', value: config.DEVELOPER.username, inline: true },
                { name: 'Contact', value: config.DEVELOPER.contact, inline: true }
            );
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
