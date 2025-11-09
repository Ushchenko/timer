"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")["default"];
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _react = _interopRequireDefault(require("react"));
var _colorConvert = require("@uiw/color-convert");
var _reactColorEditableInput = _interopRequireDefault(require("@uiw/react-color-editable-input"));
var _reactColorSwatch = _interopRequireDefault(require("@uiw/react-color-swatch"));
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["prefixCls", "className", "style", "color", "colors", "widthBlock", "inputWidth", "swatchStyle", "showTriangle", "showMainBlock", "showSmallBlock", "flexCenter", "onChange"];
var CORLER_HEX = ['#EB144C', '#FF6900', '#FCB900', '#FCF800', '#23D000', '#7BDCB5', '#00D084', '#8ED1FC', '#06C2E3', '#0693E3', '#F8B7D2', '#F78DA7', '#9E7EDA', '#9900EF'];
var Block = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'w-color-block' : _props$prefixCls,
    className = props.className,
    style = props.style,
    color = props.color,
    _props$colors = props.colors,
    colors = _props$colors === void 0 ? CORLER_HEX : _props$colors,
    _props$widthBlock = props.widthBlock,
    widthBlock = _props$widthBlock === void 0 ? 170 : _props$widthBlock,
    _props$inputWidth = props.inputWidth,
    inputWidth = _props$inputWidth === void 0 ? '100%' : _props$inputWidth,
    _props$swatchStyle = props.swatchStyle,
    swatchStyle = _props$swatchStyle === void 0 ? {
      style: {
        width: 22,
        height: 22
      }
    } : _props$swatchStyle,
    _props$showTriangle = props.showTriangle,
    showTriangle = _props$showTriangle === void 0 ? true : _props$showTriangle,
    _props$showMainBlock = props.showMainBlock,
    showMainBlock = _props$showMainBlock === void 0 ? true : _props$showMainBlock,
    _props$showSmallBlock = props.showSmallBlock,
    showSmallBlock = _props$showSmallBlock === void 0 ? false : _props$showSmallBlock,
    _props$flexCenter = props.flexCenter,
    flexCenter = _props$flexCenter === void 0 ? false : _props$flexCenter,
    onChange = props.onChange,
    other = (0, _objectWithoutProperties2["default"])(props, _excluded);
  var hsva = typeof color === 'string' && (0, _colorConvert.validHex)(color) ? (0, _colorConvert.hexToHsva)(color) : color;
  var hex = color ? (0, _colorConvert.hsvaToHex)(hsva) : '';
  var handleChange = function handleChange(hsv, evn) {
    onChange && onChange((0, _colorConvert.color)(hsv), evn);
  };
  var handleHex = function handleHex(value, evn) {
    if (typeof value === 'string' && (0, _colorConvert.validHex)(value) && /(3|6)/.test(String(value.replace(/^#/, '').length))) {
      onChange && onChange((0, _colorConvert.color)((0, _colorConvert.hexToHsva)(value)), evn);
    }
  };
  var stylePointer = (0, _objectSpread2["default"])({
    '--block-background-color': 'rgb(255, 255, 255)',
    '--block-box-shadow': 'rgb(0 0 0 / 10%) 0 1px',
    width: widthBlock,
    borderRadius: 6,
    background: 'var(--block-background-color)',
    boxShadow: 'var(--block-box-shadow)',
    position: 'relative'
  }, style);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _objectSpread2["default"])((0, _objectSpread2["default"])({
    ref: ref,
    className: [prefixCls, className].filter(Boolean).join(' '),
    style: stylePointer
  }, other), {}, {
    children: [showTriangle && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 10px 10px',
        borderColor: "".concat(showMainBlock ? "transparent transparent ".concat(hex) : "transparent transparent #323232"),
        position: 'absolute',
        top: -10,
        left: '50%',
        marginLeft: -10
      }
    }), showMainBlock && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      title: hex,
      style: {
        backgroundColor: "".concat(hex),
        color: (0, _colorConvert.getContrastingColor)(hex),
        height: 110,
        fontSize: 18,
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      children: hex.toLocaleUpperCase()
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactColorSwatch["default"], {
        colors: colors,
        color: hex,
        flexCenter: flexCenter,
        rectProps: swatchStyle,
        onChange: function onChange(hsva, color, evn) {
          return handleChange(hsva, evn);
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        display: 'flex',
        marginTop: 5,
        justifyContent: 'space-between'
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactColorEditableInput["default"], {
        label: 'Write your color',
        onChange: function onChange(evn, val) {
          return handleHex(val, evn);
        },
        onBlur: function onBlur(evn) {
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
      }), !showMainBlock && showSmallBlock && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: {
          display: 'flex',
          width: '60%',
          height: 22,
          backgroundColor: hex,
          color: (0, _colorConvert.getContrastingColor)(hex),
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
var _default = exports["default"] = Block;
module.exports = exports.default;