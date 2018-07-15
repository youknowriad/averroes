import { some, last, filter } from "lodash";

const listBlock = {
  name: "core/list",

  markdownAttributes: ["values"],

  parse(r) {
    return r.list.map(value => ({
      values: value
    }));
  },

  serialize(r) {
    return attributes => r.list(attributes.values);
  },

  supports: attributes => {
    return !some(attributes.values, value => {
      if (value.type !== "li") {
        return false;
      }
      return some(value.props.children, child => child.type === "ul");
    });
  }
};

export default listBlock;
