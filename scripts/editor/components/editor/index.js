import { createElement, Component } from "@wordpress/element";
import { withSelect, withDispatch } from "@wordpress/data";
import {
  CodeEditor,
  PanelHeader,
  Panel,
  PanelBody
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PostTitle } from "@wordpress/editor";
import { compose } from "@wordpress/compose";

import "./style.scss";
import { parse, serialize } from "../../api";

class Editor extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      value: props.markdown
    };
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      value: serialize(props.blocks)
    };
  }

  componentDidMount() {
    document
      .querySelector(".edit-post-layout__content")
      .classList.add("averroes-hide-editor");
  }

  componentWillUnmount() {
    document
      .querySelector(".edit-post-layout__content")
      .classList.remove("averroes-hide-editor");
  }

  onChange(value) {
    this.setState({ value });
    this.props.onChange(parse(value));
  }

  render() {
    const { value } = this.state;
    return (
      <div className="averroes-editor-editor">
        <Panel>
          <PanelHeader />
          <PanelBody className="averroes-editor-editor__scrollable">
            <PostTitle />
            <CodeEditor
              value={value}
              onChange={this.onChange}
              settings={{
                codemirror: {
                  lineWrapping: true,
                  mode: "markdown",
                  lint: false,
                  placeholder: __("Write markdown…")
                }
              }}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default compose([
  withSelect(select => ({
    blocks: select("core/editor").getBlocks()
  })),
  withDispatch(dispatch => ({
    onChange(blocks) {
      dispatch("core/editor").resetBlocks(blocks);
    }
  }))
])(Editor);
