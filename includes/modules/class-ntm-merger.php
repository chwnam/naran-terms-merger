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
			$this->add_action( 'admin_enqueue_scripts', 'register_scripts', 10 )
			     ->add_action( 'admin_enqueue_scripts', 'enqueue_scripts', 20 )
			     ->add_action( 'admin_menu', 'admin_menu' )
			     ->add_action( 'wp_ajax_ntm_get_terms', 'ajax_get_terms' );
		}

		public function register_scripts() {
			wp_register_script(
				'ntm-jquery-block-ui',
				plugins_url( 'assets/jquery.blockUI.js', NTM_MAIN ),
				[ 'jquery' ],
				'2.70.0',
				true
			);

			if ( file_exists( dirname( NTM_MAIN ) . '/assets/js/build/ntm.asset.php' ) ) {
				$ntm_asset = include dirname( NTM_MAIN ) . '/assets/js/build/ntm.asset.php';
				if ( isset( $ntm_asset['dependencies'], $ntm_asset['version'] ) ) {
					$ntm_asset['dependencies'][] = 'wp-util';
					wp_register_script(
						'ntm-script',
						plugins_url( 'assets/js/build/ntm.js', NTM_MAIN ),
						$ntm_asset['dependencies'],
						$ntm_asset['version'],
						true
					);
				}
			}

			wp_register_style(
				'ntm-style',
				plugins_url( 'assets/css/style.css', NTM_MAIN ),
				[],
				NTM_VER
			);
		}

		public function enqueue_scripts( $hook ) {
			if ( $hook === $this->hook ) {
				wp_localize_script(
					'ntm-script',
					'ntm',
					[
						'nonce'      => wp_create_nonce( 'ntm' ),
						'taxonomies' => $this->get_taxonomies(),
					]
				);

				wp_enqueue_script( 'ntm-script' );

				wp_enqueue_style( 'ntm-style' );
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

		private function get_taxonomies(): array {
			$result = [
				'hierarchical' => [],
				'flat'         => [],
			];

			/** @var array<string, WP_Taxonomy> $hierarchical */
			$hierarchical = get_taxonomies( [ 'hierarchical' => true, 'public' => true ], 'objects' );
			foreach ( $hierarchical as $taxonomy => $obj ) {
				$result['hierarchical'][ $taxonomy ] = $obj->label;
			}

			/** @var array<string, WP_Taxonomy> $flat */
			$flat = get_taxonomies( [ 'hierarchical' => false, 'public' => true ], 'objects' );
			unset( $flat['post_format'] );
			foreach ( $flat as $taxonomy => $obj ) {
				$result['flat'][ $taxonomy ] = $obj->label;
			}

			return $result;
		}
	}
}
