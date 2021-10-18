<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<div class="wrap">
    <h1>Naran Terms Merger (Mockup 2)</h1>
    <hr class="wp-header-end">

    <div id="naran-terms-merger">
        <nav class="nav-tab-wrapper wp-clearfix" aria-label="Secondary Menu">
            <a id="ntm-tab-terms" href="javascript: void(0);" class="nav-tab nav-tab-active"
               data-target-frame="ntm-frame-terms"
               aria-current="page">Terms</a>
            <a id="ntm-tab-slots" href="javascript: void(0);" class="nav-tab"
               data-target-frame="ntm-frame-slots">Slots</a>
        </nav>

        <div class="ntm-tab-frame-wrap">
            <div id="ntm-frame-terms" class="ntm-tab-frame ntm-frame-active">
                <ul class="ntm-frame-controls">
                    <li>
                        <div class="terms-controls">
                            <label for="taxonomy-selector">Taxonomy</label>
                            <select id="taxonomy-selector" autocomplete="off">
                                <optgroup label="Hierarchical">
                                    <option value="category">Category</option>
                                </optgroup>
                                <optgroup label="Flat">
                                    <option value="post_tag">Tag</option>
                                </optgroup>
                            </select>

                            <span class="control-separator">|</span>

                            <label for="terms-orderby">Order</label>
                            <select id="terms-orderby">
                                <option value="name-asc">Term Name Asc.</option>
                                <option value="name-desc">Term Name Desc.</option>
                                <option value="id-desc">Term ID DESC.</option>
                                <option value="id-desc">Term ID DESC.</option>
                            </select>

                            <span class="control-separator">|</span>

                            <label for="terms-per-page">Per Page</label>
                            <input id="terms-per-page"
                                   type="number"
                                   class="text short-input"
                                   value="10"
                                   min="10"
                                   max="100"
                                   step="10">
                        </div>
                    </li>

                    <li>
                        <div class="expand-collapse">
                            <a href="javascript: void(0);">Expand All</a>

                            <span class="control-separator">|</span>

                            <a href="javascript: void(0);">Collapse All</a>
                        </div>
                    </li>

                    <li>
                        <div class="pagination">
                            <span class="total-items">Total 100 items,</span>

                            <button type="button"
                                    class="button">&laquo;
                            </button>

                            <button type="button"
                                    class="button">&lt;
                            </button>

                            <label for="pagination-number" class="screen-reader-text">Pagination number</label>
                            <input type="number"
                                   class="input short-input"
                                   id="pagination-number"
                                   value="1"
                                   min="1"
                                   max="10"> / <span class="max-page">10</span>

                            <button type="button"
                                    class="button">&gt;
                            </button>

                            <button type="button"
                                    class="button">&raquo;
                            </button>
                        </div>
                    </li>
                </ul>

                <div class="frame-content">
                    <ul id="ntm-terms" class="taxonomy-category">
                        <li class="ntm-term ntm-item-wrap">
                            <div class="ntm-title-wrap">
                                <h3 class="ntm-item-title">Mockup term #1</h3>
                                <div class="ntm-item-control">
                                    <span class="ntm-item-toggle ntm-item-icon ntm-icon-chevron-up"></span>
                                </div>
                            </div>
                            <div class="ntm-item-inside collapsed">
                                <ul class="ntm-term-detail">
                                    <li>Term description</li>
                                    <li>Term ID: 45</li>
                                    <li>Taxonomy ID: 47</li>
                                    <li>Slug: sample-slug</li>
                                </ul>
                                <div class="ntm-designate-slot-wrap">
                                    <label for="designated-slot">Designated to</label>
                                    <select id="designated-slot">
                                        <option value="slog-1">Slot #1</option>
                                        <option value="slot-2" selected>Slot #2</option>
                                        <option value="slot-3">Slot #3</option>
                                    </select>
                                </div>
                            </div>
                        </li>

                        <li class="ntm-item-wrap current">
                            <div class="ntm-title-wrap">
                                <h3 class="ntm-item-title">Mockup term #2</h3>
                                <div class="ntm-item-control">
                                    <span class="ntm-item-toggle ntm-item-icon ntm-icon-chevron-up"></span>
                                </div>
                            </div>
                            <div class="ntm-item-inside collapsed">
                                <ul class="ntm-term-detail">
                                    <li>Term description</li>
                                    <li>Term ID: 45</li>
                                    <li>Taxonomy ID: 47</li>
                                    <li>Slug: sample-slug</li>
                                </ul>
                                <div class="ntm-designate-slot-wrap">
                                    <label for="designated-slot">Designated to</label>
                                    <select id="designated-slot">
                                        <option value="slog-1">Slot #1</option>
                                        <option value="slot-2" selected>Slot #2</option>
                                        <option value="slot-3">Slot #3</option>
                                    </select>
                                </div>
                            </div>
                        </li>

                        <li class="ntm-no-items">
                            <p>[No items found]</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="ntm-frame-slots" class="ntm-tab-frame ">
                <ul class="ntm-frame-controls">
                    <li>
                        <button type="button" class="button">Add new slot</button>
                    </li>
                    <li>
                        <div class="expand-collapse">
                            <a href="javascript: void(0);">Expand All</a>

                            <span class="control-separator">|</span>

                            <a href="javascript: void(0);">Collapse All</a>
                        </div>
                    </li>
                </ul>

                <div class="ntm-frame-content">
                    <ul id="ntm-slots">
                        <li class="ntm-slot ntm-item-wrap">
                            <div class="ntm-title-wrap">
                                <h3 class="ntm-item-title">
                                    [#1] Mockup Slot #1
                                    <a href="javascript: void(0);"
                                       class="ntm-slot-title-action"
                                       role="button">Edit name...</a>
                                </h3>
                                <div class="ntm-item-control">
                                    <span class="ntm-item-toggle ntm-item-icon ntm-icon-chevron-up"></span>
                                </div>
                            </div>
                            <div class="ntm-item-inside collapsed">
                                <div class="ntm-slot-tool collapsed">
                                    <div class="ntm-slot-name-input">
                                        <label for="slot-name">Name</label>
                                        <input id="slot-name"
                                               type="text"
                                               class="text"
                                               placeholder="Name of this slot"
                                               value="">
                                        <button type="button"
                                                class="button ntm-button-rename-slot">OK
                                        </button>
                                        <button type="button"
                                                class="button ntm-button-cancel">Cancel
                                        </button>
                                    </div>
                                    <hr>
                                </div>
                                <div class="ntm-slot-item">
                                    <h4>Assigned terms</h4>
                                    <ul class="ntm-slot-assigned-terms">
                                        <li class="header-term" title="Term ID: 414">
                                            Term one
                                            <span class="remove-term">&times;</span>
                                        </li>
                                        <li title="Term ID: 418">
                                            Term two
                                            <span class="remove-term">&times;</span>
                                        </li>
                                    </ul>
                                </div>
                                <hr>
                                <div class="ntm-slot-item">
                                    <h4>Actions</h4>
                                    <ul class="ntm-slot-actions">
                                        <li>
                                            <label for="header-term">Header term</label>
                                            <select id="header-term">
                                                <option value="414">Term one</option>
                                                <option value="418">Term two</option>
                                            </select>
                                        </li>
                                        <li>
                                            <button type="button"
                                                    class="button button-primary">Merge Terms
                                            </button>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);"
                                               role="button"
                                               class="remove">Remove this slot
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li class="ntm-slot ntm-item-wrap">
                            <div class="ntm-title-wrap">
                                <h3 class="ntm-item-title">
                                    [#2] Mockup Slot #2
                                    <a href="javascript: void(0);"
                                       class="ntm-slot-title-action"
                                       role="button">Edit name...</a>
                                </h3>
                                <div class="ntm-item-control">
                                    <span class="ntm-item-toggle ntm-item-icon ntm-icon-chevron-up"></span>
                                </div>
                            </div>
                            <div class="ntm-item-inside collapsed">
                                <div class="ntm-slot-tool collapsed">
                                    <div class="ntm-slot-name-input">
                                        <label for="slot-name">Name</label>
                                        <input id="slot-name"
                                               type="text"
                                               class="text"
                                               placeholder="Name of this slot"
                                               value="">
                                        <button type="button"
                                                class="button ntm-button-rename-slot">OK
                                        </button>
                                        <button type="button"
                                                class="button ntm-button-cancel">Cancel
                                        </button>
                                    </div>
                                    <hr>
                                </div>
                                <div class="ntm-slot-item">
                                    <h4>Assigned terms</h4>
                                    <p class="ntm-slot-assigned-terms no-assigned-terms">No assigned Terms</p>
                                </div>
                                <hr>
                                <div class="ntm-slot-item">
                                    <h4>Actions</h4>
                                    <ul class="ntm-slot-actions">
                                        <li>
                                            <label for="header-term">Header term</label>
                                            <select id="header-term">
                                                <option value="414">Term one</option>
                                                <option value="418">Term two</option>
                                            </select>
                                        </li>
                                        <li>
                                            <button type="button"
                                                    class="button button-primary">Merge Terms
                                            </button>
                                        </li>
                                        <li>
                                            <a href="javascript: void(0);"
                                               role="button"
                                               class="remove">Remove this slot
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li class="ntm-no-items">
                            <p>[No slots found. Please create a new slot]</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</div>

<script>

</script>