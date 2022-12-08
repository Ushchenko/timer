import React, { useState } from 'react';
import '../styles/calendar.css';

export default Calendar;


function Calendar() {
	let nowDate = new Date(),
		monthName = ['январь', 'февраль', 'март', 'апрель', 'май',
			'июнь', 'июль', 'август', 'сентябрь',
			'октябрь', 'ноябрь', 'декабрь'
		];
		
	let [nowMonth, setMonth] = useState(nowDate.toLocaleString('en-us', { month: 'long' }));
	let [nowYear, setYear] = useState(nowDate.getFullYear());

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
				<ul className="days">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
					<li>5</li>
					<li>6</li>
					<li>7</li>
					<li>8</li>
					<li>9</li>
					<li>10</li>
					<li>11</li>
					<li>12</li>
					<li>13</li>
					<li>14</li>
					<li>15</li>
					<li>16</li>
					<li>17</li>
					<li>18</li>
					<li>19</li>
					<li>20</li>
					<li>21</li>
					<li>22</li>
					<li>23</li>
					<li>24</li>
					<li>25</li>
					<li>26</li>
					<li>27</li>
					<li>28</li>
					<li>29</li>
					<li>30</li>
				</ul>
			</div>
			<div className='bluredBg'></div>
		</section>
	)
}