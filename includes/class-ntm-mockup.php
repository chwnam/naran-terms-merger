<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Mockup' ) ) {
	class NTM_Mockup {
		use NTM_Hooks_Impl;
		use NTM_Template_Impl;

		private string $page_hook = '';

		public function __construct() {
			$this->action( 'admin_menu', 'add_mockup_menu' );
			$this->action( 'admin_enqueue_scripts', 'register_scripts', 10 );
			$this->action( 'admin_enqueue_scripts', 'enqueue_scripts', 20 );
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

		public function register_scripts() {
			wp_register_style(
				'ntm-mockup',
				plugins_url( 'assets/css/mockup.css', NTM_MAIN ),
				[],
				NTM_VER
			);

			wp_register_script(
				'ntm-mockup',
				plugins_url( 'assets/js/mockup.js', NTM_MAIN ),
				[ 'jquery' ],
				NTM_VER
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
