<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! trait_exists( 'NTM_Template_Impl' ) ) {
	trait NTM_Template_Impl {
		protected function template( string $tmpl_name, array $context = [], bool $echo = true ): string {
			$tmpl_name = trim( $tmpl_name, '/\\' );

			$paths = [
				STYLESHEETPATH . "/ntm/{$tmpl_name}",
				TEMPLATEPATH . "/ntm/{$tmpl_name}",
				dirname( NTM_MAIN ) . "/includes/templates/{$tmpl_name}",
			];

			$located = false;

			foreach( apply_filters( 'ntm_template_paths', $paths ) as $path ) {
				if ( file_exists( $path ) && is_readable( $path ) ) {
					$located = $path;
					break;
				}
			}

			if ( $located ) {
				if ( ! $echo ) {
					ob_start();
				}

				if ( ! empty( $context ) ) {
					extract( $context, EXTR_SKIP );
				}

                include $located;

				if ( ! $echo ) {
					return ob_get_clean();
				}
			}

			return '';
		}
	}
}