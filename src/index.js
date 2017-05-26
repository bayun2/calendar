import styles from './index.less';
import React from 'react';
import MonthCalendar from './MonthCalendar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedYear: 2017,
      selectedMonth: 4,
      selectedTime: '2017425',
      prevList: [],
      curList: [],
      nextList: [],
      defaultIdx: 1,
      count: 0
    };

  }

  componentDidMount() {
    this.syncTime();
  }

  syncTime = (selectedYear, selectedMonth) => {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    const date = today.getDate();
    let curTime = `${year}${month}${date}`;
    if (selectedYear) {
      year = selectedYear;
      month = selectedMonth;
      curTime = this.state.selectedTime;
    }
    this.setState({
      selectedYear: year,
      selectedMonth: month,
      selectedTime: curTime
    }, () => {
      this.getDateList('cur', year, month);
      if (month === 0) {
        this.getDateList('prev', year-1, 11);
      } else {
        this.getDateList('prev', year, month-1);
      }
      if (month === 11) {
        this.getDateList('next', year+1, 0);
      } else {
        this.getDateList('next', year, month+1);
      }
    });
  }

  isLeap = year => {
    if (year % 4 === 0 && year % 100 !== 0) {
      return 1;
    } else if (year % 400 === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  getDays = (year, month) => {
    const daysPerMonth = [31, 28+this.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[month];
  }

  getDateList = (pos, year, month) => {
    // 获取当月的第一天
    const firstDay = new Date(year, month, 1);
    // 判断第一天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
    const dayOfWeek = firstDay.getDay();
    const curDays = this.getDays(year, month);
    const prevDays = month === 0 ? this.getDays(year-1, 11) : this.getDays(year, month-1);
    // 计算会有几行
    const colNums = Math.ceil((dayOfWeek + curDays)/7);
    const list = [];
    for(let i=0; i<colNums; i++) {
      for(let k=0; k<7; k++) {
        const idx = 7 * i +k;
        let val = idx - dayOfWeek + 1;
        if (val <= 0) { // 上个月日期补足一开始不满一周部分
          val = prevDays + val;
          list.push({type:'prev', val});
        } else if (val > curDays) { // 下个月日期补足最后不满一周部分
          val = val - curDays;
          list.push({type:'next', val});
        } else {
          list.push({type:'cur', val});
        }
      }
    }
    this.setState({
      [`${pos}List`]: list
    });
  }

  handleSwipe = idx => {
    let {selectedYear, selectedMonth} = this.state;
    const {defaultIdx, count} = this.state;
    if (idx < defaultIdx) {
      if (selectedMonth === 0) {
        selectedYear = selectedYear - 1;
        selectedMonth= 11;
      } else {
        selectedMonth = selectedMonth - 1;
      }
    } else if (idx > defaultIdx) {
      if (selectedMonth === 11) {
        selectedYear = selectedYear + 1;
        selectedMonth = 0;
      } else {
        selectedMonth = selectedMonth + 1;
      }
    }
    this.syncTime(selectedYear, selectedMonth);
    this.setState({
      count: count+1
    });
  }

  selectTime = selectedTime => {
    this.setState({
      selectedTime
    });
  }
  render() {
    const {selectedYear, selectedMonth} = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.title}>{selectedYear}年{selectedMonth+1}月
          <div className={styles.switch}></div></div>
        <div className="weekday">
          <div className="date">日</div>
          <div className="date">一</div>
          <div className="date">二</div>
          <div className="date">三</div>
          <div className="date">四</div>
          <div className="date">五</div>
          <div className="date">六</div>
        </div>
        <MonthCalendar
          handleSwipe={this.handleSwipe}
          selectTime={this.selectTime}
          {...this.state}
        />
      </div>
    );
  }
}

Calendar.defaultProps = {

};

Calendar.propTypes = {

};

export default Calendar;
