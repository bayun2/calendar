import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';

class MonthCalendar extends React.Component {
  handleSwipe = idx => {
    this.props.handleSwipe(idx);
  }
  selectTime = (isCur, type, date) => {
    if (!isCur) return false;
    this.props.selectTime(type, Number(date));
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
                  className={`date ${item.type === 'cur' ? '' : 'notcur'}`}
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
                <div
                  className={`date
                   ${item.type === 'cur' ? '' : 'notcur'}
                    ${((`${selectedYear}/${selectedMonth}/${item.val}` === selectedTime) &&
                     (item.type === 'cur')) ?
                     'active' : ''}`}
                  key={idx}
                  onClick={this.selectTime.bind(this, item.type === 'cur', 'month', item.val)}
                >
                  <div>{item.val}</div>
                </div>
              ))
            }
          </div>
          <div className="panelWrap">
            {
              nextList.map((item, idx) => (
                <div
                  className={`date ${item.type === 'cur' ? '' : 'notcur'}`}
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

MonthCalendar.defaultProps = {

};

MonthCalendar.propTypes = {
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

export default MonthCalendar;
