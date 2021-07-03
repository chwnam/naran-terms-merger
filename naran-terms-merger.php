<?php
/**
 * Plugin Name: Naran Terms Merger
 * Description:
 * Plugin URI:
 * Author:
 * Author URI:
 * Version:
 * Requires at least:
 * Requires PHP:
 * Text Domain:
 * Domain Path:
 * License:
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Naran_Terms_Merger
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const NTM_MAIN     = __FILE__;
const NTM_VER      = '1.0.0';
const NTM_PRIORITY = 280;

require_once __DIR__ . '/includes/trait-ntm-hooks-impl.php';
require_once __DIR__ . '/includes/trait-ntm-template-impl.php';
require_once __DIR__ . '/includes/class-ntm-main.php';
require_once __DIR__ . '/includes/class-ntm-merger.php';
require_once __DIR__ . '/includes/functions.php';

ntm();
