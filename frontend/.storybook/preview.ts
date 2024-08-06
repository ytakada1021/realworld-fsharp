import "@/modules/common/styles/font.css";
import "@/modules/common/styles/main.css";
import type { Preview } from "@storybook/react";
import "ionicons/css/ionicons.min.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
