// @flow
import React, { Component, type Node } from 'react';
import type { CommonProps, KeyboardEventHandler } from '../types';

// ==============================
// Root Container
// ==============================

type ContainerState = {
  /** Whether the select is disabled. */
  isDisabled: boolean,
  /** Whether the text in the select is indented from right to left. */
  isRtl: boolean,
};

export type ContainerProps = CommonProps &
  ContainerState & {
    /** The children to be rendered. */
    children: Node,
    /** Inner props to be passed down to the container. */
    innerProps: { onKeyDown: KeyboardEventHandler },
  };
export const containerCSS = ({ isDisabled, isRtl }: ContainerState) => ({
  direction: isRtl ? 'rtl' : null,
  pointerEvents: isDisabled ? 'none' : null, // cancel mouse events when disabled
  position: 'relative',
});
export const SelectContainer = (props: ContainerProps) => {
  const { children, className, cx, getStyles, innerProps, isDisabled, isRtl } = props;
  let classNames = cx("", {
    '--is-disabled': isDisabled,
    '--is-rtl': isRtl
  }, className);

return (
  <div
    className={classNames}
    style={getStyles('container', props)}
    {...innerProps}
  >
    {children}
  </div>
);
};

// ==============================
// Value Container
// ==============================

export type ValueContainerProps = CommonProps & {
  /** Set when the value container should hold multiple values */
  isMulti: boolean,
  /** Whether the value container currently holds a value. */
  hasValue: boolean,
  /** The children to be rendered. */
  children: Node,
};
export const valueContainerCSS = ({ theme: { spacing } }: ValueContainerProps) => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
  padding: `${spacing.baseUnit / 2}px ${spacing.baseUnit * 2}px`,
  WebkitOverflowScrolling: 'touch',
  position: 'relative',
  overflow: 'hidden',
});
export class ValueContainer extends Component<ValueContainerProps> {
  render() {
    const { children, className, cx, isMulti, getStyles, hasValue } = this.props;
    let classNames = cx("", {
      'value-container': true,
      'value-container--is-multi': isMulti,
      'value-container--has-value': hasValue,
    }, className);

    return (
      <div
        className={classNames}
        style={getStyles('valueContainer', this.props)}
      >
        {children}
      </div>
    );
  }
}

// ==============================
// Indicator Container
// ==============================

type IndicatorsState = {
  /** Whether the text should be rendered right to left. */
  isRtl: boolean,
};

export type IndicatorContainerProps = CommonProps &
  IndicatorsState & {
    /** The children to be rendered. */
    children: Node,
  };

export const indicatorsContainerCSS = () => ({
  alignItems: 'center',
  alignSelf: 'stretch',
  display: 'flex',
  flexShrink: 0,
});
export const IndicatorsContainer = (props: IndicatorContainerProps) => {
  const { children, className, cx, getStyles } = props;
  let classNames = cx("", {
    'indicators': true
  }, className);

  return (
    <div
      className={classNames}
      style={getStyles('indicatorsContainer', props)}
    >
      {children}
    </div>
  );
};
