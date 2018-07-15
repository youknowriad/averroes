const headingBlock = {
  name: "core/heading",

  markdownAttributes: ["content", "level"],

  parse(r) {
    return r.heading;
  },

  serialize(r) {
    return attributes => {
      return r.heading(attributes);
    };
  }
};

export default headingBlock;
