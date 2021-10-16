<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Register_AJAX' ) ) {
	class NTM_Register_AJAX implements NTM_Register {
		use NTM_Hooks_Impl;

		public function __construct() {
			$this->add_action( 'init', 'register' );
		}

		public function register() {
			foreach ( $this->get_items() as $item ) {
				if ( $item instanceof NTM_Registrable_AJAX ) {
					$item->register( [ $this, 'dispatch' ] );
				}
			}
		}

		public function dispatch() {
			echo '';
		}

		public function get_items(): Generator {
			yield new NTM_Registrable_AJAX(
				'ntm_request_merge_term',
				''
			);
		}
	}
}
