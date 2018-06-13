const imageBlock = {
  name: "core/image",

  markdownAttributes: ["url", "alt"],

  parse(r) {
    return r.image.map(value => ({
      url: value.props.src,
      alt: value.props.alt
    }));
  },

  serialize(r) {
    return attributes =>
      r.node({
        type: "img",
        props: { src: attributes.url, alt: attributes.alt }
      });
  }
};

export default imageBlock;
