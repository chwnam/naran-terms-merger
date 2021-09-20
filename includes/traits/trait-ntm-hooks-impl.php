<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! trait_exists( 'NTM_Hooks_Impl' ) ) {
	trait NTM_Hooks_Impl {
		/**
		 * @param string          $hook
		 * @param string|callable $callback
		 * @param int|null        $priority
		 * @param int             $accepted_args
		 *
		 * @return $this
		 */
		protected function add_action( string $hook, $callback, ?int $priority = null, int $accepted_args = 1 ): self {
			return $this->__add_action_filter( $hook, $callback, $priority, $accepted_args, 'add_action' );
		}

		protected function remove_action( string $hook, $callback, ?int $priority = null ): self {
			return $this->__remove_action_filter( $hook, $callback, $priority, 'remove_action' );
		}

		/**
		 * @param string|array    $hook
		 * @param string|callable $callback
		 * @param int|null        $priority
		 * @param int             $accepted_args
		 *
		 * @return $this
		 */
		protected function add_filter( $hook, $callback, ?int $priority = null, int $accepted_args = 1 ): self {
			return $this->__add_action_filter( $hook, $callback, $priority, $accepted_args, 'add_filter' );
		}

		protected function remove_filter( string $hook, $callback, ?int $priority = null ): self {
			return $this->__remove_action_filter( $hook, $callback, $priority, 'remove_filter' );
		}

		/**
		 * @param string                $hook
		 * @param array|string|callable $callback
		 * @param null|int              $priority
		 * @param int                   $accepted_args
		 * @param string                $function
		 *
		 * @return $this
		 */
		private function __add_action_filter(
			string $hook,
			$callback,
			?int $priority,
			int $accepted_args,
			string $function
		): self {
			if ( is_null( $priority ) ) {
				$priority = NTM_PRIORITY;
			}

			if ( is_array( $callback ) && ! is_callable( $callback ) ) {
				foreach ( $callback as $c ) {
					$c = $this->__maybe_method( $c );
					call_user_func_array( $function, [ $hook, $c, $priority, $accepted_args ] );
				}
			} else {
				$callback = $this->__maybe_method( $callback );
				call_user_func_array( $function, [ $hook, $callback, $priority, $accepted_args ] );
			}

			return $this;
		}

		/**
		 * @param string                $hook
		 * @param array|string|callable $callback
		 * @param null|int              $priority
		 * @param string                $function
		 *
		 * @return $this
		 */
		private function __remove_action_filter(
			string $hook,
			$callback,
			?int $priority,
			string $function
		): self {
			if ( is_null( $priority ) ) {
				$priority = NTM_PRIORITY;
			}

			if ( is_array( $callback ) && ! is_callable( $callback ) ) {
				foreach ( $callback as $c ) {
					$c = $this->__maybe_method( $c );
					call_user_func_array( $function, [ $hook, $c, $priority ] );
				}
			} else {
				$callback = $this->__maybe_method( $callback );
				call_user_func_array( $function, [ $hook, $callback, $priority ] );
			}

			return $this;
		}

		/**
		 * @param string|array $maybe_method
		 *
		 * @return array|callable
		 */
		private function __maybe_method( $maybe_method ) {
			return is_string( $maybe_method ) &&
			       method_exists( $this, $maybe_method ) ? [ $this, $maybe_method ] : $maybe_method;
		}
	}
}