#!/usr/bin/env -S deno run --allow-net --allow-read

import { readText, writeText } from "https://deno.land/x/copy_paste/mod.ts";
import { copyFileFromContent } from "./libs/copy-file.ts";

const content = await readText();
await copyFileFromContent(content);
console.log("done");
