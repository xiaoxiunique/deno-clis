const axios = require("axios");
const fs = require("fs");
const { exec } = require("child_process");

// 保存API数据到data.json
const jsonData = JSON.stringify({ test: "test" }, null, 2);
fs.writeFileSync("data.json", jsonData);

const appleScript = `
            tell application "Finder"
                set the clipboard to POSIX file "${__dirname}/data.json"
            end tell
        `;

exec(`osascript -e '${appleScript}'`, (error) => {
  if (error) {
    console.error("Error copying file:", error);
  } else {
    console.log("data.json has been copied to clipboard!");
  }
});
