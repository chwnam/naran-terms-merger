<?php
/**
 * Context:
 *
 * @var WP_Taxonomy[] $hierarchical_taxonomies
 * @var WP_Taxonomy[] $flat_taxonomies
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<div class="wrap">
    <h1>Naran Term Merger</h1>
    <hr class="wp-header-end">
    <div id="naran-tag-merger">

        <div id="taxonomy-selection">
            <label for="taxonomy">Taxonomy</label>:
            <select id="taxonomy" autocomplete="off">
                <option value="" disabled selected>-- Select a taxonomy --</option>
                <optgroup label="Hierarchical">
					<?php foreach ( $hierarchical_taxonomies as $tax ) : ?>
                        <option value="<?php echo esc_attr( $tax->name ); ?>">
							<?php echo esc_html( $tax->label ); ?>
                        </option>
					<?php endforeach; ?>
                </optgroup>
                <optgroup label="Flat">
					<?php foreach ( $flat_taxonomies as $tax ) : ?>
                        <option value="<?php echo esc_attr( $tax->name ); ?>">
							<?php echo esc_html( $tax->label ); ?>
                        </option>
					<?php endforeach; ?>
                </optgroup>
            </select>
            <button type="button" class="button button-secondary">Select Taxonomy</button>
        </div>

        <div id="ntm-container">

            <!-- BEGIN: all terms -->
            <section class="ntm-section terms-section">
                <div>
                    <h3>All Terms</h3>
                    <label for="orderby">Order By</label>:
                    <select id="orderby" autocomplete="off">
                        <option value="name_asc" selected>Name Asc.</option>
                        <option value="name_desc">Name Desc.</option>
                        <option value="count_asc">Count Desc.</option>
                        <option value="count_desc">Count Desc.</option>
                    </select>
                    <button type="button" class="button button-secondary">Reorder Terms</button>
                </div>
                <ul id="all-terms" class="slot overflow-y-scroll">
                </ul>
            </section>
            <!-- END: all terms -->

            <section class="ntm-section action-section">
                <div>
                    <h3>Actions</h3>
                    <button id="clear" type="button" class="button button-secondary">Clear Items</button>
                    <ul id="selected-terms" class="slot action-slot">
                        <li class="pivot">
                            MacIntosh
                            <span class="remove">&times;</span>
                        </li>
                        <li>Empire <span class="remove">&times;</span></li>
                        <li>Fuji <span class="remove">&times;</span></li>
                        <li>Gala <span class="remove">&times;</span></li>
                    </ul>
                    <p class="merge-wrap">
                        <button id="merge" class="button button-primary merge-button" type="button">Merge Terms</button>
                    </p>
                </div>
            </section>
        </div>
    </div>
</div>

<script type="text/template" id="tmpl-all-terms">
    <# if (data.terms.length > 0) { #>
    <# data.terms.forEach(function(item) { #>
    <li>{{ item.name }} ({{ item.count }})</li>
    <# }); #>
    <# } #>
</script>


<script type="text/template" id="tmpl-selected-terms">
</script>
