import { StyleSheet } from 'react-native';

export default (theme, themeName) => StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme(themeName).background
  },
  groupHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme(themeName).groupHeader,
    marginBottom: 10,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: theme(themeName).divider
  },
  listItemContainer: {
    flex: 1,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    flexDirection: 'row'
  },
  listItemLeft: {
    flex: 4
  },
  listItemRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItemTitle: {
    color: theme(themeName).listItemFontColor,
    fontSize: 14
  },
  listItemProgressText: {
    color: theme(themeName).listItemProgressFontColor,
    fontSize: 12
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 999,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  addPlanButton: {
    marginTop: 15,
    backgroundColor: theme(themeName).listItemBackground
  },
  addPlanButtonText: {
    color: theme(themeName).listItemFontColor,
  },
  cancelButton: {
    marginTop: 15,
    backgroundColor: '#ff3f34',
  },
  addPlanContainer: {
    margin: 30
  },
  explanation: {
    color: '#808e9b',
    fontSize: 12,
    margin: 10,
  },
  groupTitle: {
    color: theme(themeName).main,
    fontSize: 16
  },
  groupButton: {
    backgroundColor: theme(themeName).listItemFontColor
  },
  selectedGroupButton: {
    backgroundColor: theme(themeName).listItemBackground
  },
  groupButtonText: {
    color: theme(themeName).listItemBackground
  },
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
  timeLabel: {
    marginRight: 10
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  leftActionButton: {
    backgroundColor: '#05c46b'
  },
  rightActionButton: {
    backgroundColor: '#ff3f34'
  }
});