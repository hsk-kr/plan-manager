import { StyleSheet } from 'react-native';

export default (theme, themeName) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  centerized: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSide: {
    backgroundColor: theme(themeName).historyLeftSideBackground
  },
  leftSideTitle: {
    color: theme(themeName).historyLeftSideFont,
    fontSize: 24
  },
  rightSide: {
    backgroundColor: theme(themeName).historyRightSideBackground
  },
  rightSideTitle: {
    color: theme(themeName).historyRightSideFont,
    fontSize: 24
  },
});