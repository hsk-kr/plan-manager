import { StyleSheet } from 'react-native';

export default (theme, themeName) => StyleSheet.create({
  scrollContainer: {
    backgroundColor: theme(themeName).background
  },
  viewMoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    margin: 30
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  planInfoText: {
    color: theme(themeName).main,
    fontSize: 13
  },
  divider: {
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    color: theme(themeName).main,
    marginBottom: 20
  },
  activity: {
    fontSize: 16,
    color: theme(themeName).main,
    marginBottom: 5
  },
  activityDate: {
    color: theme(themeName).main,
    fontSize: 14,
  },
  activityText: {
    color: theme(themeName).main,
    fontSize: 13
  },
  activityContainer: {
    marginBottom: 10
  },
  deletePlanButton: {
    marginBottom: 10
  }
});