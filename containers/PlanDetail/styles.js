import { StyleSheet } from 'react-native';

export default (theme, themeName) => StyleSheet.create({
  container: {
    backgroundColor: theme(themeName).background,
    margin: 30
  },
  applyProgressButton: {
    backgroundColor: '#05c46b',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  historyButton: {
    backgroundColor: '#575fcf',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  endPlanButton: {
    backgroundColor: '#ff3f34',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  planTitle: {
    color: theme(themeName).main,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginTopBottom: {
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalView: {
    flex: 1,
    flexDirection: 'row'
  },
  groupLabel: {
    fontSize: 13,
    color: theme(themeName).main
  },
  explanation: {
    color: theme(themeName).explanation,
    fontSize: 12,
    margin: 10,
  }
});