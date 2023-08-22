export async function copyFileFromContent(content: string) {
  const filename = +new Date() + ".txt";

  // create tmp folder if not exists
  try {
    await Deno.mkdir(".tmp");
  } catch (err) {
    if (err.name !== "AlreadyExists") {
      throw err;
    }
  }

  Deno.writeTextFileSync(`.tmp/${filename}`, content);
  const platform = Deno.build.os;
  if (platform === "darwin") {
    const appleScript = `
    tell application "Finder"
        set the clipboard to POSIX file "${Deno.cwd()}/.tmp/${filename}"
    end tell
  `;

    const cmd = ["osascript", "-e", appleScript.trim()];
    const process = Deno.run({ cmd });

    await process.status();
    return;
  }

  throw new Error("Not implemented");
}
