import React,{useRef,useEffect,useState} from 'react'
import { WebView } from "react-native-webview";
import { BackHandler,SafeAreaView} from "react-native";

const App = () => {
  let baseUrl = "http://192.168.0.54:3000/"
  const webview = useRef();
  const [exitApp,SETexitApp]=useState(false);

  const backAction = () => {
    if(exitApp==false){
        SETexitApp(true);
        // Toast.show({
        //   text2: '한번 더 뒤로가기 버튼을 누르면 종료됩니다.',
        //   topOffset: 640,
        //   visibilityTime: 500,
        // });
        onAndroidBackPress();
        
    }
    else if(exitApp==true){
        BackHandler.exitApp()
    }

    setTimeout(()=>{
        SETexitApp(false)
    }, 500);
    return true;
  };
  const onAndroidBackPress = () => {
    if (webview.current) {
      webview.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };
  useEffect(() =>
  {
      const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
      );
      return () => backHandler.remove();
  },[exitApp]) 
  useEffect(()=> {
    BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
    };
  }, []); // Never re-run this effect
  return (
    <SafeAreaView style={{ flex: 1,zIndex:0,backgroundColor:'transparent'}}>
      <WebView
          source={{ uri: baseUrl }}
          ref={webview}
          javaScriptEnabled={true} 
          domStorageEnabled={true}
          />
    </SafeAreaView>
  )
}

export default App
