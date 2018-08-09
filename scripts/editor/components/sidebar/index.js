import { createElement } from "@wordpress/element";
import { PluginSidebar } from "@wordpress/editPost";
import { __ } from "@wordpress/i18n";

import Editor from "../editor";
import Icon from "../icon";

const Sidebar = () => (
  <PluginSidebar
    name="averroes-sidebar"
    title={__("Averroes: Markdown Editor", "averroes")}
    icon={<Icon isSmall />}
  >
    <Editor />
  </PluginSidebar>
);

export default Sidebar;
