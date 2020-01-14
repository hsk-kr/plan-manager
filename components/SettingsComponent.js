import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Alert
} from 'react-native';
import { ListItem } from 'react-native-elements';
import locale from '../localization/locale';
import Loading from './LoadingComponent';
import theme from '../theme';
import PickerBox from 'react-native-picker-box';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;

function SettingsComponent(props) {
  // states
  const [isLoading, load] = useState(true);

  // references
  const languagePickerRef = useRef(null);
  const themePickerRef = useRef(null);

  // translation function
  const t = locale(props.settings.language);

  // when component's mounted, change isLoading is true
  useEffect(() => {
    load(false);
  }, []);

  // change themeName when theme's changed
  useEffect(() => {
    themeName = props.settings.theme;

    props.navigation.setParams({
      headerTitleColor: theme(themeName).main,
      headerBackgroundColor: theme(themeName).background
    });
  }, [props.settings.theme]);

  // when language's changed
  let themeList = [
    { label: t('BLUE_THEME'), value: 'blue' },
    { label: t('BLACK_THEME'), value: 'black' },
  ];
  let languageList = [
    { label: t('KOREAN_TEXT'), value: 'korean' },
    { label: t('ENGLISH_TEXT'), value: 'english' },
  ];
  useEffect(() => {
    // change header title to appropriate title depends on language
    props.navigation.setParams({
      title: t('HEADER_TITLE')
    });

    // update a list item of picker boxes.
    themeList = [
      { label: t('BLUE_THEME'), value: 'blue' },
      { label: t('BLACK_THEME'), value: 'black' },
    ];

    languageList = [
      { label: t('KOREAN_TEXT'), value: 'korean' },
      { label: t('ENGLISH_TEXT'), value: 'english' },
    ];

  }, [props.settings.language]);

  // custom functions
  const showDeveloperInfo = () => {
    Alert.alert(
      t('DEVELOPER_INFO_TITLE'),
      t('DEVELOPER_INFO_BODY')
    );
  };

  const content = (
    <>
      <View style={styles.container}>
        <ListItem
          titleStyle={{ color: theme(themeName).main }}
          leftIcon={{ name: 'language', type: 'font-awesome', color: theme(themeName).main }}
          title={t('SETTINGS_LANGUAGE')}
          rightIcon={{ name: 'chevron-right', type: 'font-awesome', color: theme(themeName).main }}
          onPress={() => languagePickerRef.current.openPicker()}
          bottomDivider
        />
        <PickerBox
          ref={languagePickerRef}
          data={languageList}
          onValueChange={value => props.changeLanguage(value)}
          selectedValue={props.settings.language}
        />
        <ListItem
          titleStyle={{ color: theme(themeName).main }}
          leftIcon={{ name: 'palette', type: 'font-awesome5', color: theme(themeName).main }}
          title={t('SETTINGS_THEME')}
          rightIcon={{ name: 'chevron-right', type: 'font-awesome', color: theme(themeName).main }}
          onPress={() => themePickerRef.current.openPicker()}
          bottomDivider
        />
        <PickerBox
          ref={themePickerRef}
          data={themeList}
          onValueChange={value => props.changeTheme(value)}
          selectedValue={props.settings.theme}
        />
        <ListItem
          titleStyle={{ color: theme(themeName).main }}
          leftIcon={{ name: 'database', type: 'font-awesome', color: theme(themeName).main }}
          title={t('SETTINGS_BACKUP_RESTORE')}
          rightIcon={{ name: 'chevron-right', type: 'font-awesome', color: theme(themeName).main }}
          bottomDivider
        />
        <ListItem
          titleStyle={{ color: theme(themeName).main }}
          leftIcon={{ name: 'code', type: 'font-awesome', color: theme(themeName).main }}
          title={t('SETTINGS_ABOUT')}
          rightIcon={{ name: 'chevron-right', type: 'font-awesome', color: theme(themeName).main }}
          onPress={() => showDeveloperInfo()}
          bottomDivider
        />
      </View>
    </>
  );

  if (isLoading) {
    return <Loading />
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme(themeName).background,
    flex: 1
  },
});

export default SettingsComponent;