const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getBotStats } = require('../utils/stats');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot_info')
        .setDescription('Show bot system info.'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const stats = await getBotStats();
        const embed = new EmbedBuilder()
            .setColor(config.EMBED_COLOR)
            .setTitle('🤖 Bot Info')
            .addFields(
                { name: 'CPU Usage', value: `${stats.cpu}%`, inline: true },
                { name: 'RAM Usage', value: stats.ram, inline: true },
                { name: 'Node.js Version', value: stats.node, inline: true },
                { name: 'Storage', value: stats.disk, inline: false }
            );
        await interaction.editReply({ embeds: [embed] });
    }
};
