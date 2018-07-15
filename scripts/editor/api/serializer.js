import { repeat, pick, get, isEqual, castArray } from "lodash";
import { getBlockType as getRootBlockType } from "@wordpress/blocks";

import { getBlockType } from "./registration";

const helpers = {
  paragraph(value) {
    return castArray(value)
      .map(helpers.node)
      .join("");
  },
  codeblock(value) {
    return "```\n" + value + "\n```";
  },
  quote(value) {
    return value.map(subvalue => "> " + helpers.paragraph(subvalue)).join("\n");
  },
  list(values) {
    return values
      .filter(subvalue => subvalue.type === "li")
      .map(subvalue => "* " + helpers.paragraph(subvalue.props.children))
      .join("\n");
  },
  heading(value) {
    return repeat("#", value.level) + " " + helpers.paragraph(value.content);
  },
  node(value) {
    switch (true) {
      case typeof value === "string" || value instanceof String:
        return value;
      case value.type === "em":
        return "*" + helpers.paragraph(value.props.children) + "*";
      case value.type === "code":
        return "`" + helpers.paragraph(value.props.children) + "`";
      case value.type === "strong":
        return "**" + helpers.paragraph(value.props.children) + "**";
      case value.type === "a":
        return (
          "[" +
          helpers.paragraph(value.props.children) +
          "](" +
          value.props.href +
          ")"
        );
      case value.type === "img":
        return "![" + value.props.alt + "](" + value.props.src + ")";
    }
  }
};

export const serialize = blocks => {
  return blocks
    .map(block => {
      const blockType = getBlockType(block.name);
      if (
        blockType &&
        (!blockType.supports || blockType.supports(block.attributes))
      ) {
        const rootBlockType = getRootBlockType(block.name);
        const wrapperAttributes = Object.entries(block.attributes)
          .filter(([attribute, value]) => {
            return (
              blockType.markdownAttributes &&
              blockType.markdownAttributes.indexOf(attribute) === -1 &&
              !isEqual(
                get(rootBlockType.attributes, [attribute, "default"]),
                value
              )
            );
          })
          .map(([attribute]) => attribute);
        const serial = blockType.serialize(helpers)(block.attributes);
        if (wrapperAttributes.length) {
          return (
            "{% name=" +
            blockType.name +
            " " +
            JSON.stringify(pick(block.attributes, wrapperAttributes)) +
            " %}\n" +
            serial +
            "\n{% end %}"
          );
        }

        return serial;
      }
      return (
        "{% name=" +
        block.name +
        " " +
        JSON.stringify(block.attributes) +
        " %}" +
        "\n{% end %}"
      );
    })
    .join("\n\n");
};
