import { Alert, BackHandler } from 'react-native'
import { StackNavigator } from 'react-navigation';

const backAction = () => {
  Alert.alert(
    'Close',
    'Do you want to close the App?',
    [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => BackHandler.exitApp() }
    ],
    { cancelable: false }
  )

  return true
}

export { backAction }
