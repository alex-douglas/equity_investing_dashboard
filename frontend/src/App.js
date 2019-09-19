import React, { Component } from 'react';
// import profile_img from './resources/profile_img.jpg'
import './style/main.css';
import '../node_modules/react-vis/dist/style.css';
import SortableSymbolList from './components/SortableSymbolList';
import GraphPlot from './components/GraphPlot';
import NewsContainer from './components/NewsContainer';
import TweetContainer from './components/TweetContainer';
import axios from 'axios';

const stocks = [
  'MSFT',
  'TSLA',
  'UBER',
  'FB',
  'AAPL',
  'AMD',
  'SNAP',
  'TWTR',
  'NVDA',
  'SQ'
]

const datetimes = [
  '08:30',
  '08:35',
  '08:40',
  '08:45',
  '08:50',
  '08:55',
  '09:00',
  '+5 Min',
  '+1 Hour',
  '+1 Day',
]

const data = [
  {x: 0, y: 8, color: '#21939A', size: 5},
  {x: 1, y: 6, color: '#21939A', size: 5},
  {x: 2, y: 4, color: '#21939A', size: 5},
  {x: 3, y: 7, color: '#21939A', size: 5},
  {x: 4, y: 3, color: '#21939A', size: 5},
  {x: 5, y: 7, color: '#21939A', size: 5},
  {x: 6, y: 6, color: '#21939A', size: 5},
  {x: 7, y: 3, color: '#5ED0D7', size: 6},
  {x: 9, y: 3.5, color: '#5ED0D7', size: 7},
  {x: 10, y: 5, color: '#5ED0D7', size: 8}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: stocks,
      newsArticles: [],
      tweets: []
    };
  }

  componentDidMount() {
    this.getData(this.state.order[0]);
  }

  getData = (symbol) => {
    axios.get(`http://localhost:4000/?symbol=${symbol}`)
      .then(res => {
        let { newsData, twtrData } = res.data;
        // console.log(res);
        newsData.sort((a, b) => (a.published_at < b.published_at) ? 1 : -1)
        twtrData.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1)
        this.setState({
          newsArticles: newsData,
          tweets: twtrData
        });
        // dispatch(setBuildingsStore(data));
      })
      .catch(err => {
        // dispatch({
        //   type: REQUEST_ACTIVE_BUILDINGS_FAILED
        // });
        console.log(err);
      });
  }

  changeButtonOrder = (symbolName) => {
    this.getData(symbolName);
    let updateOrder = [...this.state.order];
    updateOrder.splice(updateOrder.indexOf(symbolName), 1)
    updateOrder.unshift(symbolName);
    this.setState({order: updateOrder});
  }

  render() {
    console.log(this.state.tweets);
    const newsArticles = this.state.newsArticles.map(article => (
      <NewsContainer origin={article.source} time={article.published_at} title={article.title} key={article.uuid} link={article.url} />
    ));
    const tweets = this.state.tweets.map(tweet => (
      <TweetContainer
        userName={tweet.user_info.name}
        userHandle={tweet.user_info.screen_name}
        profilePic={tweet.user_info.profile_image_url_https}
        time={tweet.created_at}
        text={tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
        key={tweet.id_str}
        link={tweet.id_str} />
    ));

    return (
        <div className="outer-container h-100">
          <div className="row h-100 inner-container">
            <div className="col-md-9 col-sm-8 left-outer-frame">
              <div className="row toggle-and-symbol-list-container">
                <div className="toggle-button-container">
                  <button className="toggle-button" type="button">Strategy<br/>Analysis</button>
                </div>
                <div className="symbol-list-container">
                  <SortableSymbolList
                    stockList={stocks}
                    order={this.state.order}
                    updateOrder={this.changeButtonOrder}
                  />
                </div>
              </div>
              <div className="row graph-container">
                <GraphPlot
                  data={data}
                  dateTimes={datetimes}
                />
              </div>
              <div className="row stats-container">
                stats-container
              </div>
            </div>
            <div className="col-md-3 col-sm-4 right-outer-frame">
              <div className="twitter-feed-container">
                <div className="gradient-top"></div>
                <div className="feed-title">&nbsp;&nbsp;Twitter Feed&nbsp;
                  <span className="question-mark-hover"><svg className="help-icon"><path></path></svg>
                    <span className="tooltip-text">I continuously monitor Twitter for keywords related to each company, and pull down any relevant tweets that come up.<br/><br/>I then pass these tweets through an NLP sentitment algorithm to get a sentiment score, which is combined with the total number of tweets over a given time frame to help gauge popularity and potential price volatility. These features are integrated into the time series model.</span>
                  </span>
                </div>
                {tweets}
                {/* <div className="tweet-container">
                  <div className="row tweet-header">
                    <div className="col-sm-2 tweet-image-container"><img src={profile_img} className="tweet-profile-img" alt="twitter-user"/></div>
                    <div className="col-sm-10 tweet-user-info">
                  <span><b>Alex Douglas</b></span><br/><span className="span-user-handle">@ar_douglas · 59m</span><br/>
                    </div>
                  </div>
                  <div className="tweet-body">
                    3 government problems that #DesignThinking can solve when used as part of a larger ecosystem of Experience Design Strategies: https://dy.si/9DRZ4 by @BoozAllen
                  </div>
                  <div className="tweet-footer">
                    Sentiment Score: +10
                  </div>
                  </div>
                  <div className="tweet-container">
                  <div className="row tweet-header">
                    <div className="col-sm-2 tweet-image-container"><img src={profile_img} className="tweet-profile-img" alt="twitter-user"/></div>
                    <div className="col-sm-10 tweet-user-info">
                  <span><b>Alex Douglas</b></span><br/><span className="span-user-handle">@ar_douglas · 59m</span><br/>
                    </div>
                  </div>
                  <div className="tweet-body">
                    3 government problems that #DesignThinking can solve when used as part of a larger ecosystem of Experience Design Strategies: https://dy.si/9DRZ4 by @BoozAllen
                  </div>
                  <div className="tweet-footer">
                    Sentiment Score: +10
                  </div>
                  </div>
                  <div className="tweet-container">
                  <div className="row tweet-header">
                    <div className="col-sm-2 tweet-image-container"><img src={profile_img} className="tweet-profile-img" alt="twitter-user"/></div>
                    <div className="col-sm-10 tweet-user-info">
                  <span><b>Alex Douglas</b></span><br/><span className="span-user-handle">@ar_douglas · 59m</span><br/>
                    </div>
                  </div>
                  <div className="tweet-body">
                    3 government problems that #DesignThinking can solve when used as part of a larger ecosystem of Experience Design Strategies: https://dy.si/9DRZ4 by @BoozAllen
                  </div>
                  <div className="tweet-footer">
                    Sentiment Score: +10
                  </div>
                  </div>
                  <div className="tweet-container">
                  <div className="row tweet-header">
                    <div className="col-sm-2 tweet-image-container"><img src={profile_img} className="tweet-profile-img" alt="twitter-user"/></div>
                    <div className="col-sm-10 tweet-user-info">
                  <span><b>Alex Douglas</b></span><br/><span className="span-user-handle">@ar_douglas · 59m</span><br/>
                    </div>
                  </div>
                  <div className="tweet-body">
                    3 government problems that #DesignThinking can solve when used as part of a larger ecosystem of Experience Design Strategies: https://dy.si/9DRZ4 by @BoozAllen
                  </div>
                  <div className="tweet-footer">
                    Sentiment Score: +10
                  </div>
                </div> */}
              </div>

              <div className="news-feed-container">
                <div className="gradient-top"></div>
                <div className="feed-title">&nbsp;&nbsp;News Feed&nbsp;
                  <span className="question-mark-hover"><svg className="help-icon"><path></path></svg>
                    <span className="tooltip-text">Robinhood's news feed is continuously monitored for new content. When a new article is published, I pass the headline text through an NLP sentiment algorithm to get a gauge on the positivity or negativity of the headline.<br/><br/>This, combined with the total number of articles written over a certain period, is integrated into the time series forecasting model.</span>
                  </span>
                </div>
                <div className="gradient-bottom"></div>
                {newsArticles}
                {/* <div className="news-container">
                  <div className="row news-header">
                    <div className="col-sm-10 news-publisher-info">
                  <span><b>Bloomberg</b></span><span className="span-user-handle"> 59m</span><br/>
                    </div>
                  </div>
                  <div className="news-body">
                    3 government problems that solve when used as part of a larger ecosystem of Experience Design Strategies
                  </div>
                  <div className="news-footer">
                    Sentiment Score: +10
                  </div>
                  </div>
                  <div className="news-container">
                  <div className="row news-header">
                    <div className="col-sm-10 news-publisher-info">
                  <span><b>Bloomberg</b></span><span className="span-user-handle"> 59m</span><br/>
                    </div>
                  </div>
                  <div className="news-body">
                    3 government problems that solve when used as part of a larger ecosystem of Experience Design Strategies
                  </div>
                  <div className="news-footer">
                    Sentiment Score: +10
                  </div>
                  </div>
                  <div className="news-container">
                  <div className="row news-header">
                    <div className="col-sm-10 news-publisher-info">
                  <span><b>Bloomberg</b></span><span className="span-user-handle"> 59m</span><br/>
                    </div>
                  </div>
                  <div className="news-body">
                    3 government problems that solve when used as part of a larger ecosystem of Experience Design Strategies
                  </div>
                  <div className="news-footer">
                    Sentiment Score: +10
                  </div>
                  </div>
                  <div className="news-container">
                  <div className="row news-header">
                    <div className="col-sm-10 news-publisher-info">
                  <span><b>Bloomberg</b></span><span className="span-user-handle"> 59m</span><br/>
                    </div>
                  </div>
                  <div className="news-body">
                    3 government problems that solve when used as part of a larger ecosystem of Experience Design Strategies
                  </div>
                  <div className="news-footer">
                    Sentiment Score: +10
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
              );
  }
}

export default App;
