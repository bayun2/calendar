import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';

class WeekCalendar extends React.Component {
  calcTime = (type, year, month) => {
    let realYear = year;
    let realMonth = month;
    if (type === 'prev') {
      if (month === 0) {
        realMonth = 11;
        realYear--;
      } else {
        realMonth--;
      }
    } else if (type === 'next') {
      if (month === 11) {
        realMonth = 1;
        realYear++;
      } else {
        realMonth++;
      }
    }
    return {
      year: realYear,
      month: realMonth
    };
  }
  handleSwipe = idx => {
    const {curList, selectedYear, selectedMonth} = this.props;
    const lastDay = curList[curList.length-1].val;
    const calcedTimeObj = this.calcTime(curList[curList.length-1].type,
       selectedYear, selectedMonth);
    const year = calcedTimeObj.year;
    const month = calcedTimeObj.month;
    this.props.handleSwipe(idx, `${year}/${month}/${lastDay}`);
  }
  selectTimeFunc = (type, time) => {
    this.props.selectTimeFunc(type, time);
  }
  renderCurItem = (item, idx) => {
    const {selectedYear, selectedMonth, selectedTime} = this.props;
    let year = selectedYear;
    let month = selectedMonth;
    const calcedTimeObj = this.calcTime(item.type, year, month);
    year = calcedTimeObj.year;
    month = calcedTimeObj.month;
    const curTime = `${year}/${month}/${item.val}`;
    return (
      <div
        className={`date
          ${(curTime === selectedTime) ?
           'active' : ''}`}
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
                <div
                  className="date"
                  key={idx}
                >
                  <div>{item.val}</div>
                </div>
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
                <div
                  className="date"
                  key={idx}
                >
                  <div>{item.val}</div>
                </div>
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
