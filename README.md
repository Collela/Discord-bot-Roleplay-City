# Discord Bot Documentation

## Overview
This bot is specifically built for GTA Roleplay cities and connects to a MySQL database (managed via HeidiSQL) to monitor real-time updates across several important tables. Its main function is to detect and log any changes in these tables, posting the updates directly into designated Discord channels.

The bot fetches new data from the database every 10 seconds, ensuring that only newly added or updated records are posted to the Discord channels, avoiding any duplication. Each database table is linked to a specific channel, where relevant updates—such as new user registrations or in-game transactions—are shared in real-time, helping server admins stay informed about critical in-game events.

## Features
* Fetches and posts new user identities from the database.
* Fetches and posts new phone messages from the database.
* Configurable channels for sending data.
* Connects to HeidSQL database using async/await for efficient data handling.

## Requirements
* Node.js (version 16 or higher)
* Discord.js library
* mysql2 library

## Setup

### 1. Clone the repository
```bash 
git clone https://github.com/your-repo/discord-bot.git
cd discord-bot
```

### 2. Install dependencies
```bash 
npm install
```

### 3. Configuration
Create a config.js file inside the config/ directory with the following structure:
```bash 
require('dotenv').config();

module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  dbConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE,
  },
  channels: {
    userIdentities: 'YOUR_CHANNEL_ID',
    phoneMessages: 'YOUR_CHANNEL_ID',
  },
};
```
* discordToken: Your Discord bot token.
* dbConfig: HeidSQL database connection details.
* channels: The IDs of the channels where user identities and phone messages will be posted.

### 4. Run the bot
```bash 
npm start
```
The bot will connect to the database and start fetching data every 10 seconds.

## How It Works
`` connectDatabase() ``
This function establishes a connection with the HeidSQL database using the credentials specified in the config.js file. If the connection fails, an error message will be logged.

`` postUserIdentities(channel) ``
* Fetches new phone messages from the database using the fetchNewPhoneMessages() utility function.
* Formats the data and sends it to the specified Discord channel.

Example of a message posted:
```bash 
FROM: 12345, FOR: 67890, Menssage: Hello!, READ: false, Date: 2024-09-12
```
`` client.once('ready') ``
* Triggered when the bot is successfully logged into Discord.
* Fetches the specified channels and starts the interval to check for new data every 10 seconds.

## Utilities
`` fetchNewUserIdentities(connection) ``
This utility function fetches new entries from the `` vrp_user_identities `` table and returns an array of identities. It ensures that only new records are retrieved to avoid posting duplicate data.

`` fetchNewPhoneMessages(connection) ``
This utility function fetches new entries from the `` phone_messages `` table and returns an array of messages. Only new messages are returned, avoiding duplicates.

## Long-term implementations
### 1.Notifications for Important In-Game Events
* Purchases and Transactions: Monitor tables related to store purchases, bank transactions, or money transfers between players. The bot could notify admins about large transactions, rare items bought, or unusual sales.
* Crime Events: Send alerts for suspicious activities, such as bank robberies, police chases, or shootouts. This could be achieved by monitoring player actions or specific crime-related tables.
### 2.Rule Violations and Penalties Log System
* Rule Violations: Add monitoring for rule violations, such as combat logging, VDM (Vehicle Deathmatch), or RDM (Random Deathmatch), generating automatic reports in Discord about players involved and violation details.
* Automatic Penalty System: Expand the bot to automatically apply penalties in-game, like temporary bans or fines, if severe violations are detected.
### 3.Economy Monitoring and Balancing
* Economy Reports: Generate periodic reports on the server’s economy, such as the total money in circulation, total items in players’ inventories, and the general economic health of the city.
* Inflation Monitoring: Implement alerts to detect activities that could lead to inflation or economic imbalance in the server.
### 4.Integration with Admin Logs
* Admin Commands: Add admin commands that allow administrators to query specific information directly from Discord, such as a player’s status, punishment history, or inventory.
* Staff Actions Log: Monitor admin and moderator actions on the server and generate logs of each administrative action (kick, ban, unban, etc.) in Discord.
### 5.Custom Alert System
* Allow administrators to set custom alerts based on specific conditions, like “notify me if someone accumulates more than 1 million dollars” or “send an alert if there are more than 10 bank transactions in an hour.”
### 6.Player Behavior Analysis
* Activity Analysis: The bot could provide insights into each player’s online time, how often they join and leave the server, or which times are the city’s busiest.
* Player Performance Reports: Automatically send reports of players with exemplary behavior, based on criteria like hours played without violations, number of jobs completed, etc.
### 7.Death Log System
* Death Log: Create a system that automatically logs player deaths, including who killed whom, when, and how. This can be used to monitor and resolve issues like RDM or VDM.
### 8.Web Dashboard for Admins
* Control Interface: Develop a web dashboard where administrators can view logs and reports in an organized way, with filters and charts.
* Log History: Implement a log history accessible through the dashboard, allowing retroactive queries of events and specific player information.

These implementations could significantly enhance the bot’s utility, turning it into a central tool for managing GTA Roleplay servers while automating critical administrative tasks efficiently.