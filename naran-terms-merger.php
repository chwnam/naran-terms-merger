<?php
/**
 * Plugin Name:       Naran Terms Merger
 * Description:       Merge multiple terms into a single term.
 * Plugin URI:        ht
 * tps://github.com/chwnam/naran-terms-merger/
 * Author:            changwoo
 * Author URI:        https://blog.changwoo.pe.kr
 * Version:           0.0.0
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

// TODO: 50  키보드 단축키로 사용 가능하게.
// TODO: 200 번역.
