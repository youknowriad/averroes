const headingBlock = {
  name: "core/heading",

  markdownAttributes: ["content", "nodeName"],

  parse(r) {
    return r.heading.map(value => ({
      content: value.content,
      nodeName: "H" + value.level
    }));
  },

  serialize(r) {
    return attributes =>
      r.heading({
        level: parseInt(attributes.nodeName.substring(1), 10),
        content: attributes.content
      });
  }
};

export default headingBlock;
