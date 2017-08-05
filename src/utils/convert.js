import Model from '../model/Model';

const convertWidth = {
  toPercent(horizontalMeasureInPixels) {
    const totalImageWidthInPixels = Model.getWidth();
    if (totalImageWidthInPixels === 0) { return 0; } // image not yet initialized
    return (horizontalMeasureInPixels * 100) / totalImageWidthInPixels;
  },
  toPixels(horizontalMeasureAsPercentage) {
    const totalImageWidthInPixels = Model.getWidth();
    if (totalImageWidthInPixels === 0) { return 0; } // image not yet initialized
    return (horizontalMeasureAsPercentage * totalImageWidthInPixels) / 100;
  },
};

const convertHeight = {
  toPercent(verticalMeasureInPixels) {
    const totalImageHeightInPixels = Model.getHeight();
    if (totalImageHeightInPixels === 0) { return 0; } // image not yet initialized
    return (verticalMeasureInPixels * 100) / totalImageHeightInPixels;
  },
  toPixels(verticalMeasureAsPercentage) {
    const totalImageHeightInPixels = Model.getHeight();
    if (totalImageHeightInPixels === 0) { return 0; } // image not yet initialized
    return (verticalMeasureAsPercentage * totalImageHeightInPixels) / 100;
  },
};

export { convertWidth, convertHeight };
