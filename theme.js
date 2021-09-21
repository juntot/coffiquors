import {StyleSheet} from 'react-native';

export let colorStyle = {
  success: '#4caf50',
  warning: '#f57f17',
  danger: '#e53935',

  white: 'white',
  red: '#810020',
  gray: 'gray',
  black1: '#0B0B0D',
  black2: '#181619',
  black3: '#181B22',
  black4: '#272A31',
  gold1: '#A76B09',
  gold2: '#E1B025',
};

export const fromStyle = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    //  margin: 15,
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    borderColor: colorStyle.gold2,
    borderWidth: 0.9,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputSearch: {
    //  margin: 15,
    // marginTop: 15,
    // marginBottom: 15,
    height: 40,
    borderColor: colorStyle.gold2,
    borderWidth: 0.9,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export const layoutStyle = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colorStyle.black3,
  },
  body: {
    paddingLeft: 35,
    paddingRight: 35,
    flex: 1,
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 70,
  },
});

export const styles = StyleSheet.create({
  primaryText: {
    color: colorStyle.gold2,
    fontWeight: 'bold',
    // textTransform: 'uppercase'
  },
  title: {
    paddingTop: 8,
    paddingBottom: 2,
    color: colorStyle.gold2,
    fontWeight: 'bold',
    // textTransform: ''
  },

  text_desc: {
    color: colorStyle.black4,
  },
  search: {
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    height: 45, // added for ios
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
  },
  banner: {
    position: 'absolute',
    borderBottomRightRadius: 19,
    borderBottomLeftRadius: 19,
    height: 170,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  banner_img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo_container: {
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  logo: {
    borderRadius: 500,
    width: 90,
    height: 90,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  cardContainer: {justifyContent: 'space-between', flexDirection: 'row'},
  cardShadow: {
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: 15,
  },

  card: {
    borderRadius: 8,
    marginTop: 150,
    margin: 5,
    flex: 1,
    // height: 200,
    backgroundColor: 'white',
    height: 100,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    padding: 4,
  },
  cardText: {
    color: colorStyle.gold2,
    fontWeight: 'bold',
    // position:'absolute',
    // left:0, right: 0, bottom: 0,
    // textAlign: 'center',
    // padding: 8,
  },
  // cards
  tinyLogo: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  // popular

  bottomtabs: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderTopWidth: 0.5,
    borderColor: colorStyle.black1,
    // backgroundColor: 'white',
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    backgroundColor: colorStyle.black4,
  },
});

export const modalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 5,
    borderTopColor: colorStyle.gold2,
  },
});
