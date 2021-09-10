/*
 *
 * Loading
 *
 */
import React from 'react';
import { Ripple } from 'react-spinners-css';

import styles from './styles.module.css';

interface Props {}

export default function Loading(props: Props) {
  return (
    <div className={styles.root}>
      <Ripple color="#000000" />
    </div>
  );
}
