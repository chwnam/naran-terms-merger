import React from "react";

class NavTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tabs = this.props.tabs;
        const onClickTab = this.props.onClickTab;

        return (
            <nav className="nav-tab-wrapper wp-clearfix" aria-label="Secondary Menu">
                {
                    Object.entries(tabs).map(([key, {id, classNames, label}]) => {
                        return <a
                            key={key}
                            id={id}
                            href="#"
                            className={classNames.join(' ')}
                            onClick={() => {
                                onClickTab(key);
                            }}
                        >{label}</a>
                    })
                }
            </nav>
        );
    }
}

export default NavTabs;