import React, { Component } from 'react';
import moment from 'moment';

class TweetContainer extends Component {

  render () {
    const { userName, userHandle, profilePic, time, text, link } = this.props;

    const now = moment();
    const minDiff = now.diff(time, 'minutes');
    const timeValue = minDiff < 60 ? minDiff + 'm' : minDiff / 60 < 24 ? Math.round(minDiff / 60) + 'h' : moment(time).format('MMM DD');

    return (
      <div className="tweet-container">
        <div className="row tweet-header">
          <div className="col-sm-2 tweet-image-container">
            <a href={'https://twitter.com/' + userHandle} target="_blank"><img src={profilePic} className="tweet-profile-img" alt="twitter-user"/></a>
          </div>
          <div className="col-sm-10 tweet-user-info">
            <span><a style={{color: '#FEFEFE'}} href={'https://twitter.com/' + userHandle} target="_blank"><b>{userName}</b></a></span>
            <br/>
            <span className="span-user-handle"><a style={{color: '#BBBBBB'}} href={'https://twitter.com/' + userHandle} target="_blank">@{userHandle}</a> · {timeValue}</span><br/>
          </div>
        </div>
        <div className="tweet-body">
          <a style={{color: '#FEFEFE'}} href={'https://twitter.com/anyUser/status/' + link} target="_blank">{text}</a>
        </div>
        <div className="tweet-footer">
          Sentiment Score: +10
        </div>
      </div>
    );
  };
}

export default (TweetContainer);
