import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';
import calcTime from './helper/calcTime';

class WeekCalendar extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    this.today = `${year}/${month}/${date}`;
  }
  handleSwipe = idx => {
    const {curList, selectedYear, selectedMonth} = this.props;
    const lastDay = curList[curList.length-1].val;
    const calcedTimeObj = calcTime(curList[curList.length-1].type,
       selectedYear, selectedMonth);
    const year = calcedTimeObj.year;
    const month = calcedTimeObj.month;
    this.props.handleSwipe(idx, `${year}/${month}/${lastDay}`);
  }
  selectTimeFunc = (type, time) => {
    this.props.selectTimeFunc(type, time);
  }
  renderOtherItem = (item, idx) => {
    const {selectedTime} = this.props;
    const curTime = `${item.year}/${item.month}/${item.val}`;
    return (
      <div
        className={`date
          ${(curTime === selectedTime) ?
           'active' : ''}
           ${this.today === curTime ? 'today' : ''}`}
        key={idx}
      >
        <div>{item.val}</div>
      </div>
    );
  }
  renderCurItem = (item, idx) => {
    const {selectedYear, selectedMonth, selectedTime} = this.props;
    let year = selectedYear;
    let month = selectedMonth;
    const calcedTimeObj = calcTime(item.type, year, month);
    year = calcedTimeObj.year;
    month = calcedTimeObj.month;
    const curTime = `${year}/${month}/${item.val}`;
    return (
      <div
        className={`date
          ${(curTime === selectedTime) ?
           'active' : ''}
           ${this.today === curTime ? 'today' : ''}`}
        key={idx}
        onClick={this.selectTimeFunc.bind(this, 'week', curTime)}
      >
        <div>{item.val}</div>
      </div>
    );
  }
  render() {
    const {prevList, curList, nextList, defaultIdx, count} = this.props;
    return (
      <div className="swipeWraper">
        <ReactSwipe
          key={count}
          swipeOptions={{
            startSlide: defaultIdx,
            transitionEnd: this.handleSwipe,
            continuous: false
          }}
        >
          <div className="panelWrap">
            {
              prevList.map((item, idx) => (
                this.renderOtherItem(item, idx)
              ))
            }
          </div>
          <div className="panelWrap">
            {
              curList.map((item, idx) => (
                this.renderCurItem(item, idx)
              ))
            }
          </div>
          <div className="panelWrap">
            {
              nextList.map((item, idx) => (
                this.renderOtherItem(item, idx)
              ))
            }
          </div>
        </ReactSwipe>
      </div>
    );
  }
}

WeekCalendar.defaultProps = {

};

WeekCalendar.propTypes = {
  count: PropTypes.number,
  curDate: PropTypes.number,
  curList: PropTypes.array,
  curMonth: PropTypes.number,
  curYear: PropTypes.number,
  defaultIdx: PropTypes.number,
  handleSwipe: PropTypes.func,
  nextList: PropTypes.array,
  prevList: PropTypes.array,
  selectTimeFunc: PropTypes.func,
  selectedMonth: PropTypes.number,
  selectedTime: PropTypes.string,
  selectedYear: PropTypes.number,
};

export default WeekCalendar;
