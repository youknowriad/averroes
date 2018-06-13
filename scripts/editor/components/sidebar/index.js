import { PluginSidebar } from "@wordpress/editPost";
import { __ } from "@wordpress/i18n";

import Editor from "../editor";

const Sidebar = () => (
  <PluginSidebar
    name="averroes-sidebar"
    title={__("Averroes: Markdown Editor", "averroes")}
  >
    <Editor />
  </PluginSidebar>
);

export default Sidebar;
