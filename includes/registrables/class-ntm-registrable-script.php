<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Registrable_Script' ) ) {
	class NTM_Registrable_Script implements NTM_Registrable {
		const WP_SCRIPT = 'ntm-wp-script-generated';

		public string $handle;

		public string $src;

		/** @var array|string */
		public $deps;

		/** @var string|bool */
		public $ver;

		public bool $in_footer;

		/**
		 * NOTE: If a script is built from wp-scripts, check these:
		 * - 'src' must be relative to assets/js.
		 * - 'deps' must be 'WP_SCRIPT' constant.
		 *
		 * @param string       $handle
		 * @param string       $src
		 * @param array|string $deps
		 * @param null         $ver
		 * @param bool         $in_footer
		 */
		public function __construct(
			string $handle,
			string $src,
			$deps = [],
			$ver = null,
			bool $in_footer = false
		) {
			$this->handle    = $handle;
			$this->src       = $src;
			$this->deps      = $deps;
			$this->ver       = is_null( $ver ) ? NTM_VER : $ver;
			$this->in_footer = $in_footer;
		}

		public function register() {
			if ( $this->handle && $this->src ) {
				if ( self::WP_SCRIPT === $this->deps ) {
					$dir  = trim( dirname( $this->src ), '/\\' );
					$file = pathinfo( $this->src, PATHINFO_FILENAME ) . '.asset.php';
					$path = path_join( dirname( NTM_MAIN ), "assets/js/{$dir}/{$file}" );

					if ( file_exists( $path ) && is_readable( $path ) ) {
						$info = include $path;

						$this->src       = plugins_url( "assets/js/{$this->src}", NTM_MAIN );
						$this->deps      = $info['dependencies'] ?? [];
						$this->ver       = $info['version'] ?? NTM_VER;
						$this->in_footer = true;
					}
				}

				wp_register_script( $this->handle, $this->src, $this->deps, $this->ver, $this->in_footer );
			}
		}
	}
}
