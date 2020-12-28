import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState({ showSideDrawer: true })
    }


    render() {
        return (
            <React.Fragment>
                <div>
                    <Toolbar
                        drawerToggleClicked={this.sideDrawerToggleHandler}
                        isAuthenticated={this.props.isAuthenticated}>
                    </Toolbar>
                    <SideDrawer
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        isAuthenticated={this.props.isAuthenticated} />
                </div>
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout)