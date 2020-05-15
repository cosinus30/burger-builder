import React from 'react'

import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <React.Fragment>
            <div>
                <p>Toolbar, sidebar, backdrop</p>
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout