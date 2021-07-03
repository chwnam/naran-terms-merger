<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! trait_exists( 'NTM_Hooks_Impl' ) ) {
	trait NTM_Hooks_Impl {
		/**
		 * @param string|array    $hook
		 * @param string|callable $callback
		 * @param int|null        $priority
		 * @param int             $accepted_args
		 *
		 * @return $this
		 */
		protected function action( $hook, $callback, ?int $priority = null, int $accepted_args = 1 ) {
			if ( is_string( $callback ) && method_exists( $this, $callback ) ) {
				$callback = [ $this, $callback ];
			}
			if (! $priority ) {
				$priority = NTM_PRIORITY;
			}
			if ( is_array( $hook ) ) {
				foreach ( $hook as $h ) {
					add_action( $h, $callback, $priority, $accepted_args );
				}
			} else {
				add_action( $hook, $callback, $priority, $accepted_args );
			}
			return $this;
		}

		/**
		 * @param string|array    $hook
		 * @param string|callable $callback
		 * @param int|null        $priority
		 * @param int             $accepted_args
		 *
		 * @return $this
		 */
		protected function filter( $hook, $callback, ?int $priority = null, int $accepted_args = 1 ) {
			if ( is_string( $callback ) && method_exists( $this, $callback ) ) {
				$callback = [ $this, $callback ];
			}
			if (! $priority ) {
				$priority = NTM_PRIORITY;
			}
			if ( is_array( $hook ) ) {
				foreach ( $hook as $h ) {
					add_filter( $h, $callback, $priority, $accepted_args );
				}
			} else {
				add_filter( $hook, $callback, $priority, $accepted_args );
			}
			return $this;
		}
	}
}