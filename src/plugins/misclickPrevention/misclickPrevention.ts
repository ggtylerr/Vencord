/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { definePluginSettings } from "@api/settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    dmCalls: {
        type: OptionType.BOOLEAN,
        description: "Require double click on voice and video call buttons (in DMs)",
        default: true,
    },
});

export default definePlugin({
    name: "MisclickPrevention",
    description: "Helps you prevent misclicks on various stuff (rn just calls lmao)",
    authors: [Devs.Tyler],
    patches: [
        {
            // todo: actually put in real code instead of example code lol
            find: "",
            predicate: () => true,
            replacement: {
                match: /(\w+)\.isStaff=function\(\){return\s*!1};/,
                replace: "$1.isStaff=function(){return true};",
            },
        }
    ],
    settings,
});

let time = Date.now();
function handleClick() {
    const newTime = Date.now();
    let out = false;
    if (time - newTime < 500) out = true;
    time = newTime;
    return out;
}
