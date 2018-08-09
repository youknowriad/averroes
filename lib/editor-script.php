<?php

/**
 * Registers the editor script
 *
 * @since 1.0.0
 */
function averroes_editor_script_register() {
	wp_register_script(
		'averroes-editor',
		averroes_url( 'build/editor/index.js' ),
		array( 'wp-plugins', 'wp-edit-post', 'averroes-i18n', 'lodash', 'wp-i18n', 'wp-data', 'wp-element', 'wp-blocks', 'wp-editor', 'wp-components', 'wp-compose' ),
		filemtime( averroes_dir_path() . 'build/editor/index.js' ),
		true
	);
	wp_register_style(
		'averroes-editor',
		averroes_url( 'build/editor/style.css' ),
		array(),
		filemtime( averroes_dir_path() . 'build/editor/style.css' )
	);
}
add_action( 'init', 'averroes_editor_script_register' );

function averroes_editor_script_enqueue() {
	wp_enqueue_script( 'averroes-editor' );
	wp_enqueue_style( 'averroes-editor' );
}
add_action( 'enqueue_block_editor_assets', 'averroes_editor_script_enqueue' );