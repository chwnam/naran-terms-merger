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


// TODO: 5   merge term 구현.
// TODO: 10  terms pagination 구현.
// TODO: 50  키보드 단축키로 사용 가능하게.
// TODO: 100 텀/슬롯 툴바에 모두 열기/접기 구현.
// TODO: 200 번역.
// TODO: 100 텀이 있음에도 sorry no terms found. 라는 말이 나오는 건 이상함.
