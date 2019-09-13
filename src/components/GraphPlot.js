import React, { Component } from 'react';
import { FlexibleXYPlot, LineMarkSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Crosshair } from 'react-vis';

class GraphPlot extends Component {
  state = {
    crosshairValues: []
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

  render () {
    const { data, dateTimes } = this.props;
    const { crosshairValues } = this.state;

    return (
      <FlexibleXYPlot
        onMouseLeave={this._onMouseLeave}
        margin={{left: 50, right: 20, top: 10, bottom: 30}}
        colorType='literal'
      >
        <XAxis tickTotal={data.length} tickFormat={v => dateTimes[v]} />
        <YAxis tickFormat={v => '$'+v.toFixed(2)} />
        <VerticalGridLines style={{stroke: '#243039'}} />
        <HorizontalGridLines style={{stroke: '#243039'}} />
        <Crosshair
          values={this.state.crosshairValues}
          style={{line:{stroke: 'rgb(56, 68, 77)'}}}
        >
          <div className="crosshair-container">
            <div>{crosshairValues.length > 0 ? dateTimes[crosshairValues[0].x] : ''} AM</div>
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
    );
  };
}

export default (GraphPlot);
