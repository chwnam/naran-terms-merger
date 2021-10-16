<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Registrable_AJAX' ) ) {
	class NTM_Registrable_AJAX implements NTM_Registrable {
		public string $action;

		public string $callback;

		public bool $nopriv;

		public function __construct(
			string $action,
			string $callback,
			bool $nopriv = false
		) {
			$this->action   = $action;
			$this->callback = $callback;
			$this->nopriv   = $nopriv;
		}

		public function register() {
			$dispatch = func_get_arg( 0 );

			if ( $dispatch ) {
				add_action( "wp_ajax_{$this->action}", $dispatch, NTM_PRIORITY );
			}

			if ( $this->nopriv ) {
				add_action( "wp_ajax_nopriv_{$this->action}", $dispatch, NTM_PRIORITY );
			}
		}
	}
}
