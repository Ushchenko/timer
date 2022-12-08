import React from "react";

export default Calendar2;

class Calendar2 extends React.Component {
	constructor() {
		super(this.props);
		this.state = {
			items: [],
			text: '',
		}

		this.hanldeChange = this.hanldeChange.bind(this);
	}

	render() { 
		return (
			<section id="calendar">
				<div className='calendar__scene'>
					<ul className="scene__month">
						<li className='carret prev'>
							<button onClick={() => {
								this.setMonth({
									nowMonth: this.state.monthName[nowDate.getMonth - 1]
								})
							}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
									<path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
								</svg>
							</button>
						</li>
						<li>
							<div className='month__text'>
								<span className='month--name'>{nowMonth}</span>
								<span className='year--name'>{nowYear}</span>
							</div>
						</li>
						<li className='carret next'>
							<button onClick={() => {
								console.log('next');
							}}>
								<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
									<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
								</svg>
							</button>
						</li>
					</ul>
					<ul className="scene__weekdays">
						<li>Mon</li>
						<li>Tue</li>
						<li>Wed</li>
						<li>Thr</li>
						<li>Fri</li>
						<li>Sat</li>
						<li>Sun</li>
					</ul>
				</div>
				<div className='bluredBg'></div>
			</section>
		)
	}

	// hanldeChange(e) {
	// 	this.setState({
	// 		text: 
	// 	})
	// }

}

class Dates extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map(item => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		)
	}
}