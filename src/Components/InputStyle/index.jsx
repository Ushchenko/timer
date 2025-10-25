import './InputStyle.css'

export const InputStyle = ({ placeholder, type, text, }) => {
  return (
    <>
        <div className="content">
          <div className='content_action-input'>
            <input className='action-input -solid' placeholder={placeholder} type={type} />
            <div className='action-btn'>
              <button className='action-btn -btn'>{text}</button>
            </div>
          </div>
        </div>
    </>
  )
}