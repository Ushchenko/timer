import { forwardRef, useRef } from "react";
import "./InputStyle.css";

export const InputStyle = forwardRef(
  (
    {
      placeholder,
      type,
      btnText,
      customButtonFunc,
      value,
      inputStyleProps,
      buttonStyleProps,
      onChange,
    },
    ref
  ) => {
    const inputRef = useRef(null);

    const handleClick = () => {
      inputRef.current.focus();
    };

    return (
      <>
        <div className="content">
          <div className="content_action-input">
            <input
              className="action-input -solid"
              placeholder={placeholder}
              type={type}
              value={value}
              onChange={onChange}
              ref={ref || inputRef}
              style={inputStyleProps}
            />
            <div className="action-btn">
              <button
                type="button"
                className="action-btn -btn"
                onClick={value ? customButtonFunc : handleClick}
                style={buttonStyleProps}
              >
                {btnText}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);
