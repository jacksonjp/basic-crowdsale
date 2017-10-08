//@flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import styles from './wrapper.scss';

type Props = {
  children: PropTypes.element
};

class Wrapper extends Component<Props> {
  render() {
    return (
      <div>
        <header>
          <div>
            <h1>Crowdsale dApp (SSR + RR4 + SASS) uses metaMask</h1>
            <div />
          </div>
        </header>
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Wrapper;
