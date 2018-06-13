const quoteBlock = {
  name: "core/quote",

  markdownAttributes: ["value"],

  parse(r) {
    return r.quote.map(value => ({
      value: value.map(subValue => ({
        children: {
          type: "p",
          props: { children: subValue }
        }
      }))
    }));
  },

  serialize(r) {
    return attributes =>
      r.quote(
        attributes.value.map(subValue => subValue.children.props.children)
      );
  }
};

export default quoteBlock;
