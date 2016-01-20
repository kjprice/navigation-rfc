/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';

var React = require('react-native');
var {
  NavigationActions,
  NavigationContainer,
  NavigationReducer,
  ScrollView,
  StyleSheet,
  TabBarIOS,
  View,
} = React;
var NavigationExampleRow = require('./NavigationExampleRow');

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

class ExmpleTabPage extends React.Component {
  render() {
    var currentTabRoute = this.props.navigationState.routes[this.props.navigationState.index];
    return (
      <ScrollView style={styles.tabPage}>
        <NavigationExampleRow
          text={`Current Tab is: ${currentTabRoute}`}
        />
        {this.props.navigationState.routes.map(tab => (
          <NavigationExampleRow
            key={tab}
            text={`Go to ${tab}`}
            onPress={() => {
              this.props.onNavigation(NavigationActions.JumpTo(tab));
            }}
          />
        ))}
        <NavigationExampleRow
          text="Exit Tabs Example"
          onPress={this.props.onExampleExit}
        />
      </ScrollView>
    );
  }
}
ExmpleTabPage = NavigationContainer.create(ExmpleTabPage);

var NavigationTabsExample = React.createClass({
  render: function() {
    return (
      <NavigationContainer.RootContainer
        initialState={{ routes: ['one', 'two', 'three'], index: 0 }}
        reducer={NavigationReducer}
<<<<<<< HEAD
        persistenceKey="NAV_EXAMPLE_STATE_TABS"
        renderNavigator={(navigationState, onNavigation) => {
          if (!navigationState) { return null; }
          return (
            <View style={styles.topView}>
              <ExmpleTabPage
                onExampleExit={this.props.onExampleExit}
                // we don't need to pass onNavigation or navigationState here
                // because ExampleTabPage is wrapped with NavigationContainer.create 
              />
              <TabBarIOS style={styles.tabBar}>
                {navigationState.routes.map((route, index) => (
                  <TabBarIOS.Item
                    title={route}
                    icon={{uri: base64Icon, scale: 3}}
                    key={route}
                    selected={index === navigationState.index}
                    onPress={this._handleTabPress.bind(this, onNavigation, route)}
                    // This is a hack because we are abusing the nature of TabBarIOS
                    // to handle scene switching seperately
                  >
                    <View />
                  </TabBarIOS.Item>
                ))}
              </TabBarIOS>
            </View>
          );
        }}
=======
        renderNavigator={(navigationState, onNavigation) => (
          <View style={styles.topView}>
            <ExmpleTabPage
              onExampleExit={this.props.onExampleExit}
              // we don't need to pass onNavigation or navigationState here
              // because ExampleTabPage is wrapped with NavigationContainer.create
            />
            <TabBarIOS style={styles.tabBar}>
              {navigationState.mapToArray((route, index, key) => (
                <TabBarIOS.Item
                  title={route}
                  icon={{uri: base64Icon, scale: 3}}
                  key={key}
                  selected={index === navigationState.index}
                  onPress={this._handleTabPress.bind(this, onNavigation, route)}
                  // This is a hack because we are abusing the nature of TabBarIOS
                  // to handle scene switching seperately
                >
                  <View />
                </TabBarIOS.Item>
              ))}
            </TabBarIOS>
          </View>
        )}
>>>>>>> cea90f2b5dd4e1c5e875ad8ebef053c40221e941
      />
    );
  },

  _handleTabPress: function(onNavigation: Function, route: any) {
    onNavigation(NavigationActions.JumpTo(route));
  },
});

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    paddingTop: 30,
  },
  tabPage: {
    backgroundColor: '#E9E9EF',
  },
  tabBar: {
    // hack to hide the main view of TabBarIOS
    height: 49,
    flex: null,
  },
});

module.exports = NavigationTabsExample;
