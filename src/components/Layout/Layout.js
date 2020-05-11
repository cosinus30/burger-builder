import React from 'react'

const Layout = (props) => {
    return (
        <React.Fragment>
            <div>
                <p>Toolbar, sidebar, backdrop</p>
            </div>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout