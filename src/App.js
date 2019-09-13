import React, { Component } from 'react';
// import logo from './logo.svg';
import profile_img from './resources/profile_img.jpg'
import './style/main.css';
import '../node_modules/react-vis/dist/style.css';
import SortableSymbolList from './components/SortableSymbolList';
import { FlexibleXYPlot, LineMarkSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Crosshair } from 'react-vis';

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
  '09:05',
  '09:10',
  '09:15',
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
  {x: 8, y: 2, color: '#5ED0D7', size: 7},
  {x: 9, y: 5, color: '#5ED0D7', size: 8}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [],
      order: stocks
    };
  }

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  _onMouseLeave = () => {
    this.setState({crosshairValues: []});
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  _onNearestX = (value, {index}) => {
    // console.log(value, index)
    this.setState({crosshairValues: [value]});
  };

  changeButtonOrder = (symbolName) => {
    let updateOrder = [...this.state.order];
    updateOrder.splice(updateOrder.indexOf(symbolName), 1)
    updateOrder.unshift(symbolName);
    this.setState({order: updateOrder});
  }

  render() {
    const { crosshairValues } = this.state;

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
                <FlexibleXYPlot
                  onMouseLeave={this._onMouseLeave}
                  margin={{left: 50, right: 20, top: 10, bottom: 30}}
                  colorType='literal'
                >
                  <XAxis tickTotal={data.length} tickFormat={v => datetimes[v]} />
                  <YAxis tickFormat={v => '$'+v.toFixed(2)} />
                  <VerticalGridLines style={{stroke: '#243039'}} />
                  <HorizontalGridLines style={{stroke: '#243039'}} />
                  <Crosshair
                    values={this.state.crosshairValues}
                    style={{line:{stroke: 'rgb(56, 68, 77)'}}}
                  >
                    <div className="crosshair-container">
                      <div>{crosshairValues.length > 0 ? datetimes[crosshairValues[0].x] : ''} AM</div>
                      <span>Price: {crosshairValues.length > 0 ? '$'+crosshairValues[0].y.toFixed(2) : ''}</span>
                    </div>
                  </Crosshair>
                  <LineMarkSeries
                    onNearestX={this._onNearestX}
                    animation
                    data={data}
                    sizeRange={[5,8]}
                  />

                </FlexibleXYPlot>
              </div>
              <div className="row stats-container">
                stats-container
              </div>
            </div>
            <div className="col-md-3 col-sm-4 right-outer-frame">
              <div className="twitter-feed-container">
                <div className="gradient-top"></div>
                <div className="feed-title">Twitter Feed</div>
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
              </div>

              <div className="news-feed-container">
                <div className="gradient-top"></div>
                <div className="feed-title">News Feed</div>
                <div className="gradient-bottom"></div>
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
              </div>
            </div>
          </div>
        </div>
              );
  }
}

export default App;
