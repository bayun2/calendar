import styles from './index.less';
import React from 'react';
import cssModules from 'react-css-modules';
import Cnt from './cnt.js';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: 2017,
      month: 4,
      date: 25
    };

    this.handleClick = this.handleClick.bind(this);
    this.getDateList();
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

  getDateList = () => {
    const {year, month, date} = this.state;
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
          // list.push({type:'prev', val});
        } else if (val > curDays) { // 下个月日期补足最后不满一周部分
          val = val - curDays;
          // list.push({type:'next', val});
        }
        // list.push({type:'cur', val});
        list.push(val);
      }
    }
    console.log(list);
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }
  render() {
    return (
      <div onClick={this.handleClick} styleName="fdt-react-demo">
        <span>展开</span>
        {this.state.show ? <Cnt /> : null}
      </div>
    );
  }
}

Component.defaultProps = {

};

Component.propTypes = {

};

export default cssModules(Component, styles);
