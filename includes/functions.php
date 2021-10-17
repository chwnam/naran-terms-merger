<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'ntm' ) ) {
	function ntm(): NTM_Container {
		return NTM_Container::get_instance();
	}
}


if ( ! function_exists( 'ntm_parse_module' ) ) {
	function ntm_parse_module( string $input ): ?NTM_Module {
		static $cached = [];

		$input = trim( $input );

		if ( ! array_key_exists( $input, $cached ) ) {
			$parts = explode( '.', $input );
			if ( $parts ) {
				$module = ntm();
				foreach ( $parts as $part ) {
					if ( isset( $module->{$part} ) ) {
						$module = $module->{$part};
					} else {
						$module = null;
						break;
					}
				}
			} else {
				$module = null;
			}
			$cached[ $input ] = $module;
		}

		return $cached[ $input ];
	}
}


if ( ! function_exists( 'ntm_parse_callback' ) ) {
	function ntm_parse_callback( string $input ) {
		$output = null;

		if ( is_callable( $input ) ) {
			$output = $input;
		} else {
			$p = strpos( $input, '@' );
			if ( false !== $p ) {
				$module = ntm_parse_module( substr( $input, 0, $p ) );
				$method = substr( $input, $p + 1 );
				if ( $module && method_exists( $module, $method ) ) {
					$output = [ $module, $method ];
				}
			}
		}

		return $output;
	}
}
