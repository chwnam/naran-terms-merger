<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Registers' ) ) {
	class NTM_Registers implements NTM_Module {
		use NTM_Modules_Impl;

		public function __construct() {
			$this->set_modules(
				[
					'script' => NTM_Register_Script::class,
					'style'  => NTM_Register_Style::class,
				]
			);
		}
	}
}
