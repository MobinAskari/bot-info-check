import { webhookCallback } from "grammy"
import { NextRequest } from "next/server"
// Next cannot resolve directly importing the .ts file from /bot, we need to build the bot first
import { UNPROTECTED_MAIN_INSTANCE_OF_BOT } from "../../../../bot-build/src/bot/bot.js"

export const POST = async (req: NextRequest) =>
	await webhookCallback(UNPROTECTED_MAIN_INSTANCE_OF_BOT, "std/http")(req)
