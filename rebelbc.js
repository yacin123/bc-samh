const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {console.log(`Logged in as ${client.user.tag}!`);});
const config = require('./config.json');
const prefixbc = config.prefix;-
client.on('message', async message => {  
if(message.author.bot) return;
if(message.channel.type === 'dm') return;
if(!message.guild.members.get(message.author.id).hasPermission('ADMINISTRATOR')) return;
const args = message.content.split(" ").slice(1);
if(message.content.startsWith(prefixbc + 'obc')) {  
message.channel.send(`**:loudspeaker:  تم ارسال هذة الرسالة الى __${message.guild.memberCount}__ مشترك**`);
message.guild.members.forEach(m => { 
m.send(args.replace('[user]', m));
});}
if(message.content.startsWith(prefixbc + 'bc')) {  
message.channel.send(`**:loudspeaker:  تم ارسال هذة الرسالة الى ${message.guild.members.filter(m => m.presence.status !== 'online').size}__ مشترك**`);
message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
m.send(args.replace('[user]', m));
});}
if(message.content.startsWith(prefixbc + 'obc')) {  
var role = message.mentions.roles.first();
if(!role) {message.reply("لا توجد رتبة بهذا الاسم");return;}
if(!args[0]) {
message.channel.send(`قم بمنشنة الرتبة  | ${prefixbc}bcrole @admin message`);
return;}
message.channel.send(`**:loudspeaker:  تم ارسال هذة الرسالة الى __${role.members.size}__ مشترك**`);
message.guild.members.filter(m => m.roles.get(role.id)).forEach(n => {
n.send(args[1].replace('[user]', n));});}
if(message.content.startsWith(prefixbc + "help")) {
const embed = new Discord.RichEmbed() .setColor("RANDOM").setDescription(`**${prefixbc}obc ⇏ لإرسال رسالة إلى جميع أعضاء السيرفر
${prefixbc}bc ⇏ لإرسال رسالة إلى الأعضاء الأونلاين فقط
${prefixbc}bcrole ⇏  لإرسآل رسالة لرتبة محدده 
ex :   ${prefixbc}bcrole @admin message
__تنبية__ : إذا أردت أن تمنشن العضو فقط أكتب بالرسالة
\`[user]\` وسيقوم بإستبدالها بمنشن العضو**`);
message.channel.sendEmbed(embed)}
});
client.login(config.token);
