import { createElement } from "@wordpress/element";
import { PluginSidebarMoreMenuItem } from "@wordpress/editPost";
import { __ } from "@wordpress/i18n";

import Icon from "../icon";

const MenuItem = () => (
  <PluginSidebarMoreMenuItem icon={<Icon isSmall />} target="averroes-sidebar">
    {__("Averroes, Markdown Editor", "averroes")}
  </PluginSidebarMoreMenuItem>
);

export default MenuItem;
