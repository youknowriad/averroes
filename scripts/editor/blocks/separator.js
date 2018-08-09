import P from "parsimmon";

const separatorBlock = {
  name: "core/separator",
  parse() {
    return P.alt(P.string("***"), P.string("---")).result({});
  },

  serialize() {
    return () => "---";
  }
};

export default separatorBlock;
