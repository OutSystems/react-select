// @flow

import React from 'react';
import Select from '../../src';
import { colourOptions } from '../data';

const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  backgroundColor: '#2684FF',
  marginBottom: 8,
  marginTop: 8,
  width: 1,
};

const IndicatorSeparator = (props) => {
  return (
    <span style={indicatorSeparatorStyle} {...props}/>
  );
};

export default () => (
  <Select
    closeMenuOnSelect={false}
    components={{ IndicatorSeparator }}
    defaultValue={[colourOptions[4], colourOptions[5]]}
    isMulti
    options={colourOptions}
  />
);