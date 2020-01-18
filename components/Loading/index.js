import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import theme from '../../theme';

let themeName = undefined;

function Loading(props) {

  // update theme
  useEffect(() => {
    themeName = props.settings.theme;

    if (props.navigation) {
      props.navigation.setParams({
        headerBackgroundColor: theme(themeName).headerBackground
      });
    }
  }, [props.settings.theme]);

  if (theme === undefined) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme(themeName).background }]}>
      <ActivityIndicator size='large' color={theme(themeName).main} />
      <Text style={[styles.loadingText, { color: theme(themeName).main }]}>Loading . . .</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Loading);