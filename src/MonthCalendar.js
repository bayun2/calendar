import React from 'react';
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types';
import calcTime from './helper/calcTime';

class MonthCalendar extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    this.today = `${year}/${month}/${date}`;
  }
  handleSwipe = idx => {
    this.props.handleSwipe(idx);
  }
  selectTimeFunc = (isCur, type, time) => {
    if (!isCur) return false;
    this.props.selectTimeFunc(type, time);
  }
  renderOtherItem = (type, item, idx) => {
    const {selectedTime} = this.props;
    const curTime = `${item.year}/${item.month}/${item.val}`;
    return (
      <div
        className={`date
         ${item.type === 'cur' ? '' : 'notcur'}
          ${(curTime === selectedTime) ?
           'active' : ''} ${this.today === curTime ? 'today' : ''}`}
        key={idx}
      >
        <div>{item.val}</div>
      </div>
    );
  }
  renderCurItem = (item, idx) => {
    const {selectedYear, selectedMonth, selectedTime} = this.props;
    const calcedTimeObj = calcTime(item.type, selectedYear, selectedMonth);
    const curTime = `${calcedTimeObj.year}/${calcedTimeObj.month}/${item.val}`;
    return (
      <div
        className={`date
         ${item.type === 'cur' ? '' : 'notcur'}
          ${(curTime === selectedTime) ?
           'active' : ''} ${this.today === curTime ? 'today' : ''}`}
        key={idx}
        onClick={this.selectTimeFunc.bind(this, item.type === 'cur', 'month',
        `${selectedYear}/${selectedMonth}/${item.val}`)}
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
                this.renderOtherItem('prev', item, idx)
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
                this.renderOtherItem('next', item, idx)
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
  selectTimeFunc: PropTypes.func,
  selectedMonth: PropTypes.number,
  selectedTime: PropTypes.string,
  selectedYear: PropTypes.number,
};

export default MonthCalendar;
