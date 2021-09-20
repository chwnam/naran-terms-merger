<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Registrable_Style' ) ) {
	class NTM_Registrable_Style implements NTM_Registrable {
		public string $handle;

		public string $src;

		public array $deps;

		/** @var string|bool */
		public $ver;

		public string $media;

		public function __construct(
			string $handle,
			string $src,
			array $deps = [],
			$ver = null,
			string $media = 'all'
		) {
			$this->handle = $handle;
			$this->src    = $src;
			$this->deps   = $deps;
			$this->ver    = is_null( $ver ) ? NTM_VER : $ver;
			$this->media  = $media;
		}

		public function register() {
			if ( $this->handle && $this->src ) {
				wp_register_style( $this->handle, $this->src, $this->deps, $this->ver, $this->media );
			}
		}
	}
}
