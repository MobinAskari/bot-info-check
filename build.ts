import "dotenv/config";
import { writeFileSync } from "node:fs";
import { Bot } from "grammy";

(async function() {
  const buildBot = new Bot(process.env.BOT_TOKEN!);
  await buildBot.init();

  // This build step ensures that the botInfo is always correct post-build
  // No errors needed
  writeFileSync(
    __dirname + "/src/bot/botInfo.ts",
    `\
import type { UserFromGetMe } from "grammy/types";
    
export const BOT_INFO_FROM_BOT_INIT: UserFromGetMe = ${JSON.stringify(
  buildBot.botInfo,
  null,
  2
)};
`,
    { encoding: "utf-8" }
  );
})();
