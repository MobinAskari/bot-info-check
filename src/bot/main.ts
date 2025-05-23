import { BOT_INFO_FROM_BOT_INIT, UNPROTECTED_MAIN_INSTANCE_OF_BOT } from "./bot"

async function checkProvidedBotInfo() {
	console.log("Attempting to check the provided botInfo...")

	// Regardless of whether we have provided it or not, initialize the bot
	await UNPROTECTED_MAIN_INSTANCE_OF_BOT.init()

	// Get the same info to compare against the locally provided value
	// Because bot.init won't invalidate the provided value
	const botInfo = await UNPROTECTED_MAIN_INSTANCE_OF_BOT.api.getMe()

	// Check whether the provided botInfo object matches the one received from getMe
	if (JSON.stringify(botInfo) !== JSON.stringify(BOT_INFO_FROM_BOT_INIT)) {
		console.error(
			"Invalid BOT_INFO_FROM_BOT_INIT provided\n",
			"FROM getMe:",
			botInfo,
			"\n",
			"USER PROVIDED:",
			BOT_INFO_FROM_BOT_INIT
		)
		throw new Error("Invalid BOT_INFO_FROM_BOT_INIT provided")
	}

	console.log("botInfo was checked successfully...")
}

export const startInPolling = async () => {
	await UNPROTECTED_MAIN_INSTANCE_OF_BOT.start()
}

export const setProductionWebhookEndpoint = async () => {
	if (process.env.NODE_ENV !== "production")
		throw new Error("NODE_ENV is not set to `production`")

	const url = process.env.WEBHOOK_URL

	if (!url)
		throw new Error(
			"WEBHOOK_URL env var is not set and no webhook URL was manually provided either"
		)

	console.log("setting the new webhook URL...")
	await UNPROTECTED_MAIN_INSTANCE_OF_BOT.api.setWebhook(url, {
		secret_token: process.env.SECRET_TOKEN
	})
	console.log(`Successfully set webhook at ${url}`)
}

const main = async () => {
	const { NODE_ENV } = process.env

	await checkProvidedBotInfo()

	switch (NODE_ENV) {
		case "development":
		case "test":
			console.log("Attempting to start the bot in long-polling mode...")
			await startInPolling()
			break

		case "production":
			console.log("Attempting to set the production webhook URL...")
			await setProductionWebhookEndpoint()
			break

		default:
			break
	}
}

main().then(() => {})
