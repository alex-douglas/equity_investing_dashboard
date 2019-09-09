import React, { Component } from 'react';
// import logo from './logo.svg';
import profile_img from './resources/profile_img.jpg'
import './style/main.css';
import '../node_modules/react-vis/dist/style.css';
import { SortablePane, Pane } from 'react-sortable-pane';
import { FlexibleXYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Crosshair } from 'react-vis';

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
  {x: 0, y: 8},
  {x: 1, y: 6},
  {x: 2, y: 4},
  {x: 3, y: 7},
  {x: 4, y: 3},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 5}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [],
      symbols: [
        {name: 'MSFT', position: 0},
        {name: 'TSLA', position: 1},
        {name: 'UBER', position: 2},
        {name: 'FB',   position: 3},
        {name: 'AAPL', position: 4},
        {name: 'AMD',  position: 5},
        {name: 'SNAP', position: 6},
        {name: 'TWTR', position: 7},
        {name: 'NVDA', position: 8},
        {name: 'SQ',   position: 9},
      ],
      order: stocks,
      panes: { '0': { height: '100%', width: 120 }, '1': { height: '100%', width: 120 }, '2': { height: '100%', width: 120 } }
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

  adjustButtonOrder = (symbolName) => {
    const prevPosition = this.state.symbols.filter(symbol => symbol.name === symbolName)[0].position;
    const updatedOrdering = this.state.symbols.map(symbol => {
      return (
        {
          name: symbol.name,
          position: symbol.position === 0 ? prevPosition : symbol.name === symbolName ? 0 : symbol.position
        }
      )
    });
    this.setState({symbols: updatedOrdering});
  }

  changeButtonOrder = (symbolName) => {
    let updateOrder = [...this.state.order];
    updateOrder.splice(updateOrder.indexOf(symbolName), 1)
    updateOrder.unshift(symbolName);
    // this.state.order.splice(this.state.order.indexOf(symbolName), 1);
    // this.state.order.unshift(symbolName);
    // console.log(this.state.order);
    // console.log(updateOrder);
    this.setState({order: updateOrder});
  }

  render() {
    // console.log(this.state.crosshairValues);
    const { crosshairValues } = this.state;
    const panes = stocks.map(symbol => (
      <Pane
        className="symbol-button"
        key={symbol}
        size={{ height: '100%', width: 120 }}
        resizable={{ x: false, y: false, xy: false }}
        onClick={() => this.changeButtonOrder(symbol)}
      >
        {symbol}
      </Pane>
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
                  <SortablePane
                    direction="horizontal"
                    margin={5}
                    isSortable={false}
                    order={this.state.order}
                    // onOrderChange={order => {
                    //   this.setState({ order });
                    // }}
                    // onResizeStop={(e, key, dir, ref, d) => {
                    //   this.setState({
                    //     panes: { ...this.state.panes },
                    //   });
                    // }}
                  >
                    {panes}
                  </SortablePane>
                  {/* <button className="symbol-button" type="button">MSFT</button>
                    <button className="symbol-button" type="button">TSLA</button>
                    <button className="symbol-button" type="button">FB</button>
                    <button className="symbol-button" type="button">UBER</button>
                    <button className="symbol-button" type="button">AAPL</button>
                    <button className="symbol-button" type="button">AMD</button>
                    <button className="symbol-button" type="button">SNAP</button>
                    <button className="symbol-button" type="button">TWTR</button>
                    <button className="symbol-button" type="button">NVDA</button>
                  <button className="symbol-button" type="button">SQ</button> */}
                  {/* {this.state.symbols.sort((a, b) => (a.position > b.position) ? 1 : -1).map(symbol => {
                    return (
                      <button
                    className="symbol-button"
                    type="button"
                    key={symbol.name}
                    onClick={() => this.adjustButtonOrder(symbol.name)}
                      >
                    {symbol.name}
                      </button>
                    )
                  })} */}
                </div>
              </div>
              <div className="row graph-container">
                <FlexibleXYPlot
                  onMouseLeave={this._onMouseLeave}
                  margin={{left: 50, right: 20, top: 10, bottom: 30}}
                >
                  <XAxis tickTotal={data.length} tickFormat={v => datetimes[v]} />
                  <YAxis tickFormat={v => '$'+v.toFixed(2)} />
                  <VerticalGridLines style={{stroke: '#243039'}} />
                  <HorizontalGridLines style={{stroke: '#243039'}} />
                  <LineSeries onNearestX={this._onNearestX} animation data={data} />
                  <Crosshair
                    values={this.state.crosshairValues}
                    style={{line:{stroke: 'rgb(56, 68, 77)'}}}
                  >
                    <div className="crosshair-container">
                      <div>{crosshairValues.length > 0 ? datetimes[crosshairValues[0].x] : ''} AM</div>
                      <span>Price: {crosshairValues.length > 0 ? '$'+crosshairValues[0].y.toFixed(2) : ''}</span>
                    </div>
                  </Crosshair>
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
