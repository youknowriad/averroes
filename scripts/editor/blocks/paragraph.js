const paragraphBlock = {
  name: "core/paragraph",

  markdownAttributes: ["content"],

  parse(r) {
    return r.paragraph.map(value => ({
      content: value
    }));
  },

  serialize(r) {
    return attributes => r.paragraph(attributes.content);
  }
};

export default paragraphBlock;
