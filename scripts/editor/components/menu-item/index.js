import { PluginSidebarMoreMenuItem } from "@wordpress/editPost";
import { __ } from "@wordpress/i18n";

const MenuItem = () => (
  <PluginSidebarMoreMenuItem
    icon="welcome-write-blog"
    target="averroes-sidebar"
  >
    {__("Averroes, Markdown Editor", "averroes")}
  </PluginSidebarMoreMenuItem>
);

export default MenuItem;
