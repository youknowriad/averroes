<?php
/**
 * Plugin Name: Averroes
 * Plugin URI: https://github.com/youknowriad/averroes
 * Description: A Gutenberg compatible markdown editor. Write in Markdown, edit in Markdown and preview in HTML.
 * Version: 1.1.1
 * Text Domain: averroes
 * Domain Path: /languages
 * Author: Riad Benguella
 *
 * @package averroes
 */

 // Some common utilities
require_once dirname( __FILE__ ) . '/lib/common.php';

// Registering Script Files
require_once dirname( __FILE__ ) . '/lib/i18n-script.php';
require_once dirname( __FILE__ ) . '/lib/editor-script.php';
