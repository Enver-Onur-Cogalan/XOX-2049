import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Board from './src/components/Board';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Board />
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
