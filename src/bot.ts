import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import db from "./core/db";
import Users, { IUsers } from "./model/Users";
import { registor } from "./controllers/users";
import {startcreateMenyu, back, createMenyu, coffe_menyu} from './controllers/menyu';
const token = "5303263827:AAG5KveYR8IbjCQ0eXOHSVs3rUeTLaAVM18";

db();

const bot = new TelegramBot(token, {
	polling: true,
});

bot.on("message", async (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text;

	let user: IUsers | null = await Users.findOne({ chat_id: chatId });

	if (!user) {
		user = await Users.create({
			chat_id: chatId,
		});
		bot.sendMessage(
			chatId,
			"Assalomu alaykum botimizga xush kelibsiz iltimos ismingizni kiriting!"
		);
		return;
	} else {
		if (text === "Back") {
			back(bot, msg);
			return;
		}

		if(user.step < 2){
			registor(bot, msg, user)
		} else if (user.role === "admin") {
			if(user.step === 2){
				switch(text){
					case '/createMenyu':
						startcreateMenyu(bot, msg);
						break;
				}
			} else {
				switch(user.step){
					case 3:
						createMenyu(bot, msg)
						break;
				}
			}
		} else {
			if(text === '/menyu'){
				coffe_menyu(bot, msg)
			}
		}	

			
	}
});

// bot.on("callback_query", (query) => {
// 	quiz(bot, query);
// });
