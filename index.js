require('dotenv').config();
const { Client, Collection, GatewayIntentBits, Partials, REST, Routes, InteractionType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
});

client.commands = new Collection();

// Load commands
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

// Register slash commands
client.once('ready', async () => {
    // Default text watermark (no ASCII art)
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    console.log(`${yellow}PURGY${reset} Discord Bot - by fahim28_#0\n`);

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );
        // Box with registered commands
        const commandNames = commands.map(cmd => `• /${cmd.name}`).join('\n');
        const boxWidth = Math.max(...commands.map(cmd => cmd.name.length)) + 8;
        const border = '═'.repeat(boxWidth);
        console.log(`╔${border}╗`);
        console.log(`║ Registered Commands${' '.repeat(boxWidth - 20)}║`);
        console.log(`╠${border}╣`);
        commands.forEach(cmd => {
            const line = ` /${cmd.name}`;
            console.log(`║${line.padEnd(boxWidth)}║`);
        });
        console.log(`╚${border}╝`);
        console.log('✅ Slash commands registered.');
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
});

// Interaction handler
client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ApplicationCommand && interaction.type !== InteractionType.MessageComponent) return;
    try {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            await command.execute(interaction, client);
        } else if (interaction.isStringSelectMenu()) {
            // Handle help select menu
            const help = require('./commands/help');
            await help.handleSelect(interaction, client);
        }
    } catch (error) {
        console.error('💥', error);
        // Fix: wrap await in an async IIFE to avoid SyntaxError
        (async () => {
            try {
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: '❌ An error occurred while executing this command.', ephemeral: true });
                } else {
                    await interaction.reply({ content: '❌ An error occurred while executing this command.', ephemeral: true });
                }
            } catch (e) {
                // Ignore further errors
            }
        })();
    }
});

client.login(process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);
