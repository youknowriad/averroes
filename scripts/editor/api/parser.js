import P from "parsimmon";
import { createBlock } from "@wordpress/blocks";

import JSONParser from "./json";
import { getBlockTypes } from "./registration";

const helpers = {
  heading(r) {
    return P.seqMap(
      P.string("#").atLeast(1),
      P.optWhitespace,
      r.paragraph,
      (heading, _, children) => ({
        level: heading.length,
        content: children
      })
    );
  },
  quote(r) {
    return P.string(">")
      .then(P.optWhitespace)
      .then(r.paragraph)
      .sepBy1(r.newline);
  },
  paragraph(r) {
    return r.node.atLeast(1);
  },
  node(r) {
    return P.alt(r.image, r.link, r.bold, r.italic, r.code, r.text);
  },
  italic(r) {
    const wrapper = P.string("*").or(P.string("_"));
    return r.text
      .wrap(wrapper, wrapper)
      .map(value => ({ type: "em", props: { children: [value] } }));
  },
  bold(r) {
    const wrapper = P.string("**").or(P.string("__"));
    return r.text
      .wrap(wrapper, wrapper)
      .map(value => ({ type: "strong", props: { children: [value] } }));
  },
  link() {
    return P.seqMap(
      P.regex(/[^\]\r\n]+/).wrap(P.string("["), P.string("]")),
      P.regex(/[^)\r\n]+/).wrap(P.string("("), P.string(")")),
      (text, link) => ({
        type: "a",
        props: {
          href: link,
          children: [text]
        }
      })
    );
  },
  image() {
    return P.seqMap(
      P.regex(/[^\]\r\n]+/).wrap(P.string("!["), P.string("]")),
      P.regex(/[^)\r\n]+/).wrap(P.string("("), P.string(")")),
      (text, link) => ({
        type: "img",
        props: {
          src: link,
          alt: text
        }
      })
    );
  },
  code(r) {
    return r.text
      .wrap(P.string("`"), P.string("`"))
      .map(value => ({ type: "code", props: { children: [value] } }));
  },
  text(r) {
    return r.char.atLeast(1).tie();
  },
  char() {
    return P.alt(
      P.regex(/[^\n\r*_[!]/),
      P.string("!").notFollowedBy(P.string("[")),
      P.regex(/\\([*_[]])/, 0)
    );
  },
  newline() {
    return P.alt(P.string("\r\n"), P.string("\n"), P.string("\r"));
  }
};

const getBlockTypeParserHelper = blockType => {
  return r => {
    const innerBlockParser = blockType.parse(r).map(attributes => ({
      name: blockType.name,
      attributes
    }));

    return P.alt(
      P.seqMap(
        P.string("{%")
          .then(P.whitespace)
          .then(P.string("name=core/paragraph"))
          .then(JSONParser.value.trim(P.optWhitespace))
          .skip(P.string("%}")),
        innerBlockParser.trim(r.newline),
        P.string("{% end %}"),
        (attributes, block) => {
          return Object.assign({}, block, {
            attributes: Object.assign(attributes, block.attributes)
          });
        }
      ),
      innerBlockParser.lookahead(P.alt(r.newline, P.eof))
    ).map(({ name, attributes }) => createBlock(name, attributes));
  };
};

export const parse = content => {
  const language = P.createLanguage(
    Object.assign(
      {
        blocks(r) {
          return P.alt(...getBlockTypes().map(block => r[block.name]))
            .sepBy(r.newline.atLeast(1))
            .trim(r.newline.many());
        }
      },
      getBlockTypes().reduce((memo, block) => {
        memo[block.name] = getBlockTypeParserHelper(block);
        return memo;
      }, {}),
      helpers
    )
  );
  return language.blocks.tryParse(content);
};
