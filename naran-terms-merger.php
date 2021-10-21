<?php
/**
 * Plugin Name:       Naran Terms Merger
 * Description:       Merge multiple terms into a single term.
 * Plugin URI:        https://github.com/chwnam/naran-terms-merger/
 * Author:            changwoo
 * Author URI:        https://blog.changwoo.pe.kr
 * Version:           1.0.0
 * Requires at least: 5.5.0
 * Requires PHP:      7.4
 * Text Domain:       ntm
 * Domain Path:       languages
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/vendor/autoload.php';

const NTM_MAIN     = __FILE__;
const NTM_VER      = '1.0.0';
const NTM_PRIORITY = 280;

ntm();
