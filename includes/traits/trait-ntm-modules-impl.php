<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! trait_exists( 'NTM_Modules_Impl' ) ) {
	trait NTM_Modules_Impl {
		protected array $modules = [];

		protected function get_module( string $key ): ?NTM_Module {
			$module = $this->modules[ $key ] ?? null;

			if ( $module instanceof Closure ) {
				$this->modules[ $key ] = $module();
			}

			return $module;
		}

		protected function set_modules( array $modules ) {
			foreach ( $modules as $key => $module ) {
				if ( is_string( $module ) && class_exists( $module ) ) {
					$this->modules[ $key ] = new $module();
				} else {
					$this->modules[ $key ] = $module;
				}
			}
		}

		public function has_module( string $key ): bool {
			return isset( $this->modules[ $key ] );
		}

		public function __get( string $key ): ?NTM_Module {
			return $this->get_module( $key );
		}

		public function __isset( $key ): bool {
			return $this->has_module( $key );
		}

		/**
		 * @throws Exception
		 */
		public function __set( string $key, $value ) {
			throw new Exception( __CLASS__ . ' does not support __set().' );
		}

		/**
		 * @throws Exception
		 */
		public function __unset( string $key ): void {
			throw new Exception( __CLASS__ . ' does not support __unset().' );
		}
	}
}
