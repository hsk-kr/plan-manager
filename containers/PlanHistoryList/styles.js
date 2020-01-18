import { StyleSheet } from 'react-native';

export default (theme, themeName) => StyleSheet.create({
  container: {
    backgroundColor: theme(themeName).background
  },
  listContainer: {
    margin: 30
  },
  listItem: {
    backgroundColor: theme(themeName).listItemBackground,
    padding: 20,
    marginBottom: 15,
    borderRadius: 30
  },
  listItemTitle: {
    color: theme(themeName).listItemFontColor,
    fontSize: 18,
  },
  listItemBody: {
    color: theme(themeName).listItemFontColor,
    fontSize: 12
  },
  divider: {
    backgroundColor: theme(themeName).listItemFontColor,
    marginTop: 5,
    marginBottom: 5
  }
});