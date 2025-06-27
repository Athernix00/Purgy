const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('../config');

const COMMANDS_INFO = {
    purge: {
        description: 'Delete messages between two dates in this channel.',
        usage: '/purge <start> <end> <amount>',
        example: '/purge 2025-05-25 2025-05-26 50'
    },
    ping: {
        description: 'Show bot latency.',
        usage: '/ping',
        example: '/ping'
    },
    bot_info: {
        description: 'Show bot system info.',
        usage: '/bot_info',
        example: '/bot_info'
    },
    bot_developer: {
        description: 'Show developer info.',
        usage: '/bot_developer',
        example: '/bot_developer'
    },
    help: {
        description: 'Show this help menu.',
        usage: '/help',
        example: '/help'
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show help for all commands.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(config.EMBED_COLOR)
            .setTitle('🧼 | Purgy Help')
            .setDescription('Select a command below to see usage and details.');

        const select = new StringSelectMenuBuilder()
            .setCustomId('help_select')
            .setPlaceholder('Choose a command...')
            .addOptions(
                Object.keys(COMMANDS_INFO).map(cmd => ({
                    label: `/${cmd}`,
                    value: cmd,
                    description: COMMANDS_INFO[cmd].description
                }))
            );

        const row = new ActionRowBuilder().addComponents(select);

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    },
    async handleSelect(interaction) {
        const cmd = interaction.values[0];
        const info = COMMANDS_INFO[cmd];
        if (!info) return interaction.reply({ content: 'Unknown command.', ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor(config.EMBED_COLOR)
            .setTitle(`/${cmd}`)
            .setDescription(info.description)
            .addFields(
                { name: 'Usage', value: `\`${info.usage}\`` },
                { name: 'Example', value: `\`${info.example}\`` }
            );
        await interaction.update({ embeds: [embed], components: [] });
    }
};
