const FIGMA_FRAME = {
  width: 1920,
  height: 650,
};

const FONT_SIZE = 10;

export const getFontSize = () => {
  return (document.documentElement.clientWidth * FONT_SIZE) / FIGMA_FRAME.width;
};
