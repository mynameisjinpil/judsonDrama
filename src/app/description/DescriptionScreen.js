import * as React from 'react';
import {SafeAreaView, Text, ScrollView, View, StyleSheet} from 'react-native';

function DescriptionScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.textContainer}>
          <Text style={{...styles.text, ...styles.throughLineText}}>저드슨 드라마</Text>
          <Text style={styles.sub_title}> </Text>
          <Text style={styles.sub_title}>숨은 공연 찾기</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...styles.text, ...styles.throughLineText}}>저드슨 드라마</Text>
            <Text style={styles.text}>에 오신걸 환영합니다.</Text>
          </View>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>
            이 앱은 서울 곳곳에 숨겨진 작은 공연장으로 당신을 안내할 모바일
            보물지도입니다.
          </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>
            지름 4cm 에서 15cm에 이르는 이 작은 공연장에서는 2020년 서울, 비대면
            시대의 새로운 대면에 대해 고민하며 지난 6개월여 간 함께 작업해온
            다양한 장르의 예술가들의 작업들이 숨겨져 있습니다.
          </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>
            저드슨 댄스 씨어터의 재연이라는 최초의
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>
              기획을 포기/취소하는 것으로
            </Text>
            <Text style={{...styles.text, ...styles.throughLineText}}>저드슨 드라마</Text>
          </View>
          <Text style={styles.text}>
            콜렉티브는 '미묘한 공동창작의 감각'이라는 연약한 나침반을 가지고 낯설고 새로운 여정에 기꺼이 뛰어들었습니다.
          </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>
            이제 당신이 탐험가가 되어 이 여정에 동참할 차례입니다. 숨겨진 공연장의
            단서를 탐색해보세요. 당신이 선택한 시간, 당신이 선택한 동선 어딘가에
            보물이 기다리고 있습니다. 짜잔!
          </Text>
          <Text style={styles.text}> </Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{...styles.text, ...styles.throughLineText, fontWeight: '900'}}>저드슨 드라마</Text>
            <Text style={{...styles.text, fontWeight: '900'}}> 콜렉티브 일동</Text>
          </View>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>.</Text>
          <Text style={styles.text}>.</Text>
          <Text style={styles.text}>.</Text>
          <Text style={styles.text}>.</Text>
          <Text style={styles.text}>.</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>창작/협업</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>
            권병준, 김성출, 뭎(손민선, 조형준), 서영란, 신빛나리, 아비잔 토토,
            이민경, 장수미, 장혜진, 정세영, 해미 클레멘세비츠
          </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>포스터 디자인</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>김유나</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>앱 개발</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>유진필</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>촬영</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>이선영</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>크리에이티브 프로듀서</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>신재민</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>기획/제작</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>이민경, 정세영</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>도움주신 분들</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>
            김진호, 김혜나, 문예지, 문화공간 예술텃밭, 박슬기, 손경옥, 안애순,
            이세림, 이재민, 이정주, 이주현, 장석, 조아오 마틴스, 코스타 공유공간,
            한승우, 홍성민
          </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>후원</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>서울시, 서울문화재단, 금천예술공장,</Text>
          <Text style={{...styles.text, ...styles.throughLineText}}>
            Judson Drama
          </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.part}>문의처</Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.text}>judsondrama@gmail.com</Text>
          <Text style={styles.text}> </Text>
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
    marginTop: 40,
  },
  textContainer: {
    marginHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  throughLineText: {
    textDecorationLine: 'line-through',
  },
  sub_title: {
    fontSize: 18,
  },
  text: {
    fontSize: 17,
  },
  part: {
    fontSize: 17,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

export default DescriptionScreen;
