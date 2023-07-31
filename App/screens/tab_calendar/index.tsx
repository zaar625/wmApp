import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Calender from '../../components/calender';
import TabHeader from '../../components/TabHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../theme';

const Calendar = () => {
  const headerContent = {
    title: `이번달${`\n`}이만큼 벌었어요`,
    image: require('../../assets/img/calendar_banner.png')
  };
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <TabHeader contents={headerContent} />
        <Calender />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary
  }
});
