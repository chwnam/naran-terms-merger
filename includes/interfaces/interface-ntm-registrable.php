<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! interface_exists( 'NTM_Registrable' ) ) {
	interface NTM_Registrable {
		public function register();
	}
}
