import React, { Component } from 'react';
import moment from 'moment';

class NewsContainer extends Component {

  render () {
    const { origin, time, title, link } = this.props;

    const now = moment();
    const minDiff = now.diff(time, 'minutes');
    const timeValue = minDiff < 60 ? minDiff + 'm' : minDiff / 60 < 24 ? Math.round(minDiff / 60) + 'h' : moment(time).format('MMM DD');

    return (
      <div className="news-container">
        <div className="row news-header">
          <div className="col-sm-10 news-publisher-info">
            <span><b>{origin}</b></span><span className="span-user-handle"> {timeValue}</span><br/>
          </div>
        </div>
        <div className="news-body">
          <a style={{color: '#FEFEFE'}} href={link} target="_blank">{title}</a>
        </div>
        <div className="news-footer">
          Sentiment Score: +10
        </div>
      </div>
    );
  };
}

export default (NewsContainer);
