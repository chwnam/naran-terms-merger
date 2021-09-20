<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! interface_exists( 'NTM_Register' ) ) {
	interface NTM_Register {
		public function register();

		public function get_items(): Generator;
	}
}
