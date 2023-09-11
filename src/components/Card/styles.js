import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const styles = StyleSheet.create({
  container: {
    height: 66,
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#F2F2F2',
    marginBottom: 14,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 16,
    marginHorizontal: 12,
    alignItems: 'center',
    flexShrink: 0,
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: '#6FCF97',
    borderRadius: 1000,
    marginRight: 16,
  },
  fullNameAndTitleColumn: {
    flexDirection: 'column',
  },
  fullName: {
    paddingBottom: 6,
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 'normal',
  },
  circleAndName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#828282',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  timePickerRow: {
    flexDirection: 'row',
  },
  timeInput: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 'normal',
  },
});

export default styles;
