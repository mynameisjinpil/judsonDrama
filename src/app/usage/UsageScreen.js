import * as React from 'react';
import {SafeAreaView, Text, ScrollView, View, Image, StyleSheet} from 'react-native';

function UsageScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{marginHorizontal: 30}}>
          <View style={styles.rowContainer}>
            <Image style={{width: 40, height: 40}} source={require('../../../asset/80.png')}></Image>
            <Text style={styles.sub_title}>공연 찾기</Text>
          </View>
          <Text style={styles.blank}> </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>1. </Text>
            <Text style={{...styles.text, ...styles.throughLineText}}>저드슨 드라마</Text>
            <Text style={styles.text}>앱 상의 GPS 수신기를 이용해서</Text>
          </View>
          <Text style={styles.text}>공연장을 찾는다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>2 공연 제안하는 독특한 방식으로 공연을 감상한다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>3 공연장을 찾은 날짜와 회원 닉네임을 종이 로그북에 기록하고, 앱 상에도 기록한다.</Text>
          <Text style={styles.description}>(*못 찾았을 경우에도 기록을 남기면 다른 관객에게 도움이 됩니다.)</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>4 보물과 로그북을 다시 보물함에 넣어 원래 자리에 숨긴다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.blank}> </Text>
          <View style={styles.rowContainer}>
            <Image style={{width: 40, height: 40}} source={require('../../../asset/80.png')}></Image>
            <Text style={styles.sub_title}>공연 숨기기</Text>
          </View>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>1. 공연을 준비한다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>2. 방수가 되고 숨기기 적당한 용기도 준비한다.</Text>
          <Text style={styles.blank}> </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>3. </Text>
            <Text style={{...styles.text, ...styles.throughLineText}}>저드슨 드라마</Text>
            <Text style={styles.text}> 인스타그램 계정</Text>
          </View>
          <Text style={styles.text}>(@judson_drama)에서 로그북과 스티커를 다운로드받거나, judsondrama@gmail.com 으로 요청해서 인쇄한 후 용기에 부착한다.</Text>
          <Text style={styles.sub_title}> </Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>4. 용기 속에 준비한 공연과 찾은 로그북을 함께 넣는다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>5. 용기 겉면에 스티커를 붙인다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>6. 행인에 의해 쉽게 파괴 또는 유기되지 않을 서울 어느 장소에 잘 숨긴다.</Text>
          <Text style={styles.blank}> </Text>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={styles.text}>7. </Text>
            <Text style={{...styles.text, ...styles.throughLineText}}>저드슨 드라마</Text>
            <Text style={styles.text}>앱 상의 '숨기기 ' 페이지에 숨긴 </Text>
          </View>
          <Text style={styles.text}>공연의 정보와 위치, 힌트를 올린다. </Text>
          <Text style={styles.blank}> </Text>
          <View style={styles.rowContainer}>
            <Image style={{width: 40, height: 40}} source={require('../../../asset/80.png')}></Image>
            <Text style={styles.sub_title}>규칙</Text>
          </View>
          <Text style={styles.blank}> </Text>
          <Text style={styles.text}>다수의 사람들이 공공장소에 공연을 숨기고 찾는 데서 발생하는 문제들을 예방하기 위해서 적용되는 규칙이다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={{...styles.text, fontWeight: '900'}}>1. 다른 이를 위험에 처하지 않게 한다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={{...styles.text, fontWeight: '900'}}>2. 자연을 훼손하지 않는다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={{...styles.text, fontWeight: '900'}}>3. 사유지에 허가 없지 설치하지 않는다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={{...styles.text, fontWeight: '900'}}>4. 공연을 찾는 행위가 의심스러워 보일 수도 있는 놀이터, 은행, 법정, 이웃집 등)에 설치하지 않는다.
          </Text>
          <Text style={styles.blank}> </Text>
          <Text style={{...styles.text, fontWeight: '900'}}>5. 공동묘지, 역사적으로나 고고학적으로 중요한 장소에 소유자나 관리자의 허가없이 설치하지 않는다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={{...styles.text, fontWeight: '900'}}>6. 위험한 물체나 무기, 음란물은 일체 허용되지 않는다.</Text>
          <Text style={styles.blank}> </Text>
          <Text style={styles.blank}> </Text>
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
  scrollView: {
    marginHorizontal: 10,
    marginTop: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
  sub_title: {
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  throughLineText: {
    textDecorationLine: 'line-through',
  },
  blank: {
    fontSize: 40,
  },
});

export default UsageScreen;
