import TelegramBot, {Message} from "node-telegram-bot-api";
import Menyu, {IMenyu} from "../model/menyu";
import Users from "../model/Users";

export const startcreateMenyu = async (bot: TelegramBot, msg: Message) => {
    try{
        const chatId = msg.chat.id;
        console.log("yetib kevotimi yomim");

        await Users.updateOne({chat_id: chatId},{step: 3});
        
        

        bot.sendMessage(chatId, `Iltimos menyuni kiriting`,{
            reply_markup:{
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "Back"
                        }
                    ]
                ]
            }
        }
        );
    }catch(error){
        console.log(error);
    }
};

export const back = async (bot: TelegramBot, msg: Message) => {
    const chatid = msg.chat.id;

    await Users.updateOne({chat_id: chatid}, {step: 2});

    bot.sendMessage(chatid, `Menyu bekor qilindi`, {
        reply_markup: {
            remove_keyboard: true
        },
    })
};


export const createMenyu = async (bot: TelegramBot, msg: Message) => {
    try{
        const text = msg.text;
        const menyu = text?.split("?")
        const chatId = msg.chat.id;

        if(!text || !menyu || menyu.length < 3){
            bot.sendMessage(chatId, 'Menyuni to`g`ri kiritmadingiz');
            return;
        };
        
        const menu: IMenyu = await  Menyu.create({
            coffename: menyu[0],
            description: menyu[1].split(" "),
            price: menyu[2],
       });
       await Users.updateOne({
           chat_id: chatId,
           step: 2,
       });

       bot.sendMessage(chatId, 'Menyu yasaldi!', {
           reply_markup: {
                remove_keyboard: true,
            }
       })

    }catch(error){ 
        console.log(error);
    }
};

export const coffe_menyu = async(bot: TelegramBot, msg: Message) => {
	try{
		const chatId = msg.chat.id;

		const menyu: IMenyu | null = await Menyu.findOne({order: 1})
        
		if(!menyu){ 
            bot.sendMessage(chatId, 'botda hali menyu yo`q');
			return;
		}else{
            console.log("hello");
        }        
        
        const buttons = [];
        let btn = [];
        
        for(let i of menyu.description){
            btn.push({
                text: menyu.description,
                collback_data: `${menyu.description}/${menyu.price}/2`,
            });
        }

        buttons.push(btn)

        bot.sendMessage( 
            chatId,
            `<b>1.Savol\n\n${menyu.coffename}<b>
            `,
                {
                    reply_markup: {
                        resize_keyboard:true,
                        inline_keyboard: buttons,
                    },
                }
            )

	}catch (error){
        console.log(Error);
		
	}
};



// if{
// 	bot.sendMessage(chatId,
// 		`<b>1.Savol\n\n${menyu.coffename}</b>`,
// 		{
			// parse_mode: "HTML",
			// reply_markup: {
			// 	resize_keyboard:true,
			// 	inline_keyboard: [
			// 		[
			// 			{text: 'coffe'}
			// 		]]
			// }
// 		}
// 		)
// };