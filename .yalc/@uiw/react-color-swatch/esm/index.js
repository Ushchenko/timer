import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["prefixCls", "className", "color", "colors", "flexCenter", "style", "rectProps", "onChange", "addonAfter", "addonBefore", "rectRender"];
import React, { Fragment, useCallback, useRef } from 'react';
import { hexToHsva, color as handleColor } from '@uiw/color-convert';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var Swatch = /*#__PURE__*/React.forwardRef((props, ref) => {
  var {
      prefixCls = 'w-color-swatch',
      className,
      color,
      colors = [],
      flexCenter,
      style,
      rectProps = {},
      onChange,
      addonAfter,
      addonBefore,
      rectRender
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var rectStyle = _extends({
    '--swatch-background-color': 'rgb(144, 19, 254)',
    background: 'var(--swatch-background-color)',
    height: 15,
    width: 15,
    marginRight: flexCenter ? 0 : 10,
    marginBottom: flexCenter ? 0 : 10,
    cursor: 'pointer',
    position: 'relative',
    outline: 'none',
    borderRadius: 2,
    transition: '.15s ease-in-out'
  }, rectProps.style);
  var swatchBtn = useRef(null);
  var handleMouseEnter = useCallback(evn => {
    evn.currentTarget.style.transform = 'scale(1.2)';
  }, []);
  var handleMouseLeave = useCallback(evn => {
    evn.currentTarget.style.transform = 'scale(1)';
  }, []);
  var handleClick = (hex, evn) => {
    // console.log(evn.currentTarget.tagName)
    onChange && onChange(hexToHsva(hex), handleColor(hexToHsva(hex)), evn);
  };
  return /*#__PURE__*/_jsxs("div", _extends({
    ref: ref
  }, other, {
    className: [prefixCls, className || ''].filter(Boolean).join(' '),
    style: _extends({}, flexCenter ? {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(22px, 1fr))',
      alignItems: 'center',
      margin: '10px 10px 10px',
      gap: '10px'
    } : {
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative',
      paddingLeft: 10,
      paddingTop: 10
    }, style),
    children: [addonBefore && /*#__PURE__*/React.isValidElement(addonBefore) && addonBefore, colors && Array.isArray(colors) && colors.map((item, idx) => {
      var title = '';
      var background = '';
      if (typeof item === 'string') {
        title = item;
        background = item;
      }
      if (typeof item === 'object' && item.color) {
        title = item.title || item.color;
        background = item.color;
      }
      var checked = color && color.toLocaleLowerCase() === background.toLocaleLowerCase();
      var render = rectRender && rectRender({
        title,
        color: background,
        checked: !!checked,
        style: _extends({}, rectStyle, {
          background
        }),
        onClick: evn => handleClick(background, evn)
      });
      if (render) {
        return /*#__PURE__*/_jsx(Fragment, {
          children: render
        }, idx);
      }
      var child = rectProps.children && /*#__PURE__*/React.isValidElement(rectProps.children) ? /*#__PURE__*/React.cloneElement(rectProps.children, {
        color: background,
        checked
      }) : null;
      return /*#__PURE__*/_jsx("div", _extends({
        tabIndex: 0,
        title: title,
        onClick: evn => handleClick(background, evn),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      }, rectProps, {
        children: child,
        style: _extends({
          boxSizing: 'border-box',
          border: "" + (checked ? "1px solid " + color : ''),
          boxShadow: "" + (checked ? "0px 0px 5px " + color : '')
        }, rectStyle, {
          background
        })
      }), idx);
    }), addonAfter && /*#__PURE__*/React.isValidElement(addonAfter) && addonAfter]
  }));
});
Swatch.displayName = 'Swatch';
export default Swatch;