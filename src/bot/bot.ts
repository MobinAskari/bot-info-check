import "dotenv/config"
import { Bot } from "grammy"
import { UserFromGetMe } from "grammy/types"

export const BOT_INFO_FROM_BOT_INIT: UserFromGetMe = {
	can_connect_to_business: false,
	can_join_groups: false,
	can_read_all_group_messages: false,
	has_main_web_app: false,
	is_bot: true,
	supports_inline_queries: false,
	first_name: "IDK",
	username: "idk",
	id: 7146714836
}

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
	console.log(ctx.message)
})
