import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';

function CautionScreen({navigation}) {
  const checkImage = require('../../../asset/check/baseline_check_box_black_24pt_2x.png');
  const unCheckImage = require('../../../asset/un_check/baseline_check_box_outline_blank_black_24pt_2x.png');

  const [toggle, setToggle] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.horizontalView}>
          <Text style={styles.title}>숨기기 규칙</Text>
        </View>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.sub_title}>
          다수의 사람들이 공공장소에 공연을 숨기고 찾는 데서 발생하는 문제들을
          예방하기 위해서 적용되는 규칙이다.
        </Text>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.text}>1. 다른 이를 위험에 처하지 않게 한다.</Text>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.text}>2. 자연을 훼손하지 않는다.</Text>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.text}>3. 사유지에 허가없이 설치하지 않는다.</Text>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.text}>4. 공연을 찾는 행위가 의심스러워 보일 수도 있는 장소(학교 근처, 놀이터, 은행, 법정, 이웃집 등)에 설치하지 않는다.</Text>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.text}>5. 공동묘지, 역사적으로나 고고학적으로 중요한 장소에 소유자나 관리자의 허가없이 설치하지 않는다.</Text>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.text}>6. 위험한 물체나 무기, 음란물은 일체 허용되지 않는다.</Text>
        <Text style={styles.sub_title}> </Text>
        <Text style={styles.sub_title}>위 규칙을 준수하지 않아 발생하는 문제에 관한 책임은 공연을 숨긴 당사자에게 있습니다.</Text>
        <Text style={styles.sub_title}> </Text>
        <View style={{...styles.horizontalView, justifyContent: 'flex-end', alignItems: 'center'}}>
          <Text style={styles.sub_title}>확인하였고, 이 규칙들을 준수하겠습니다.</Text>
          <Text style={styles.sub_title}></Text>
          <TouchableOpacity
            style={styles.inputButtonContainer}
            onPress={() => {
              if (toggle) {
                setToggle(false);
              } else {
                setToggle(true);
              }
            }}>
            {toggle === true ? (
              <Image style={styles.icon} source={checkImage} />
            ) : (
              <Image style={styles.icon} source={unCheckImage} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 30}}>
          <TouchableHighlight
            disabled={!toggle}
            style={toggle ? styles.openButton : styles.disabledButton}
            onPress={() => navigation.navigate('숨기기')}>
            <Text style={styles.buttonText}>
              {toggle ? '숨기러가기' : '체크해주세요'}
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontalView: {
    flexDirection: 'row',
  },
  scrollView: {
    marginHorizontal: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
  },
  sub_title: {
    fontSize: 15,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
  },
  name: {
    fontWeight: '700',
  },
  icon: {
    tintColor: 'black',
    width: 22,
    height: 22,
    marginRight: 5,
  },
  openButton: {
    borderRadius: 5,
    padding: 15,
    width: '80%',
    justifyContent: 'center',
    marginHorizontal: 0,
    backgroundColor: 'rgba(221, 151, 34, 1.0)',
  },
  disabledButton: {
    borderRadius: 5,
    padding: 15,
    width: '80%',
    justifyContent: 'center',
    marginHorizontal: 0,
    backgroundColor: 'rgba(111, 111, 111, 1.0)',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  throughLineText: {
    textDecorationLine: 'line-through',
  },
});

export default CautionScreen;
