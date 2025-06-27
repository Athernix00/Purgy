const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { parseDate } = require('../utils/date');
const config = require('../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete messages between two dates in this channel.')
        .addStringOption(opt =>
            opt.setName('start')
                .setDescription('Start date/time (e.g. "2025-05-25")')
                .setRequired(true))
        .addStringOption(opt =>
            opt.setName('end')
                .setDescription('End date/time (e.g. "2025-05-26")')
                .setRequired(true))
        .addIntegerOption(opt =>
            opt.setName('amount')
                .setDescription('Max messages to delete (1-100)')
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        // Permission check
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({ content: '❌ You need Manage Messages permission.', ephemeral: true });
        }
        if (!interaction.guild.members.me.permissionsIn(interaction.channel).has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({ content: '❌ I need Manage Messages permission in this channel.', ephemeral: true });
        }

        const startStr = interaction.options.getString('start');
        const endStr = interaction.options.getString('end');
        const amount = interaction.options.getInteger('amount');

        const start = parseDate(startStr);
        const end = parseDate(endStr);

        if (!start || !end || start > end) {
            return interaction.reply({ content: '❌ Invalid date(s). Please use formats like "2025-05-25".', ephemeral: true });
        }

        await interaction.deferReply({ ephemeral: true });

        // Fetch messages
        let fetched;
        try {
            fetched = await interaction.channel.messages.fetch({ limit: 100 });
        } catch {
            return interaction.editReply('❌ Failed to fetch messages.');
        }

        const toDelete = fetched.filter(msg => {
            const created = msg.createdAt;
            return created >= start && created <= end;
        }).first(amount);

        if (!toDelete.length) {
            return interaction.editReply('No messages found in that date range.');
        }

        try {
            await interaction.channel.bulkDelete(toDelete, true);
            const embed = new EmbedBuilder()
                .setColor(config.EMBED_COLOR)
                .setTitle('Purge Complete')
                .setDescription(`🗑️ Deleted ${toDelete.length} message(s) from <t:${Math.floor(start.getTime()/1000)}:f> to <t:${Math.floor(end.getTime()/1000)}:f>.`);
            await interaction.editReply({ embeds: [embed] });
        } catch (err) {
            await interaction.editReply('❌ Failed to delete messages. I can only delete messages younger than 14 days.');
        }
    }
};
