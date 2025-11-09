import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefixCls", "className", "style", "color", "colors", "widthBlock", "inputWidth", "swatchStyle", "showTriangle", "showMainBlock", "showSmallBlock", "flexCenter", "onChange"];
import React from 'react';
import { color as handleColor, validHex, hexToHsva, hsvaToHex, getContrastingColor } from '@uiw/color-convert';
import EditableInput from '@uiw/react-color-editable-input';
import Swatch from '@uiw/react-color-swatch';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var CORLER_HEX = ['#EB144C', '#FF6900', '#FCB900', '#FCF800', '#23D000', '#7BDCB5', '#00D084', '#8ED1FC', '#06C2E3', '#0693E3', '#F8B7D2', '#F78DA7', '#9E7EDA', '#9900EF'];
var Block = /*#__PURE__*/React.forwardRef((props, ref) => {
  var {
      prefixCls = 'w-color-block',
      className,
      style,
      color,
      colors = CORLER_HEX,
      widthBlock = 170,
      inputWidth = '100%',
      swatchStyle = {
        style: {
          width: 22,
          height: 22
        }
      },
      showTriangle = true,
      showMainBlock = true,
      showSmallBlock = false,
      flexCenter = false,
      onChange
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var hsva = typeof color === 'string' && validHex(color) ? hexToHsva(color) : color;
  var hex = color ? hsvaToHex(hsva) : '';
  var handleChange = (hsv, evn) => {
    onChange && onChange(handleColor(hsv), evn);
  };
  var handleHex = (value, evn) => {
    if (typeof value === 'string' && validHex(value) && /(3|6)/.test(String(value.replace(/^#/, '').length))) {
      onChange && onChange(handleColor(hexToHsva(value)), evn);
    }
  };
  var stylePointer = _extends({
    '--block-background-color': 'rgb(255, 255, 255)',
    '--block-box-shadow': 'rgb(0 0 0 / 10%) 0 1px',
    width: widthBlock,
    borderRadius: 6,
    background: 'var(--block-background-color)',
    boxShadow: 'var(--block-box-shadow)',
    position: 'relative'
  }, style);
  return /*#__PURE__*/_jsxs("div", _extends({
    ref: ref,
    className: [prefixCls, className].filter(Boolean).join(' '),
    style: stylePointer
  }, other, {
    children: [showTriangle && /*#__PURE__*/_jsx("div", {
      style: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 10px 10px',
        borderColor: "" + (showMainBlock ? "transparent transparent " + hex : "transparent transparent #323232"),
        position: 'absolute',
        top: -10,
        left: '50%',
        marginLeft: -10
      }
    }), showMainBlock && /*#__PURE__*/_jsx("div", {
      title: hex,
      style: {
        backgroundColor: "" + hex,
        color: getContrastingColor(hex),
        height: 110,
        fontSize: 18,
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: hex.toLocaleUpperCase()
    }), /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx(Swatch, {
        colors: colors,
        color: hex,
        flexCenter: flexCenter,
        rectProps: swatchStyle,
        onChange: (hsva, color, evn) => handleChange(hsva, evn)
      })
    }), /*#__PURE__*/_jsxs("div", {
      style: {
        display: 'flex',
        marginTop: 5,
        justifyContent: 'space-between'
      },
      children: [/*#__PURE__*/_jsx(EditableInput, {
        label: 'Write your color',
        onChange: (evn, val) => handleHex(val, evn),
        onBlur: evn => {
          var value = evn.target.value;
          evn.target.value = value.slice(0, 6);
          handleHex(value.slice(0, 6), evn);
        },
        inputStyle: {
          height: 22,
          width: inputWidth,
          outline: 0,
          borderRadius: 3,
          padding: '0 7px',
          fontSize: 12
        },
        style: {
          padding: '0px 10px 10px 10px',
          paddingTop: 0,
          borderRadius: '0 0 6px 6px'
        }
      }), !showMainBlock && showSmallBlock && /*#__PURE__*/_jsx("span", {
        style: {
          display: 'flex',
          width: '60%',
          height: 22,
          backgroundColor: hex,
          color: getContrastingColor(hex),
          marginRight: '13.5px',
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center'
        },
        children: hex
      })]
    })]
  }));
});
Block.displayName = 'Block';
export default Block;