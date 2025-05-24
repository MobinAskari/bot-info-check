import { UNPROTECTED_MAIN_INSTANCE_OF_BOT } from "./bot"

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
