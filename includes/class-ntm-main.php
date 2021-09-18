<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Main' ) ) {
	class NTM_Main {
		use NTM_Hooks_Impl;

		private static ?NTM_Main $instance = null;

		private array $modules = [];

		public static function get_instance(): NTM_Main {
			if ( ! static::$instance ) {
				static::$instance = new self();
			}
			return static::$instance;
		}

		public function __isset( string $name ): bool {
			return isset( $this->modules[ $name ] );
		}

		public function __get( string $name ) {
			return $this->modules[ $name ] ?? null;
		}

		public function __set( string $name, $value ) {
			throw new RuntimeException( 'You cannot assign a value to ' . __CLASS__ );
		}

		private function __construct() {
			if ( in_array( wp_get_environment_type(), [ 'local', 'develop' ], true ) ) {
				require_once dirname( NTM_MAIN ) . '/includes/class-ntm-mockup.php';
				$this->modules['mockup'] = new NTM_Mockup();
			}
		}
	}
}
