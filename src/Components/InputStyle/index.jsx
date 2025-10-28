import "./InputStyle.css";

export const InputStyle = ({
  placeholder,
  type,
  btnText,
  customFunc,
  value,
  onChange,
}) => {
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
          />
          <div className="action-btn">
            <button className="action-btn -btn" onClick={customFunc}>
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
