import React, { useState, useEffect, useRef } from 'react';
import { View, Alert, Text, Modal, Share, Platform } from 'react-native';
import { ListItem, Button, Input, Icon, Divider, } from 'react-native-elements';
import { Buffer } from 'buffer';
import locale from '../../localization/locale';
import Loading from '../../components/Loading';
import theme from '../../theme';
import PickerBox from 'react-native-picker-box';

// A string variable for theme. If this is 'undefined', theme uses to default theme.
let themeName = undefined;
let styles = require('./styles').default(theme, themeName); // get styles depend on theme.

function Settings(props) {
  // states
  const [isLoading, load] = useState(true);
  const [isVisibleBackupRestoreModal, setVisibleBackupRestoreModal] = useState(false);
  const [restoreData, setRestoreData] = useState('');

  // references
  const languagePickerRef = useRef(null);
  const themePickerRef = useRef(null);

  // translation function
  const t = locale(props.settings.language);

  // when component's mounted, change isLoading is true
  useEffect(() => {
    load(false);
  }, []);

  // update theme
  useEffect(() => {
    themeName = props.settings.theme;
    styles = require('./styles').default(theme, themeName);

    props.navigation.setParams({
      headerTitleColor: theme(themeName).headerTitle,
      headerBackgroundColor: theme(themeName).headerBackground,
      shown: true
    });
  }, [props.settings.theme]);

  // when language's changed
  let themeList = [
    { label: t('BLUE_THEME'), value: 'blue' },
    { label: t('BLACK_THEME'), value: 'black' },
  ];
  let languageList = [
    { label: t('KOREAN'), value: 'korean' },
    { label: t('ENGLISH'), value: 'english' },
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
      { label: t('KOREAN'), value: 'korean' },
      { label: t('ENGLISH'), value: 'english' },
    ];

  }, [props.settings.language]);

  // handlers
  const showDeveloperInfo = () => {
    Alert.alert(
      t('DEVELOPER_INFO_TITLE'),
      t('DEVELOPER_INFO_BODY')
    );
  };

  const toggleBackupRestoreModal = () => {
    setVisibleBackupRestoreModal(!isVisibleBackupRestoreModal);
  };

  const exportData = async () => {
    const isAvailable = Platform.OS === 'android';

    if (!isAvailable) {
      Alert.alert(
        t('ALERT_TITLE'),
        t('DOES_NOT_SUPPORT')
      );
      return;
    }

    const encodeBase64 = (data) => new Buffer(data).toString('base64');

    let data = encodeBase64(JSON.stringify({ ...props.plans, ...props.history }));

    Share.share({
      title: t('BACKUP_TITLE'),
      message: data
    });
  };

  const restoreDate = () => {
    const decodeBase64 = (data) => new Buffer(data, 'base64').toString();

    Alert.alert(
      t('ALERT_RESTORE_TITLE'),
      t('ALERT_RESTORE_QUESTION'),
      [
        {
          text: t('CANCEL'),
          style: 'cancel'
        },
        {
          text: t('OK'),
          onPress: () => {
            try {
              if (restoreData.trim().length <= 0) {
                Alert.alert(
                  t('ALERT_RESTORE_TITLE'),
                  t('ALERT_CHECK_INPUT_VALUE')
                );
                return;
              }

              const data = JSON.parse(decodeBase64(restoreData.trim()));
              props.restorePlans(data.plans, data.history);

              setRestoreData('');

              Alert.alert(
                t('ALERT_RESTORE_TITLE'),
                t('ALERT_RESTORE_SUCCESS')
              );
              toggleBackupRestoreModal();
            } catch {
              Alert.alert(
                t('ALERT_RESTORE_TITLE'),
                t('ALERT_RESTORE_FAIL')
              );
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const content = (
    <>
      <View style={styles.container}>
        <ListItem
          titleStyle={{ color: theme(themeName).main }}
          containerStyle={{ backgroundColor: theme(themeName).background }}
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
          containerStyle={{ backgroundColor: theme(themeName).background }}
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
          containerStyle={{ backgroundColor: theme(themeName).background }}
          leftIcon={{ name: 'database', type: 'font-awesome', color: theme(themeName).main }}
          title={t('SETTINGS_BACKUP_RESTORE')}
          rightIcon={{ name: 'chevron-right', type: 'font-awesome', color: theme(themeName).main }}
          onPress={toggleBackupRestoreModal}
          bottomDivider
        />
        <ListItem
          titleStyle={{ color: theme(themeName).main }}
          containerStyle={{ backgroundColor: theme(themeName).background }}
          leftIcon={{ name: 'code', type: 'font-awesome', color: theme(themeName).main }}
          title={t('SETTINGS_ABOUT')}
          rightIcon={{ name: 'chevron-right', type: 'font-awesome', color: theme(themeName).main }}
          onPress={() => showDeveloperInfo()}
          bottomDivider
        />
      </View>
      {/* =========================== */}
      {/* =Backup & Restore Modal START= */}
      {/* =========================== */}
      <Modal
        visible={isVisibleBackupRestoreModal}
        onRequestClose={toggleBackupRestoreModal}>
        <View style={styles.backupRestoreModalContainer}>
          <Text style={[styles.backupRestoreText, { marginBottom: 15 }]}>{t('BACKUP')}</Text>
          <Text style={styles.explanation}>{t('BACKUP_EXPLANATION')}</Text>
          <Button
            title={t('EXPORT_DATA')}
            buttonStyle={{ backgroundColor: theme(themeName).listItemBackground }}
            titleStyle={{ color: theme(themeName).listItemFontColor }}
            onPress={exportData} />
          <Divider style={styles.divider} />
          <Text style={styles.backupRestoreText}>{t('RESTORE')}</Text>
          <Text style={styles.explanation}>{t('RESTORE_EXPLANATION')}</Text>
          <Input
            value={restoreData}
            leftIconContainerStyle={{ marginRight: 10 }}
            inputStyle={{ color: theme(themeName).main }}
            onChangeText={(text) => setRestoreData(text)}
            leftIcon={
              <Icon
                name='lock'
                type='font-awesome'
                size={24}
                color={theme(themeName).main} />
            }
            containerStyle={{ margin: 10 }}
            inputContainerStyle={{ marginLeft: 50, marginRight: 50 }}
            placeholder={t('DATA')} />
          <Button
            title={t('RESTORE_DATA')}
            buttonStyle={{ backgroundColor: theme(themeName).listItemBackground }}
            titleStyle={{ color: theme(themeName).listItemFontColor }}
            onPress={restoreDate} />
          <Divider style={styles.divider} />
          <Button
            title={t('CANCEL')}
            onPress={toggleBackupRestoreModal}
            containerStyle={{ marginTop: 20 }}
            buttonStyle={{ backgroundColor: '#ff3f34', paddingLeft: 50, paddingRight: 50 }}
            titleStyle={{ color: 'white' }} />
        </View>
      </Modal>
      {/* =========================== */}
      {/* =Backup & Restore Modal END= */}
      {/* =========================== */}
    </>
  );

  if (isLoading) {
    return <Loading />
  }

  return content;
}

export default Settings;