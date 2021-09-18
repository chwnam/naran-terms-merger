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
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/vendor/autoload.php';

const NTM_MAIN     = __FILE__;
const NTM_VER      = '1.0.0';
const NTM_PRIORITY = 280;

ntm();
