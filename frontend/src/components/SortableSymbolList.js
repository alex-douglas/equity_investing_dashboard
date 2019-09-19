import React, { Component } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';

class SortableSymbolList extends Component {

  render () {
    const { stockList, order, updateOrder } = this.props;

    const panes = stockList.map(symbol => (
      <Pane
        className={symbol === order[0] ? "symbol-button selected-button" : "symbol-button"}
        key={symbol}
        size={{ height: '100%', width: 75 }}
        resizable={{ x: false, y: false, xy: false }}
        onClick={() => updateOrder(symbol)}
      >
        {symbol}
      </Pane>
    ));

    return (
      <SortablePane
        className="sortable-pane-container"
        direction="horizontal"
        margin={5}
        isSortable={false}
        order={order}
      >
        {panes}
      </SortablePane>
    );
  };
}

export default (SortableSymbolList);
