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

		private array $real_callbacks = [];

		public function __construct() {
			$this->add_action( 'init', 'register' );
		}

		public function register() {
			foreach ( $this->get_items() as $item ) {
				if ( $item instanceof NTM_Registrable_AJAX ) {
					$this->real_callbacks[ $item->action ] = $item->callback;
					$item->register( [ $this, 'dispatch' ] );
				}
			}
		}

		public function dispatch() {
			$action = $_REQUEST['action'] ?? '';
			if ( $action && isset( $this->real_callbacks[ $action ] ) ) {
				$callback = ntm_parse_callback( $this->real_callbacks[ $action ] );
				if ( is_callable( $callback ) ) {
					call_user_func( $callback );
				}
			}
		}

		public function get_items(): Generator {
			yield new NTM_Registrable_AJAX(
				'ntm_request_merge_term',
				'terms_merger@merge_terms'
			);
		}
	}
}
