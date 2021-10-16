<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Terms_Merger' ) ) {
	class NTM_Terms_Merger implements NTM_Module {
		use NTM_Hooks_Impl;
		use NTM_Template_Impl;

		private string $page_hook;

		public function __construct() {
			$this->page_hook = '';

			$this
				->add_action( 'admin_menu', 'add_admin_menu' )
				->add_action( 'admin_enqueue_scripts', 'enqueue_scripts' )
			;
		}

		public function add_admin_menu() {
			$this->page_hook = add_submenu_page(
				'tools.php',
				'Naran Terms Merger',
				'Terms Merger',
				'administrator',
				'ntm-terms-merger',
				[ $this, 'output_admin_menu' ]
			);
		}

		public function enqueue_scripts( string $hook ) {
			if ( $hook === $this->page_hook ) {
				$this->enqueue_style( 'ntm-style' );
			}
		}

		public function output_admin_menu() {
			$this
				->enqueue_script( 'ntm-terms-merger' )
				->template( 'terms-merger.php' )
			;

			if ( in_array( wp_get_environment_type(), [ 'local', 'develop' ], true ) ) {
				$this->enqueue_script( 'ntm-live-reload' );
			}
		}
	}
}
