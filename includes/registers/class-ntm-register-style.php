<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Register_Style' ) ) {
	class NTM_Register_Style implements NTM_Register {
		use NTM_Hooks_Impl;

		public function __construct() {
			$this->add_action( 'init', 'register' );
		}

		public function register() {
			foreach ( $this->get_items() as $item ) {
				if ( $item instanceof NTM_Registrable_Style ) {
					$item->register();
				}
			}
		}

		public function get_items(): Generator {
			if ( is_admin() ) {
				yield from $this->get_admin_items();
			}
		}

		private function src_helper( string $input ): string {
			return plugins_url( "assets/css/{$input}", NTM_MAIN );
		}

		private function get_admin_items(): Generator {
			yield new NTM_Registrable_Style(
				'ntm-mockup',
				$this->src_helper( 'mockup.css' )
			);
		}
	}
}
