import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Play Lounge",
  version: packageJson.version,
  copyright: `© ${currentYear}, Play Lounge.`,
  meta: {
    title: "Play Lounge - Book your favorite lounge",
    description: "Play Lounge is a platform for booking your favorite lounge.",
  },
};
