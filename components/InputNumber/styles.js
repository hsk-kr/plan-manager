import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50
  },
  buttonsContainer: {
    width: 30
  },
  text: {
    width: 70,
    fontSize: 16,
    borderColor: '#dfe4ea',
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    textAlign: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#dfe4ea',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomEndRadius: 5,
  }
});