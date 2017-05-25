import styles from './index.less';
import React from 'react';
import cssModules from 'react-css-modules';
import PropTypes from 'prop-types';

class Cnt extends React.Component {
  render() {
    return (
      <div>
        <div styleName="title">{this.props.title}</div>
        <div styleName="content">{this.props.content}</div>
      </div>
    );
  }
}

Cnt.defaultProps = {
  title: '我是标题',
  content: '我是内容'
};

Cnt.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string
};

export default cssModules(Cnt, styles);
