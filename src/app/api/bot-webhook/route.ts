import { webhookCallback } from "grammy"
import { NextRequest } from "next/server"
// Next cannot resolve directly importing the .ts file from /bot, we need to build the bot first
import { UNPROTECTED_MAIN_INSTANCE_OF_BOT } from "../../../../bot-build/src/bot/bot.js"

if (process.env.NODE_ENV === "production" && !process.env.SECRET_TOKEN)
	throw new Error(
		"SECRET_TOKEN is undefined. This env var is mandatory if NODE_ENV is set to'production'"
	)

export const POST = async (req: NextRequest) =>
	await webhookCallback(UNPROTECTED_MAIN_INSTANCE_OF_BOT, "std/http", {
		secretToken: process.env.SECRET_TOKEN
	})(req)
