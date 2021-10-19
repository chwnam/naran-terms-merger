<?php
/**
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'NTM_Terms_Merger' ) ) {
	class NTM_Terms_Merger implements NTM_Module {
		use NTM_Hooks_Impl;
		use NTM_Template_Impl;

		private string $page_hook;

		public function __construct() {
			$this->page_hook = '';

			$this
				->add_action( 'admin_menu', 'add_admin_menu' )
				->add_action( 'admin_enqueue_scripts', 'enqueue_scripts' )
			;
		}

		public function add_admin_menu() {
			$this->page_hook = add_submenu_page(
				'tools.php',
				'Naran Terms Merger',
				'Terms Merger',
				'administrator',
				'ntm-terms-merger',
				[ $this, 'output_admin_menu' ]
			);
		}

		public function enqueue_scripts( string $hook ) {
			if ( $hook === $this->page_hook ) {
				$this->enqueue_style( 'ntm-style' );
			}
		}

		public function output_admin_menu() {
			$this
				->enqueue_script( 'ntm-terms-merger' )
				->localize_script(
					'ntm-terms-merger',
					'ntm',
					[
						'restUrl' => get_rest_url(),
						'ajaxUrl' => admin_url( 'admin-ajax.php' ),
						'nonce'   => wp_create_nonce( 'naran-terms-merger' ),
					]
				)
				->template( 'terms-merger.php' )
			;

			if ( in_array( wp_get_environment_type(), [ 'local', 'develop' ], true ) ) {
				$this->enqueue_script( 'ntm-live-reload' );
			}
		}

		public function merge_terms() {
			check_ajax_referer( 'naran-terms-merger', 'nonce' );

			if ( ! current_user_can( 'administrator' ) ) {
				wp_die( 'You are not allowed to do this action.' );
			}

			$term_ids    = array_filter( array_map( 'absint', $_REQUEST['term_id'] ?? [] ) );
			$header_term = absint( $_REQUEST['header_term'] ?? '0' );
			$errors      = new WP_Error();

			if ( count( $term_ids ) < 2 ) {
				$errors->add( 'error', '\'term_id\' must contain at least 2 term ids.' );
			} elseif ( ! in_array( $header_term, $term_ids ) ) {
				$errors->add( 'error', '\'header_term\' value must be found in \'term_id\' array.' );
			}

			$terms = ( new WP_Term_Query(
				[
					'include'    => $term_ids,
					'hide_empty' => false,
				]
			) )->get_terms();

			if ( count( $terms ) !== count( $term_ids ) ) {
				$errors->add( 'error', 'Invalid value in \'term_id\'.' );
			}

			if ( $errors->has_errors() ) {
				wp_send_json_error( $errors );
			}

            // TODO: 텀 ID 가 실제로 없으면 그냥 필터.
            // TODO: 헤더 텀과 나머지 텀중 일부가 이미 같은 포스트에 같이 관계를 가지는 경우 DB 에러가 난다. 이를 수정해야 한다.

			// change object ids.
			global $wpdb;

			$header_tt    = - 1;
			$header_tax   = '';
			$merged_tt    = [];
			$placeholders = implode( ', ', array_pad( [], count( $terms ) - 1, '%d' ) );
			$query        = "UPDATE {$wpdb->term_relationships} " .
			                "SET term_taxonomy_id=%d WHERE term_taxonomy_id IN ({$placeholders})";

			foreach ( $terms as $term ) {
				if ( $term->term_id === $header_term ) {
					$header_tt  = $term->term_taxonomy_id;
					$header_tax = $term->taxonomy;
				} else {
					$merged_tt[] = $term->term_taxonomy_id;
				}
			}

			$wpdb->get_results( $wpdb->prepare( $query, array_merge( [ $header_tt ], $merged_tt ) ) );

			foreach ( $terms as $term ) {
				if ( $term->term_id !== $header_term ) {
					wp_delete_term( $term->term_id, $term->taxonomy );
				}
			}
			// Re-count term.
			wp_update_term_count( $header_term, $header_tax );

			// Finish.
			wp_send_json_success();
		}
	}
}
