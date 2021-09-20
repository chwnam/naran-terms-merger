<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Mockup' ) ) {
	class NTM_Mockup implements NTM_Module {
		use NTM_Hooks_Impl;
		use NTM_Template_Impl;

		private string $page_hook = '';

		public function __construct() {
			$this->add_action( 'admin_menu', 'add_mockup_menu' );
			$this->add_action( 'admin_enqueue_scripts', 'enqueue_scripts' );
		}

		public function add_mockup_menu() {
			$this->page_hook = add_menu_page(
				'Naran Tag Merger Mockup',
				'NTM Mockup',
				'administrator',
				'ntm-mock',
				[ $this, 'output_mockup_page' ]
			);
		}

		public function enqueue_scripts( string $hook ) {
			if ( $this->page_hook === $hook ) {
				wp_enqueue_style( 'ntm-mockup' );
				wp_enqueue_script( 'ntm-mockup' );
			}
		}

		public function output_mockup_page() {
			$this->template( 'mockup.php' );
		}
	}
}
