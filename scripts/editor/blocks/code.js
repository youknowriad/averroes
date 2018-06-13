const codeBlock = {
  name: "core/code",

  markdownAttributes: ["content"],

  parse(r) {
    return r.codeblock.map(content => ({
      content
    }));
  },

  serialize(r) {
    return attributes => r.codeblock(attributes.content);
  }
};

export default codeBlock;
