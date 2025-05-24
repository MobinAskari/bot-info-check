import "dotenv/config"
import { Bot } from "grammy"
import { BOT_INFO_FROM_BOT_INIT } from "./botInfo";

export const UNPROTECTED_MAIN_INSTANCE_OF_BOT = new Bot(
	process.env.BOT_TOKEN!,
	{
		botInfo: BOT_INFO_FROM_BOT_INIT
	}
)

export const errorProtectedBot = UNPROTECTED_MAIN_INSTANCE_OF_BOT.errorBoundary(
	(err) => {
		console.error(err)
	}
)

errorProtectedBot.on("message", async (ctx) => {
	const botInfo = JSON.stringify(UNPROTECTED_MAIN_INSTANCE_OF_BOT.botInfo, null, 2);
	await ctx.reply(botInfo);
	throw new Error(botInfo);
});
