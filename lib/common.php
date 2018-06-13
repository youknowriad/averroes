<?php

/**
 * Retrieves the root plugin path.
 *
 * @return string Root path to the averroes plugin.
 *
 * @since 1.0.0
 */
function averroes_dir_path() {
	return plugin_dir_path( dirname(__FILE__ ) );
}

/**
 * Retrieves a URL to a file in the averroes plugin.
 *
 * @param  string $path Relative path of the desired file.
 *
 * @return string       Fully qualified URL pointing to the desired file.
 *
 * @since 1.0.0
 */
function averroes_url( $path ) {
	return plugins_url( $path, dirname( __FILE__ ) );
}