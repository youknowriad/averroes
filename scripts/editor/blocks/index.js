import { registerBlockType } from "../api/registration";
import paragraph from "./paragraph";
import heading from "./heading";
import image from "./image";
import separator from "./separator";
import quote from "./quote";

registerBlockType(quote);
registerBlockType(image);
registerBlockType(heading);
registerBlockType(separator);

// Paragraph must be last
registerBlockType(paragraph);
