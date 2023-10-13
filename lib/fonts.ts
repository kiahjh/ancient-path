import { Roboto } from "next/font/google";

const robotoFont = Roboto({
  subsets: ["latin"], // eslint-disable-line
  weight: ["100", "300", "400", "500", "700", "900"], // eslint-disable-line
});

export const roboto = robotoFont.className;
