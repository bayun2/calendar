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
      selectedTime: '2017/4/25',
      switchTime: '2017/4/25',
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
    let curTime = `${year}/${month}/${date}`;
    let switchTime = `${year}/${month}/${date}`;
    if (selectedYear) {
      year = selectedYear;
      month = selectedMonth;
      date = selectedDate;
      switchTime = this.state.switchTime;
      curTime = this.state.selectedTime;
    }
    this.setState({
      selectedYear: year,
      selectedMonth: month,
      selectedDate: date,
      selectedTime: curTime,
      switchTime,
      count: this.state.count+1
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
    const weekList = this.getWeekList(selectedYear, selectedMonth, date);
    this.setState({
      prevList: weekList
    });
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
    const weekList = this.getWeekList(selectedYear, selectedMonth, date);
    this.setState({
      nextList: weekList
    });
  }

  syncWeek = (selectedYear, selectedMonth, selectedDate) => {
    this.setState({
      selectedYear,
      selectedMonth,
      selectedDate,
      calendarType: 'week',
      count: this.state.count+1
    }, () => {
      const weekList = this.getWeekList(selectedYear, selectedMonth, selectedDate);
      this.setState({
        curList: weekList
      });
      const lastDay = weekList[weekList.length-1].val;
      this.lastWeek(lastDay);
      this.nextWeek(lastDay);
    });
  }

  getWeekList = (year, month, date) => {
    const today = new Date(year, month, date);
    // 判断第一天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一，以此类推)
    const dayOfWeek = today.getDay();
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
          weekList.push({type:'prev', val: posDay});
        } else {
          posDay = date+diff;
          weekList.push({type:'cur', val: posDay});
        }
      } else { // 指定日期之后的时间自动增加
        if (date+diff > curDays) {
          posDay = date+diff-curDays;
          weekList.push({type:'next', val: posDay});
        } else {
          posDay = date+diff;
          weekList.push({type:'cur', val: posDay});
        }
      }
    }
    return weekList;
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
    let {selectedYear, selectedMonth} = this.state;
    const {defaultIdx, count, switchTime} = this.state;
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
    const switchTimeArr = switchTime.split('/');
    if (selectedYear === Number(switchTimeArr[0]) &&
     selectedMonth === Number(switchTimeArr[1])) {
      // 切换到新的月历后，没有切换成周历，直接切回前一次的月历，则依旧可以读取原先切过的周历记录
      this.syncTime(selectedYear, selectedMonth, Number(switchTimeArr[2]));
    } else {
      this.syncTime(selectedYear, selectedMonth, 1);
    }
    this.setState({
      count: count+1
    });
  }

  handleSwipeWeek = (idx, lastDay) => {
    const {switchTime, selectedTime} = this.state;
    let {selectedYear, selectedMonth} = this.state;
    const {defaultIdx} = this.state;
    const switchTimeArr = switchTime.split('/');
    let date;
    if (idx === defaultIdx) return false;
    if (idx < defaultIdx) {
      date = lastDay - 7;
      // 或者从月历切换到周历时，如果当前选择时间是月与月的交汇处，
      // 通过判断[选择|切换]日期是否大于当前周六（一组最后一位）日期，来判断月份是否要减少
      if (switchTimeArr[2] > lastDay) {
        const days = this.getDays(selectedYear, selectedMonth);
        date = lastDay-7+days;
      } else if (lastDay-7 < 1) { // 连续右滑判断是否进入上个月
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
      // 或者从月历切换到周历时，如果当前选择时间是月与月的交汇处，
      // 通过判断[选择|切换]日期是否大于当前周六（一组最后一位）日期，来判断月份是否要增加
      if (switchTimeArr[2] > lastDay) {
        selectedMonth++;
        if (selectedMonth > 11) {
          selectedYear++;
          selectedMonth = 1;
        }
      } else if (lastDay + 7 > days) { // 连续右滑判断是否进入下个月
        selectedMonth++;
        if (selectedMonth > 11) {
          selectedYear++;
          selectedMonth = 1;
        }
        date = lastDay+7-days;
      }
    }
    const isInRangeObj = this.isInRange(selectedYear, selectedMonth, date);
    if (isInRangeObj) {
      selectedYear = isInRangeObj.selectedYear;
      selectedMonth = isInRangeObj.selectedMonth;
      date = isInRangeObj.date;
    }
    this.setState({
      switchTime: `${selectedYear}/${selectedMonth}/${date}`
    }, () => {
      this.syncWeek(selectedYear, selectedMonth, date);
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

  selectTime = (type, date, direction) => {
    let {selectedYear, selectedMonth} = this.state;
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        selectedMonth = 11;
        selectedYear--;
      } else {
        selectedMonth--;
      }
    } else if (direction === 'next') {
      if (selectedMonth === 11) {
        selectedMonth = 1;
        selectedYear++;
      } else {
        selectedMonth++;
      }
    }
    this.setState({
      selectedTime: `${selectedYear}/${selectedMonth}/${date}`,
      switchTime: `${selectedYear}/${selectedMonth}/${date}`
    }, () => {
      if (type === 'month') {
        this.syncTime(selectedYear, selectedMonth, date);
      } else {
        this.syncWeek(selectedYear, selectedMonth, date);
      }
    });
  }
  isInRange = (year, month, date) => {
    // 判断指定时间对应的周内是否有选中时间
    const {selectedTime} = this.state;
    const weekList = this.getWeekList(year, month, date);
    const lastItem = weekList[weekList.length-1];
    const lastDay = lastItem.val;
    const lastType = lastItem.type;
    let lastDayOfYear = year;
    let lastDayOfMonth = month;
    if (lastType === 'prev') {
      if (lastDayOfMonth === 0) {
        lastDayOfMonth = 11;
        lastDayOfYear--;
      } else {
        lastDayOfMonth--;
      }
    } else if (lastType === 'next') {
      if (lastDayOfMonth === 11) {
        lastDayOfMonth = 1;
        lastDayOfYear++;
      } else {
        lastDayOfMonth++;
      }
    }
    const selectedTimeArr = selectedTime.split('/');
    const SelectedTimeStamp =
    (new Date(selectedTimeArr[0], selectedTimeArr[1], selectedTimeArr[2])).getTime();
    const curLastTimeStamp = (new Date(lastDayOfYear, lastDayOfMonth, lastDay)).getTime();
    const diff = curLastTimeStamp-SelectedTimeStamp;
    if (diff <= 518400000 && diff > 0) { // 时间戳之差小于6天（6*24*60*60*100）
      const selectedYear = Number(selectedTimeArr[0]);
      const selectedMonth = Number(selectedTimeArr[1]);
      const date = Number(selectedTimeArr[2]);
      return {
        selectedYear,
        selectedMonth,
        date
      };
    } else {
      return false;
    }
  }

  switch = () => {
    const {selectedYear, selectedMonth,
      switchTime, calendarType, selectedTime} = this.state;
    let {selectedDate} = this.state;
    if (calendarType === 'month') {
      const switchTimeArr = switchTime.split('/');
      const selectedTimeArr = selectedTime.split('/');
      // 如果进入当前月历，且没有被周历在月内切换过
      if (Number(switchTimeArr[0]) !== selectedYear || Number(switchTimeArr[1]) !== selectedMonth) {
        if (Number(selectedTimeArr[0]) === selectedYear &&
        Number(selectedTimeArr[1]) === selectedMonth) {
          // 如果该月历内刚好有选中时间
          selectedDate = Number(selectedTimeArr[2]);
        } else {
          selectedDate = 1;
        }
      }
      const isInRangeObj = this.isInRange(selectedYear, selectedMonth, selectedDate);
      if (isInRangeObj) {
        this.syncWeek(isInRangeObj.selectedYear, isInRangeObj.selectedMonth, isInRangeObj.date);
      } else {
        this.syncWeek(selectedYear, selectedMonth, selectedDate);
      }
    } else {
      this.setState({
        calendarType: 'month'
      });
      this.syncTime(selectedYear, selectedMonth, selectedDate);
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
