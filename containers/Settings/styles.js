import { StyleSheet } from 'react-native';

export default (theme, themeName) => StyleSheet.create({
  container: {
    backgroundColor: theme(themeName).background,
    flex: 1
  },
  backupRestoreModalContainer: {
    backgroundColor: theme(themeName).background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backupRestoreText: {
    color: theme(themeName).main,
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: theme(themeName).main,
    marginTop: 20,
    marginBottom: 20,
    width: 300
  },
  explanation: {
    color: '#808e9b',
    fontSize: 12,
    margin: 10,
  },
});