// @flow
import React, { Component, type Node } from 'react';
import { CrossIcon } from './indicators';
import type { CommonProps } from '../types';

export type MultiValueProps = CommonProps & {
  children: Node,
  components: any,
  cropWithEllipsis: boolean,
  data: any,
  innerProps: any,
  isFocused: boolean,
  isDisabled: boolean,
  removeProps: {
    onTouchEnd: any => void,
    onClick: any => void,
    onMouseDown: any => void,
  },
};

export const multiValueCSS = ({
  theme: { spacing, borderRadius, colors },
}: MultiValueProps) => ({
  backgroundColor: colors.neutral10,
  borderRadius: borderRadius / 2,
  display: 'flex',
  margin: spacing.baseUnit / 2,
  minWidth: 0, // resolves flex/text-overflow bug
});

export const multiValueLabelCSS = ({ theme: { borderRadius, colors }, cropWithEllipsis }: MultiValueProps) => ({
  borderRadius: borderRadius / 2,
  color: colors.neutral80,
  fontSize: '85%',
  overflow: 'hidden',
  padding: 3,
  paddingLeft: 6,
  textOverflow: cropWithEllipsis ? 'ellipsis' : null,
  whiteSpace: 'nowrap',
});

export const multiValueRemoveCSS = ({
  theme: { spacing, borderRadius, colors },
  isFocused,
}: MultiValueProps) => ({
  alignItems: 'center',
  borderRadius: borderRadius / 2,
  backgroundColor: isFocused && colors.dangerLight,
  display: 'flex',
  paddingLeft: spacing.baseUnit,
  paddingRight: spacing.baseUnit,
  ':hover': {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },
});

export type MultiValueGenericProps = {
  children: Node,
  data: any,
  innerProps: { className?: string },
  selectProps: any,
};
export const MultiValueGeneric = ({
  children,
  innerProps,
}: MultiValueGenericProps) => <div {...innerProps}>{children}</div>;

export const MultiValueContainer = MultiValueGeneric;
export const MultiValueLabel = MultiValueGeneric;
export type MultiValueRemoveProps = {
  children: Node,
  data: any,
  innerProps: {
    className: string,
    onTouchEnd: any => void,
    onClick: any => void,
    onMouseDown: any => void,
  },
  selectProps: any,
};
export class MultiValueRemove extends Component<MultiValueRemoveProps> {
  render() {
    const { children, innerProps } = this.props;
    return <div {...innerProps}>{children || <CrossIcon size={14} />}</div>;
  }
}

class MultiValue extends Component<MultiValueProps> {
  static defaultProps = {
    cropWithEllipsis: true,
  };
  render() {
    const {
      children,
      className,
      components,
      cx,
      data,
      getStyles,
      innerProps,
      isDisabled,
      removeProps,
      selectProps,
    } = this.props;

    const { Container, Label, Remove } = components;

    const containerInnerProps = {
      className: cx("", {
        'multi-value': true,
        'multi-value--is-disabled': isDisabled,
      }, className),
      style: getStyles('multiValue', this.props),
      ...innerProps,
    };

    const labelInnerProps = {
      className: cx("", {
        'multi-value__label': true,
      }, className),
      style: getStyles('multiValueLabel', this.props)
    };

    const removeInnerProps = {
      className: cx("", {
        'multi-value__remove': true,
      }, className),
      style: getStyles('multiValueRemove', this.props),
      ...removeProps,
    };

    return (
      <Container
        data={data}
        innerProps={containerInnerProps}
        selectProps={selectProps}
      >
        <Label
          data={data}
          innerProps={labelInnerProps}
          selectProps={selectProps}
        >
          {children}
        </Label>
        <Remove
          data={data}
          innerProps={removeInnerProps}
          selectProps={selectProps}
        />
      </Container>
    );
  }
}

export default MultiValue;
