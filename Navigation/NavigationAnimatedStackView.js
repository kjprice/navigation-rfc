/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationAnimatedStackView
 * @flow
 */
'use strict';

var NavigationStack = require('./NavigationStack');
var NavigationContainer = require('./NavigationContainer');
var React = require('react-native');

var immutable = require('immutable');

var {
  Animated,
  View,
} = React;
var {
  Map,
  Record,
} = immutable;

/**
 * Record that contains the information for the scene view.
 */
var NavigationSceneRecord = Record({
  /**
   * The index of the route in the navigation route stack.
   */
  index: -1,
  /**
   * The key for the scene view.
   */
  key: '',
  /**
   * The route for the scene.
   */
  route: null,

  /**
   * Whether the target scene for the route is stale.
   * If `true`, the route is no longer in the navigation route stack while its
   * target scene may remain in the stack view.
   */
  stale: false,
});

/**
 * Helper function to compare route keys (e.g. "9", "11").
 */
function compareKey(one: string, two: string): number {
  var delta = one.length - two.length;
  if (delta > 0) {
    return 1;
  }
  if (delta < 0) {
    return -1;
  }
  return one > two ? 1 : -1;
}

/**
 * Helper function to sort records based on their stack index and view key.
 */
function compareRecords(
  one: NavigationSceneRecord,
  two: NavigationSceneRecord
): number {
  if (one.index > two.index) {
    return 1;
  }

  if (one.index < two.index) {
    return -1;
  }

  return compareKey(one.key, two.key);
}

class NavigationAnimatedStackView extends React.Component {
  _position: Animated.Value;
  _postionListener: ?string;
  _lastHeight: number;
  _lastWidth: number;
  _onProgressChange: Function;

  constructor(props) {
    super(props);
    this._onProgressChange = this._onProgressChange.bind(this);
    this._position = new Animated.Value(this.props.navigationStack.index);
    this.state = {
      width: new Animated.Value(this._lastWidth),
      height: new Animated.Value(this._lastHeight),
      records: new Map(),
    };
  }
  componentWillMount() {
    this.setState({
      records: this._reduceRecords(this.state.records, this.props.navigationStack),
    });
  }
  componentDidMount() {
    this._postionListener = this._position.addListener(this._onProgressChange);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.navigationStack !== this.props.navigationStack) {
      this.setState({
        records: this._reduceRecords(this.state.records, nextProps.navigationStack, this.props.navigationStack),
      });
    }
  }
  componentDidUpdate(lastProps) {
    if (lastProps.navigationStack.index !== this.props.navigationStack.index) {
      Animated.spring(
        this._position,
        {toValue: this.props.navigationStack.index}
      ).start();
    }
  }
  componentWillUnmount() {
    if (this._postionListener) {
      this._position.removeListener(this._postionListener);
      this._postionListener = null;
    }
  }
  _onProgressChange(data: Object): void {
    if (data.value !== this.props.navigationStack.index) {
      return;
    }
    this.state.records.forEach((record, key) => {
      if (record.stale) {
        this.setState({
          records: this.state.records.remove(key),
        });
      }
    });
  }
  _reduceRecords(
    records: Map,
    nextStack: NavigationStack,
    lastStack: ?NavigationStack
  ): Map {
    records = records.withMutations(map => {
      if (lastStack) {
        // routes to dismiss.
        lastStack.subtract(nextStack).forEach(diff => {
          var record = new NavigationSceneRecord({
            route: diff.route,
            index: diff.index,
            key: diff.key,
            stale: true,
          });
          map.set(record.key, record);
        });
      }

      // routes to stay.
      nextStack.forEach((route, index, key) => {
        if (map.has(key)) {
          return;
        }
        var record = new NavigationSceneRecord({ route, index, key, });
        map.set(record.key, record);
      });
    });
    records = records.sort(compareRecords);
    return records;
  }
  render() {
    return (
      <View
        onLayout={(e) => {
          const {height, width} = e.nativeEvent.layout;
          this._lastHeight = height;
          this._lastWidth = width;
          this.state.height.setValue(height);
          this.state.width.setValue(width);
        }}
        style={this.props.style}>
        {this.state.records.toArray().map(this._renderScene, this)}
        {this._renderOverlay(this._renderOverlay, this)}
      </View>
    );
  }
  _renderScene(sceneRecord) {
    const {height, width} = this.state;
    return this.props.renderScene({
      key: sceneRecord.key,
      sceneRecord,
      position: this._position,
      height,
      width,
      initWidth: this._lastWidth,
      initHeight: this._lastHeight,
    });
  }
  _renderOverlay() {
    const {height, width} = this.state;
    return this.props.renderOverlay({
      position: this._position,
      height,
      width,
      initWidth: this._lastWidth,
      initHeight: this._lastHeight,
    });
  }
}
NavigationAnimatedStackView.propTypes = {
  navigationStack: React.PropTypes.instanceOf(NavigationStack).isRequired,
  renderScene: React.PropTypes.func.isRequired,
};
NavigationAnimatedStackView = NavigationContainer(NavigationAnimatedStackView);
NavigationAnimatedStackView.NavigationSceneRecord = NavigationSceneRecord;

module.exports = NavigationAnimatedStackView;