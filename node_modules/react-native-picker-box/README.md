<h1 align="center">react-native-picker-box</h1>

<p align="center">Simple and configurable component picker for react native</p>

## Table of contents
  * [Usage](#usage)
    * [Installation](#installation)
    * [Basic Example](#basic-example)
  * [Props and Methods](#props-and-methods)
    * [Props](#props)
    * [Methods](#methods)
  * [Contributing](#contributing)

<h2 align="left">Usage</h2>

### Installation

Just add react-native-picker-box to your project:

```sh
yarn add react-native-picker-box
```

### Basic example
| `ANDROID` | `IOS`
|-|-|
![Basic example gif android](Images/example-android.gif)|![Basic example gif ios](Images/example-ios.gif)|


### Import

```javascript
import PickerBox from 'react-native-picker-box';
```

### Using a react-native-picker-box

```javascript
export default class App extends Component {

  state={
    data: [
      {label: 'Português', value: 'pt'},
      {label: 'Deutsch', value: 'de'},
      {label: 'English', value: 'en'}
    ],
    selectedValue: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={() => this.myref.openPicker() }>Press to select language</Text>
        <Text style={styles.instructions}>{ this.state.selectedValue }</Text>
        <PickerBox
          ref={ref => this.myref = ref}
          data={ this.state.data }
          onValueChange={value => this.setState({ selectedValue: value })}
          selectedValue={ this.state.selectedValue }
        />
      </View>
    );
  }
}
```

<h2 align="left">Props and Methods</h2>

### Props

Name             | Type       | Default  | Required  | Description
-----------------|------------|----------|-----------|--------------
data             | `array`    | `none`   | `Yes`     | Each item should be in the following format: `{label: 'JavaScript', value: 'js'}`
onValueChange    | `function` | `null`   | `Yes`     | Callback for when an item is selected. This is called with the following parameter: `value`
selectedValue    | `string`   | `none`   | `No`      | Value matching value of one of the items. Can be a string or an integer.
maxHeight        | `number`   | ` -  `   | `No`      | Custom maxHeight. Is the maximum height for this component.
statusbar        | `boolean`  | `true`   | `No`      | StatusBar overlapping.
itemTextColor    | `string`   | `#757379`| `No`      | Custom item text color.
separatorColor   | `string`   | `#757379`| `No`      | Custom separator color.
prevTextColor    | `string`   | `#572580`| `No`      | Custom button(prev) text color.
prevTextLabel    | `string`   | `Cancel` | `No`      | Custom button(prev) text label.

### Methods
Method Name | Arguments | Description
------------|-----------|----------------
openPicker  | `null`    | Open picker. Use refs for open Picker [following the example]


<h2 align="left">Contributing</h2>

Thanks for being interested on making this package better.


```sh
git clone https://github.com/duhwcarvalho/react-native-picker-box.git
cd react-native-picker-box
react-native upgrade
yarn
react-native run-android or react-native run-ios
```

## Author

| [<img src="https://avatars0.githubusercontent.com/u/24841773?s=60&v=4"><br><sub>@duhwcarvalho</sub>](https://github.com/duhwcarvalho) |
| :---: |