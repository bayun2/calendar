import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';

class WeekCalendar extends React.Component {
  handleSwipe = idx => {
    const {curList} = this.props;
    const lastDay = curList[curList.length-1].val;
    this.props.handleSwipe(idx, lastDay);
  }
  selectTime = (type, date, direction) => {
    this.props.selectTime(type, Number(date), direction);
  }
  renderCurItem = (item, idx) => {
    const {selectedYear, selectedMonth, selectedTime} = this.props;
    let year = selectedYear;
    let month = selectedMonth;
    if (item.type === 'prev') {
      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }
    } else if (item.type === 'next') {
      if (month === 11) {
        month = 1;
        year++;
      } else {
        month++;
      }
    }
    const curTime = `${year}/${month}/${item.val}`;
    return (
      <div
        className={`date
          ${(curTime === selectedTime) ?
           'active' : ''}`}
        key={idx}
        onClick={this.selectTime.bind(this, 'week', item.val, item.type)}
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
  selectTime: PropTypes.func,
  selectedMonth: PropTypes.number,
  selectedTime: PropTypes.string,
  selectedYear: PropTypes.number,
};

export default WeekCalendar;
