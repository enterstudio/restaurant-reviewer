import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
/* eslint-disable*/ // Containers is an alias, so no file is found
import {
  LandingContainer,
  RestaurantsGridContainer,
} from 'containers';
import {
  AppFooter,
} from 'components';
import { updatePageTitle } from 'utils/a11y';

/* eslint-enable */
class LandingPage extends Component {
  componentDidMount() {
    updatePageTitle('Home Page');
  }
  render() {
    return (
      <div className={styles.container}>
        <LandingContainer />
        <RestaurantsGridContainer />
        <AppFooter />
      </div>
    );
  }
}

export default cssModules(LandingPage, styles);
