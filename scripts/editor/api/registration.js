import { find } from "lodash";

const markdownBlocks = [];

export const registerBlockType = block => {
  markdownBlocks.push(block);
};

export const getBlockType = name => find(markdownBlocks, { name });

export const getBlockTypes = () => markdownBlocks;
