import { Fragment } from "@wordpress/element";
import { registerPlugin } from "@wordpress/plugins";

import "./style.scss";
import "./blocks";
import Sidebar from "./components/sidebar";
import MenuItem from "./components/menu-item";

const AverroesPlugin = () => (
  <Fragment>
    <Sidebar />
    <MenuItem />
  </Fragment>
);

registerPlugin("averroes", {
  render: AverroesPlugin
});
