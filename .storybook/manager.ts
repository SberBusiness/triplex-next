import { addons } from "storybook/manager-api";
import { themes } from "storybook/theming";

addons.setConfig({
    theme: themes.light,
});

addons.ready().then(() => {
    const channel = addons.getChannel();

    channel.on("globalsUpdated", ({ globals }) => {
        addons.setConfig({
            theme: globals.theme === "dark" ? themes.dark : themes.light,
        });
    });
});
