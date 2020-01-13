import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

/**
 * A Input nubmer component
 * @property {object} containerStyle A style of the container
 * @property {object} buttonsContainerStyle A style of the container of buttons
 * @property {object} textStyle A style of the text
 * @property {number} value A value
 * @property {Function} onChangeText Change text event
 * @property {number} stepValue How much increase when press the up and down buttons. default 1.
 * @property {boolean} notAllowNegative Not allow to input negative number.
 */
function InputNumberComponent(props) {
  let { stepValue } = props;
  if (!stepValue) {
    stepValue = 1;
  }

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TextInput
        style={[styles.text, props.textStyle]}
        value={props.value.toString()}
        onChangeText={
          (v) => {
            if (!isNaN(v)) {
              if ((props.notAllowNegative && v >= 0) || !props.notAllowNegative) {
                props.onChangeText(v);
              }
            }
          }
        }
      />
      <View style={[styles.buttonsContainer, props.buttonsContainerStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.onChangeText(Number(props.value) + stepValue)}>
          <View >
            <Text>↑</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={
            () => {
              if ((props.notAllowNegative && Number(props.value) - stepValue >= 0) || !props.notAllowNegative) {
                props.onChangeText(Number(props.value) - stepValue);
              }
            }
          }>
          <View>
            <Text>↓</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default InputNumberComponent;