<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'ntm' ) ) {
	function ntm(): NTM_Container {
		return NTM_Container::get_instance();
	}
}
