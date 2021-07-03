<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'ntm' ) ) {
	function ntm(): NTM_Main {
		return NTM_Main::get_instance();
	}
}
