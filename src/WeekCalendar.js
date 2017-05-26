import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';

class WeekCalendar extends React.Component {
  handleSwipe = idx => {
    const {curList} = this.props;
    const lastDay = curList[curList.length-1];
    this.props.handleSwipe(idx, lastDay);
  }
  selectTime = time => {
    this.props.selectTime(time);
  }
  render() {
    const {prevList, curList, nextList,
      selectedYear, selectedMonth, selectedTime, defaultIdx, count} = this.props;
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
                  <div>{item}</div>
                </div>
              ))
            }
          </div>
          <div className="panelWrap">
            {
              curList.map((item, idx) => (
                <div
                  className={`date
                    ${(`${selectedYear}${selectedMonth}${item}` === selectedTime) ?
                     'active' : ''}`}
                  key={idx}
                  onClick={this.selectTime.bind(this, `${selectedYear}${selectedMonth}${item}`)}
                >
                  <div>{item}</div>
                </div>
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
                  <div>{item}</div>
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
