import TelegramBot, { Message } from "node-telegram-bot-api";
import Users, { IUsers } from "../model/Users";


export const registor = async (bot: TelegramBot, msg: Message, user: IUsers | null) => {
    const chatId = msg.chat.id;
    const text = msg.text
    if (user?.step === 0) {
        user = await Users.findOneAndUpdate(
            {
                chat_id: chatId,
            },
            {
                username: text,
                step: 1,
            },
            {
                new: true,
            }
        );

        bot.sendMessage(
            chatId,
            `Barakalla, ${user?.username}! Endi telefon raqamingizni kiriting!`,
            {
                reply_markup: {
                    one_time_keyboard: true,
                    resize_keyboard: true,
                    keyboard: [
                        [
                            {
                                text: "send Phone🧐",
                                request_contact: true,
                            },
                        ],
                    ],
                },
            }
        );
    } else if (user?.step === 1) {
        const contact = msg.contact;

        if (!contact) {
            bot.sendMessage(chatId, `Raqamingizni kiriting`);
            return;
        }

        await Users.updateOne(
            { chat_id: chatId },
            {
                phoneNumber: Number(contact.phone_number),
                step: 2,
            }
        );

        bot.sendMessage(
            chatId,
            `Sizning ismingiz: ${user?.username}, raqamingiz: ${contact.phone_number}`
        );
    }
}

