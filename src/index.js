import styles from './index.less';
import React from 'react';
import MonthCalendar from './MonthCalendar';
import WeekCalendar from './WeekCalendar';

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
      weekIdx: 0,
      defaultIdx: 1,
      count: 0,
      calendarType: 'month'
    };

  }

  componentDidMount() {
    this.syncTime();
  }

  syncTime = (selectedYear, selectedMonth, selectedDate) => {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let curTime = `${year}${month}${date}`;
    if (selectedYear) {
      year = selectedYear;
      month = selectedMonth;
      date = selectedDate;
      curTime = this.state.selectedTime;
    }
    this.setState({
      selectedYear: year,
      selectedMonth: month,
      selectedDate: date,
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

  lastWeek = lastDay => {
    let {selectedYear, selectedMonth} = this.state;
    let date = lastDay - 7;
    if (lastDay-7 < 1) {
      selectedMonth--;
      if (selectedMonth < 0) {
        selectedYear--;
        selectedMonth = 11;
      }
      const days = this.getDays(selectedYear, selectedMonth);
      date = lastDay-7+days;
    }
    this.getWeekList('prev', selectedYear, selectedMonth, date, 6);
  }

  nextWeek = lastDay => {
    let {selectedYear, selectedMonth} = this.state;
    const days = this.getDays(selectedYear, selectedMonth);
    let date = lastDay + 7;
    if (lastDay + 7 > days) {
      selectedMonth++;
      if (selectedMonth > 11) {
        selectedYear++;
        selectedMonth = 1;
      }
      date = lastDay+7-days;
    }
    this.getWeekList('next', selectedYear, selectedMonth, date, 6);
  }

  syncWeek = (selectedYear, selectedMonth, selectedDate) => {
    const today = new Date(selectedYear, selectedMonth, selectedDate);
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    // 判断第一天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
    const dayOfWeek = today.getDay();
    const lastDay = this.getWeekList('cur', year, month, date, dayOfWeek);
    this.lastWeek(lastDay);
    this.nextWeek(lastDay);
  }

  getWeekList = (pos, year, month, date, dayOfWeek) => {
    // 获取当前月的天数
    const curDays = this.getDays(year, month);
    const weekList = [];
    let lastDays;
    // 获取前一个月的天数
    if (month === 0) {
      lastDays = this.getDays(year-1, 11);
    } else {
      lastDays = this.getDays(year, month-1);
    }
    let posDay;
    for (let i=0; i< 7; i++) { // 包含指定时间的区间段（周日到周六）
      const diff = i-dayOfWeek;
      if (diff < 0) { // 指定日期非周日，补全周日到指定日期的时间
        if (date+diff < 1) {
          posDay = lastDays+date+diff;
        } else {
          posDay = date+diff;
        }
      } else { // 指定日期之后的时间自动增加
        if (date+diff > curDays) {
          posDay = date+diff-curDays;
        } else {
          posDay = date+diff;
        }
      }
      weekList.push(posDay);
    }
    this.setState({
      [`${pos}List`]: weekList
    });
    return posDay;
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

  handleSwipeMonth = idx => {
    const {selectedDate} = this.state;
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
    this.syncTime(selectedYear, selectedMonth, selectedDate);
    this.setState({
      count: count+1
    });
  }

  handleSwipeWeek = (idx, lastDay) => {
    let {selectedYear, selectedMonth} = this.state;
    const {defaultIdx, count} = this.state;
    let date;
    if (idx < defaultIdx) {
      date = lastDay - 7;
      if (lastDay-7 < 1) {
        selectedMonth--;
        if (selectedMonth < 0) {
          selectedYear--;
          selectedMonth = 11;
        }
        const days = this.getDays(selectedYear, selectedMonth);
        date = lastDay-7+days;
      }
    } else if (idx > defaultIdx) {
      const days = this.getDays(selectedYear, selectedMonth);
      date = lastDay + 7;
      if (lastDay + 7 > days) {
        selectedMonth++;
        if (selectedMonth > 11) {
          selectedYear++;
          selectedMonth = 1;
        }
        date = lastDay+7-days;
      }
    }
    this.syncWeek(selectedYear, selectedMonth, date, 6);
    this.setState({
      selectedYear,
      selectedMonth,
      count: count+1
    });
  }

  handleSwipe = (idx, lastDay) => {
    const {calendarType} = this.state;
    if (calendarType === 'month') {
      this.handleSwipeMonth(idx);
    } else {
      this.handleSwipeWeek(idx, lastDay);
    }
  }

  selectTime = date => {
    const {selectedYear, selectedMonth} = this.state;
    this.setState({
      selectedDate: date,
      selectedTime: `${selectedYear}${selectedMonth}${date}`
    });
  }
  switch = () => {
    const {selectedYear, selectedMonth, selectedDate} = this.state;
    let {calendarType} = this.state;
    if (calendarType === 'month') {
      calendarType = 'week';
      this.setState({
        calendarType,
      });
      this.syncWeek(selectedYear, selectedMonth, selectedDate);
    } else {
      calendarType = 'month';
      this.setState({
        calendarType
      });
      this.syncTime(selectedYear, selectedMonth);
    }
  }
  render() {
    const {selectedYear, selectedMonth, calendarType} = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.title}>{selectedYear}年{selectedMonth+1}月
          <div className={styles.switch} onClick={this.switch}></div>
        </div>
        <div className="weekday">
          <div className="date">日</div>
          <div className="date">一</div>
          <div className="date">二</div>
          <div className="date">三</div>
          <div className="date">四</div>
          <div className="date">五</div>
          <div className="date">六</div>
        </div>
        {
          calendarType === 'month' ? (
            <MonthCalendar
              handleSwipe={this.handleSwipe}
              selectTime={this.selectTime}
              {...this.state}
            />
          ) : (
            <WeekCalendar
              handleSwipe={this.handleSwipe}
              selectTime={this.selectTime}
              {...this.state}
            />
          )
        }
      </div>
    );
  }
}

Calendar.defaultProps = {

};

Calendar.propTypes = {

};

export default Calendar;
