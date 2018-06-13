import "../blocks";
import { parse, serialize } from "../api";

jest.mock(
  "@wordpress/blocks",
  () => ({
    createBlock(name, attributes) {
      return { name, attributes };
    },
    getBlockType(name) {
      return {
        name,
        attributes: {}
      };
    },
    getBlockTypes() {
      [this.getBlockType("core/paragraph")];
    }
  }),
  { virtual: true }
);

const isIdempotent = parsed => {
  expect(parse(serialize(parsed))).toEqual(parsed);
};

describe("integration", () => {
  it("Should parse a paragraph block", () => {
    const markdown = "This is just a simple **markdown** text";
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });

  it("Should parse a paragraph block with extra attributes", () => {
    const markdown = `{% name=core/paragraph {"dropCap": true} %}
This is just a simple ** markdown ** text
{% end %}`;
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });

  it("Should parse multiple paragraph blocks", () => {
    const markdown = `
		This is just a simple **markdown** text

		This is should produce two paragraphs
`;
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });

  it("Should parse a heading block", () => {
    const markdown = "## Heading 2nd level";
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });

  it("Should parse multiple headings block", () => {
    const markdown = "## Heading 2nd level\n### Another heading";
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });

  it("Should parse an image block", () => {
    const markdown = "![Image alt text](http://myawesomeimage.tld)";
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });

  it("Should parse an quote block", () => {
    const markdown = "> This is just a simple quote";
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });

  it("Should parse a code block", () => {
    const markdown = "```\nconst thisIsJavaScript = true;\n```";
    const parsed = parse(markdown);

    expect(parsed).toMatchSnapshot();
    isIdempotent(parsed);
  });
});
