/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Pressable
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {WebView} from "react-native-webview"




function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator();

  const [country,setCountry]=React.useState("us");
  const [category,setCategory]=React.useState("science");
  const [data,setData]=React.useState(null);
  const [newsClick,setNewsClick]=React.useState(false);
   
  
  let baseUrl="https://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"&apiKey=887a9a5676f84e5987ff158c932d90eb";
  const handleFetch=()=>{
    console.log(baseUrl);
    fetchingData(baseUrl);
    //console.log(data);
  
  };
  const handleNewsClick=()=>{
    setNewsClick(true)
    console.log("news clicked");
  }

  
  async function fetchingData(baseUrl:string){
   fetch(baseUrl)
     .then((Response)=>Response.json())
     .then((data)=>{
      setData(data);
      console.log(data);

        })
      .catch(error=>{
       console.error(error); 
      })  
    
     
  }
  const getNewsList=()=>{

    if (data !==null){
     return  data.articles.map((item, index) => {
      return <NewsList key={index} title={item.title}/>
    
   });
  }
 }

 const setNewsCategory=(category)=>{
  setCategory(category);
  //fetchingData(baseUrl);
  setNewsClick(false);
 }

 React.useEffect(()=>{
  fetchingData(baseUrl);
 })

  function HomeScreen() {
    return (
    
    <>
      
   <View  style={styles.headerSection} > 
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("scince")}}>
       <Text style={styles.buttonText}>Science</Text> 
      </Pressable>
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("business")}}>
       <Text style={styles.buttonText}>Business</Text> 
      </Pressable>
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("health")}}>
       <Text style={styles.buttonText}>Health</Text> 
      </Pressable>
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("sports")}}>
       <Text style={styles.buttonText}>Sports</Text> 
      </Pressable>

    </View> 
   
    {!newsClick?
    <ScrollView style={styles.newsScrollView}>
      {
      getNewsList()
      }
    
    </ScrollView>:
    <MyWebComponent/>  

  }
    
      </>
    );
  }
  
  function WatchScreen() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>watch screen</Text>
        <NewsList/>
        
      </View>
    );
  }
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Choose a country</Text>
      </View>
    );
  }
  const MyWebComponent = () => {
    return (
      <View style={{flex:1,marginTop:10}}>
       <WebView
       source={{uri:"https://reactnative.dev/docs/environment-setup"}}
       ></WebView> 
      </View>
      );
  }
const NewsList=({title})=>{
    return (
    <View>
    <Pressable onPress={handleNewsClick}>
      <Text>{title}</Text>
    </Pressable>
    <View style={{backgroundColor:"black",height:2}}></View>
    </View>
    );
    
  }
 
  return (
    <NavigationContainer>
      <Tab.Navigator   screenOptions={{headerShown: false}} >
        <Tab.Screen   name="Home"
          component={HomeScreen}
          options={{
            //title: 'home',
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/icons/home_icon.png")}
                />
              );
            },
          }} />
        <Tab.Screen name="Watch" 
        component={WatchScreen}
        options={{
          //title: 'Watch',
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("./assets/icons/video_icon.png")}
              />
            );
          },
        }}  />
        <Tab.Screen name="Setting" 
        component={SettingsScreen}
        options={{
          //title: 'settings',
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("./assets/icons/setting_icon.png")}
              />
            );
          },
        }}  />
      </Tab.Navigator>
    </NavigationContainer>

  
   
  );
}

const styles = StyleSheet.create({

 
  headerSection:{
  marginTop:10,  
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-evenly",
  alignItems:"center",


  },
  newsContainer:{
   height:600,
   

  },

  navBarSection:{
 
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-evenly",
  alignItems:"center",
  position:"absolute",
  bottom:0,
  marginTop:20

  },

  icon:{
   height:60,
   width:60 
  },

button:{
  backgroundColor:"#0E86D4",
  borderRadius:2,
  height:30,
  width:60,
  justifyContent:"center",
  marginTop:10
},
buttonText:{
color:"white"
},
newsScrollView:{
  marginTop:20
}

});

export default App;
