import React, { Component } from 'react';
import { Fragment } from 'react';

export default class AddNoteErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        console.log('got error');
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
          return (
            <Fragment>
                <h2>Could not display this properly.</h2>
                {/* <p>Click 
                    <Link to="/">here</Link> to go back.</p> */}
            </Fragment>
          );
        }
        return this.props.children;
      }
}
