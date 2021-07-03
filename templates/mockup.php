<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<script>
    function drag(e) {
        e.dataTransfer.setData('term', e.target.innerText);
    }

    function drop(e) {
        e.preventDefault();
        var term = e.dataTransfer.getData('term');
        alert(term + ' received!');
    }

    function allowDrop(e) {
        e.preventDefault();
    }
</script>

<div class="wrap">
    <h1>Naran Term Merger (Mockup)</h1>
    <hr class="wp-header-end">
    <div id="naran-tag-merger">
        <div id="taxonomy-selection">
            <label for="taxonomy">Taxonomy</label>:
            <select id="taxonomy" autocomplete="off">
                <option value="" disabled selected>-- Choose a taxonomy --</option>
                <optgroup label="Hierarchical">
                    <option value="category">Category</option>
                </optgroup>
                <optgroup label="Flat">
                    <option value="post_tag">Post Tag</option>
                </optgroup>
            </select>
            <button type="button" class="button button-secondary">Select</button>
        </div>
        <div id="ntm-container">
            <section class="ntm-section terms-section">
                <div>
                    <h3>All Terms</h3>
                    <label for="orderby">Order By</label>:
                    <select id="orderby" autocomplete="off">
                        <option value="name_asc" selected>Name Asc.</option>
                        <option value="name_asc">Name Desc.</option>
                        <option value="count_asc">Count Desc.</option>
                        <option value="count_desc">Count Desc.</option>
                    </select>
                    <button type="button" class="button button-secondary">Reorder</button>
                </div>
                <ul id="all-terms" class="slot overflow-y-scroll">
                    <li draggable="true" ondragstart="drag(event)">
                        Foo (1)
                        <div class="merge-group-indicator">Slot #1</div>
                    </li>
                    <li>Bar (2)</li>
                    <li>Baz (1)</li>
                    <li>Sample (2)</li>
                    <li class="selected">Term #1 (10)</li>
                    <li>Term #2 (10)</li>
                    <li>Term #3 (10)</li>
                    <li>Term #4 (10)</li>
                    <li>Term #5 (10)</li>
                    <li>Term #6 (10)</li>
                    <li>Term #7 (10)</li>
                    <li>Term #8 (10)</li>
                    <li>Term #9 (10)</li>
                    <li>Term #10 (10)</li>
                    <li>Term #11 (10)</li>
                    <li>Term #12 (10)</li>
                    <li>Term #13 (10)</li>
                    <li>Term #14 (10)</li>
                    <li>Term #15 (10)</li>
                    <li>Term #16 (10)</li>
                    <li>Term #17 (10)</li>
                    <li>Term #18 (10)</li>
                    <li>Term #19 (10)</li>
                    <li>Term #20 (10)</li>
                    <li>Term #21 (10)</li>
                    <li>Term #22 (10)</li>
                    <li>Term #23 (10)</li>
                    <li>Term #24 (10)</li>
                    <li>Term #25 (10)</li>
                    <li>Term #26 (10)</li>
                    <li>Term #27 (10)</li>
                    <li>Term #28 (10)</li>
                    <li>Term #29 (10)</li>
                    <li>Term #30 (10)</li>
                    <li>Term #31 (10)</li>
                    <li>Term #32 (10)</li>
                    <li>Term #33 (10)</li>
                    <li>Term #34 (10)</li>
                    <li>Term #35 (10)</li>
                    <li>Term #36 (10)</li>
                    <li>Term #37 (10)</li>
                    <li>Term #38 (10)</li>
                    <li>Term #39 (10)</li>
                    <li>Term #40 (10)</li>
                    <li>Term #41 (10)</li>
                    <li>Term #42 (10)</li>
                    <li>Term #43 (10)</li>
                    <li>Term #44 (10)</li>
                    <li>Term #45 (10)</li>
                    <li>Term #46 (10)</li>
                    <li>Term #47 (10)</li>
                    <li>Term #48 (10)</li>
                    <li>Term #49 (10)</li>
                </ul>
            </section>
            <section class="ntm-section action-section">
                <div>
                    <h3 class="merge-groups-heading">Merge Groups</h3>
                    <a href="#" class="new-merge-group button button-secondary">Add</a>
                    <div>
                        <h4 class="merge-group-heading">Group #1</h4>
                        <ul id="selected-terms"
                            class="slot merge-group"
                            ondrop="drop(event)" ondragover="allowDrop(event)">
                            <li class="pivot">
                                MacIntosh
                                <span class="remove">&times;</span>
                            </li>
                            <li>Empire <span class="remove">&times;</span></li>
                            <li>Fuji <span class="remove">&times;</span></li>
                            <li>Gala <span class="remove">&times;</span></li>
                        </ul>
                        <p class="merge-wrap">
                            <button class="button button-primary merge-button" type="button">Merge</button>
                            <a class="remove-merge-group" href="#">Remove</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
