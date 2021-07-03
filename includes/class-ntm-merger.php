<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Merger' ) ) {
	class NTM_Merger {
		use NTM_Hooks_Impl;
		use NTM_Template_Impl;

		private string $hook = '';

		public function __construct() {
			$this->action( 'admin_enqueue_scripts', 'register_scripts', 10 )
			     ->action( 'admin_enqueue_scripts', 'enqueue_scripts', 20 )
			     ->action( 'admin_menu', 'admin_menu' )
			     ->action( 'wp_ajax_ntm_get_terms', 'ajax_get_terms' );
		}

		public function register_scripts() {
			wp_register_script(
				'ntm-jquery-block-ui',
				plugins_url( 'assets/jquery.blockUI.js', NTM_MAIN ),
				[ 'jquery' ],
				'2.70.0',
				true
			);

			wp_register_script(
				'ntm',
				plugins_url( 'assets/merger.js', NTM_MAIN ),
				[ 'ntm-jquery-block-ui', 'wp-util' ],
				NTM_VER,
				true
			);

			wp_register_style(
				'ntm',
				plugins_url( 'assets/style.css', NTM_MAIN ),
				[],
				NTM_VER
			);
		}

		public function enqueue_scripts( $hook ) {
			if ( $hook === $this->hook ) {
				wp_localize_script(
					'ntm',
					'ntm',
					[
						'nonce' => wp_create_nonce( 'ntm' ),
					]
				);

				wp_enqueue_script( 'ntm' );

				wp_enqueue_style( 'ntm' );
			}
		}

		public function admin_menu() {
			$this->hook = add_submenu_page(
				'tools.php',
				'Naran Terms Merger',
				'Terms Merger',
				'administrator',
				'ntm',
				[ $this, 'output' ]
			);
		}

		public function output() {
			$hierarchical = get_taxonomies( [ 'hierarchical' => true, 'public' => true ], 'objects' );
			$flat         = get_taxonomies( [ 'hierarchical' => false, 'public' => true ], 'objects' );

			if ( isset( $flat['post_format'] ) ) {
				unset( $flat['post_format'] );
			}

			$this->template(
				'merger.php',
				[
					'hierarchical_taxonomies' => $hierarchical,
					'flat_taxonomies'         => $flat,
				]
			);

			echo '';
		}

		public function ajax_get_terms() {
			check_ajax_referer( 'ntm', 'nonce' );

			$taxonomy = $_GET['taxonomy'] ?? '';

			if ( get_taxonomy( $taxonomy ) ) {
				$output = [];

				$terms = get_terms(
					[
						'taxonomy'   => $taxonomy,
						'hide_empty' => false,
					]
				);

				foreach ( $terms as $term ) {
					$output[] = [
						'slug'  => $term->slug,
						'name'  => $term->name,
						'count' => $term->count,
					];
				}

				wp_send_json_success( $output );
			}
		}
	}
}
