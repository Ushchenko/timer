import { useRef } from "react";
import "./InputStyle.css";

export const InputStyle = ({
  placeholder,
  type,
  btnText,
  width,
  paddingRight,
  customFunc,
  value,
  onChange,
}) => {
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
            ref={inputRef}
            style={{width: width, paddingRight: paddingRight}}
          />
          <div className="action-btn">
            <button
              type="button"
              className="action-btn -btn"
              onClick={value ? customFunc : handleClick}
            >
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
