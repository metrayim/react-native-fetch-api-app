import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import Home from './src/components/Home'
import AddIamge from './src/components/AddImage'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import {persistor,store} from './src/store/store';
import ViewData from './src/components/ViewData'
// const dataLoading=()=>{
//   console.log("loading.........")
//   retur(
//     <SafeAreaView>
//       <Text> loading</Text>
//     </SafeAreaView>
//   )
// }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
        loading={null}
        persistor={persistor}
        >
        <NavigationAppContainer />
        </PersistGate>
      </Provider>
      
    )
  }
}
const stackNavigation = createStackNavigator({

  Home: {
    screen: Home
  },
  AddIamge: {
    screen: AddIamge
  },
  ViewData:{
    screen:ViewData
  }
})
const NavigationAppContainer = createAppContainer(stackNavigation);

export default App;