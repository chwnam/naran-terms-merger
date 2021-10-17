import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTaxonomyTerms} from "../store/utils";
import {updateTerms, updateTermsCurrentPage} from "../store/tax-slot-slice";

function TermPaginator() {
    const {
        hierarchical,
        flat,
        taxonomy,
        termsOrderBy,
        termsPerPage,
        termsCurrentPage,
        termsLastPage,
        termsTotal,
    } = useSelector(state => state.taxSlot);

    const dispatch = useDispatch();

    const update = function (page) {
        if (0 <= page && page <= termsLastPage) {
            dispatch(updateTermsCurrentPage(page));
            getTaxonomyTerms({
                hierarchical,
                flat,
                taxonomy,
                orderby: termsOrderBy,
                perPage: termsPerPage,
                page
            }).then(response => {
                dispatch(updateTerms(response));
            });
        }
    }

    return (
        <li>
            <div className="pagination">
                <span className="total-items">Total {termsTotal} items,</span>

                <button
                    type="button"
                    className="button"
                    disabled={termsCurrentPage < 2}
                    onClick={() => {
                        update(1);
                    }}
                >&laquo;
                </button>

                <button
                    type="button"
                    className="button"
                    disabled={termsCurrentPage < 2}
                    onClick={() => {
                        update(termsCurrentPage - 1);
                    }}
                >&lt;
                </button>

                <label htmlFor="pagination-number"
                       className="screen-reader-text">
                    Pagination number
                </label>

                <input
                    id="pagination-number"
                    className="input short-input"
                    type="number"
                    value={termsCurrentPage}
                    min="0"
                    max={termsLastPage}
                    onChange={(e) => {
                        update(parseInt(e.target.value));
                    }}
                /> / <span className="max-page">{termsLastPage}</span>

                <button
                    type="button"
                    className="button"
                    disabled={termsCurrentPage === termsLastPage}
                    onClick={() => {
                        update(termsCurrentPage + 1);
                    }}
                >&gt;
                </button>

                <button
                    type="button"
                    className="button"
                    disabled={termsCurrentPage === termsLastPage}
                    onClick={() => {
                        update(termsLastPage);
                    }}
                >&raquo;
                </button>
            </div>
        </li>
    );
}

export default TermPaginator;
