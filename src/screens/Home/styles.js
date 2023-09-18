import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  timeDateMonth: {
    color: '#000000',
    fontFamily: 'Inter-Bold',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 31,
    paddingRight: 6,
  },
  timeYear: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 31,
    paddingRight: 8,
  },
  weeksDay: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    paddingBottom: 30,
  },
  sayHello: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  parrentColumn: {
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  rowDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 6,
  },
  listCard: {
    paddingTop: 22,
  },
  titleModal: {
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  signIn: {
    color: '#000000',
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
  },
  toYourAccount: {
    color: '#000000',
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  userNameInput: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  columnInput: {
    flexDirection: 'column',
  },
  modalPosition: {
    flex: 1,
    alignItems: 'center',
  },
  modalPositionAddMember: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonModal: {
    alignSelf: 'center',
    marginTop: 35,
  },
  floatingButton: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 10,
    marginTop: 100,
  },
});

export default styles;
