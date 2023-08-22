#!/usr/bin/env -S deno run

import axios from "npm:axios";

const args = Deno.args;
console.log(args);

const r = await axios.get("https://npm.io/api/v1/package/cryptocurrency-icons");

await Deno.writeTextFileSync("data.json", JSON.stringify(r.data));

const platform = Deno.build.os;
if (platform === "darwin") {
  const appleScript = `
    tell application "Finder"
        set the clipboard to POSIX file "${Deno.cwd()}/data.json"
    end tell
  `;

  const cmd = ["osascript", "-e", appleScript.trim()];
  const process = Deno.run({ cmd });

  await process.status();
}
console.log("done");
