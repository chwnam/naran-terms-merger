<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Container' ) ) {
	class NTM_Container implements ArrayAccess {
		use NTM_Hooks_Impl;
		use NTM_Modules_Impl;

		private static ?NTM_Container $instance = null;

		public static function get_instance(): NTM_Container {
			if ( ! static::$instance ) {
				static::$instance = new self();
				static::$instance->init();
			}
			return static::$instance;
		}

		public function offsetGet( $offset ): ?NTM_Module {
			return $this->get_module( $offset );
		}

		/**
		 * @param mixed $offset
		 * @param mixed $value
		 *
		 * @throws Exception
		 */
		public function offsetSet( $offset, $value ) {
			throw new Exception( __CLASS__ . ' does not support offsetSet().' );
		}

		public function offsetExists( $offset ): bool {
			return $this->has_module( $offset );
		}

		/**
		 * @param mixed $offset
		 *
		 * @throws Exception
		 */
		public function offsetUnset( $offset ) {
			throw new Exception( __CLASS__ . ' does not support offsetUnset().' );
		}

		private function __construct() {
		}

		private function init() {
			$this->set_modules(
				[
					'register'     => NTM_Registers::class,
					'terms_merger' => NTM_Terms_Merger::class,
				]
			);

			if ( in_array( wp_get_environment_type(), [ 'local', 'develop' ], true ) ) {
				$this->modules['mockup'] = new NTM_Mockup();
			}
		}
	}
}
