![Purgy](https://capsule-render.vercel.app/api?type=waving&color=FFA500&height=200&section=header&text=Purgy&fontSize=80&fontAlignY=35&animation=none&fontColor=FFFFFF)

---

> **Bot Name**: `Purgy`  
> **Developer**: `fahim28_#0`  
> **Built With**: `discord.js`, `Node.js`
> **Purpose**: Purge messages within a specific time range, monitor bot stats, and provide simple utilities.

---

## 📜 Commands

| Command | Description |
|--------|-------------|
| `/purge <start> <end> <amount>` | Deletes messages between the specified date/time range. *(Max 100 messages)* |
| `/ping` | Displays the bot's current latency. |
| `/bot_info` | Shows CPU usage, memory usage, and Node.js version. |
| `/bot_developer` | Shows developer info including Discord ID. |
| `/help` | Shows all available commands with descriptions. |

---

## 📌 Purge Command Example

**Usage:**
```bash
/purge 
1st_time: 25 May 2025 
2nd_time: 22 June 2025 
value: 100
````

**Description:**
Deletes **100 messages** between **25 May 2025** and **22 June 2025** in the current channel.

---

## 📊 `/bot_info` Output Includes:

* 🧠 **CPU Usage**
* 💾 **RAM Usage**
* ⚙️ **Node.js Version**
* 🧮 **Storage Usage**

---

## 👤 `/bot_developer` Info:

* 👨‍💻 **Developer**: `fahim28_#0`
* 🔗 **Contact**: Open issue or reach via Discord

---

## 🧠 `/help` Command

Displays an **interactive command list**, pinging each command with usage details. Great for onboarding new mods or admins!

---

## ⚙️ Setup

1. **Clone the Project**

```bash
git clone https://github.com/your-username/purgy.git
cd purgy
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure `.env`**

```env
DISCORD_TOKEN=your-bot-token
```

4. **Run the Bot**

```bash
node index.js
```

---

## 🤖 Technology Used

* **Discord.js v14**
* **Node.js**
* **Systeminformation**

---

## ✅ To-Do / Future Plans

* [ ] Add log channel support
* [ ] Add role-restricted purge limits
* [ ] Dashboard for usage statistics

---

## 🧼 Purgy — One Clean Channel at a Time!

> © 2025 • Made with ❤️ by `fahim28_#0`
