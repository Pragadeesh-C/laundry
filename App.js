import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import StackNavigator from './StackNavigator';
import Store from './Store';

export default function App() {
  return (
    <Provider store={Store}>
      <StackNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
