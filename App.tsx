/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
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
import SelectDropdown from 'react-native-select-dropdown';
import {WebView} from "react-native-webview";
import { WatchScreen} from './components/videoWatch';
import { SettingsScreen } from './components/settings';
    

function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator();
  const [country,setCountry]=React.useState("us");
  const [category,setCategory]=React.useState("science");
  const [data,setData]=React.useState(null);
  const [newsClick,setNewsClick]=React.useState(false);
  const [newsUrl,setNewsUrl]=React.useState("");
  const [baseUrl,setBaseUrl]=React.useState("https://newsdata.io/api/1/news?apikey=pub_398597730d74d20392b106ad0dd36c1322456&category=science");



  //let baseUrl="https://newsapi.org/v2/top-headlines?country="+country+"&category="+category+"&apiKey=887a9a5676f84e5987ff158c932d90eb";
  
  //let baseUrl="https://newsdata.io/api/1/news?apikey=pub_398597730d74d20392b106ad0dd36c1322456&category="+category;


  async function fetchingData(baseUrl:any){
    fetch(baseUrl)
      .then((Response)=>Response.json())
      .then((data)=>{
         setData(data);
         console.log("data fetched");
 
         })
       .catch(error=>{
        console.error(error); 
       })  
     
      
   }
  

  
    //  const getNewsList=()=>{
   
    //    if (data !==null){
    //     return  data.articles.map((item, index) => {
    //        setNewsUrl(item.url);
    //      return <NewsList key={index} title={item.title}/>
       
    //   });
    //  }
    // }
    const getNewsList=()=>{
    
       if (data !==null){
        return  data.results.map((item:any, index:number) => {
         setNewsUrl(item.link);
         return <NewsList key={index} title={item.title}/>
   
       
      });
     }
   
    }
    const NewsList=(title:any)=>{
      return (
      <View style={styles.newsList}>
      <Pressable onPress={handleNewsClick}>
        <Text>{title}</Text>
      </Pressable>
      <View style={styles.newsUnderline}></View>
      </View>
      );
      
    }

    const MyWebComponent = () => {
      return (
      <View style={{flex:1,marginTop:10}}>
       <WebView
       source={{uri:newsUrl}}
       ></WebView> 
      </View>
      );
    }
    const setNewsCategory=(category:any)=>{
     console.log(category)
     setCategory("https://newsdata.io/api/1/news?apikey=pub_398597730d74d20392b106ad0dd36c1322456&category="+category);
     fetchingData(baseUrl);
     setNewsClick(false);
     
    }

    const handleNewsClick=()=>{
        setNewsClick(true);
        console.log("news clicked");
        console.log(newsUrl);
      }
   
    React.useEffect(()=>{
     fetchingData(baseUrl);
    },[]);
  
 const HomeScreen=()=> {


    return (
    
    <>
      
   <SafeAreaView  style={styles.headerSection} > 
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("science")}}>
       <Text style={styles.buttonText}>Science</Text> 
      </Pressable>
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("business")}}>
       <Text style={styles.buttonText}>Business</Text> 
      </Pressable>
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("health")}}>
       <Text style={styles.buttonText}>Health</Text> 
      </Pressable>
      <Pressable style={styles.button} onPress={()=>{setNewsCategory("technology")}}>
       <Text style={styles.buttonText}>Technology</Text> 
      </Pressable>

    </SafeAreaView> 
   
    {!newsClick?
    <View style={styles.scrollViewContainter}>
    <ScrollView style={styles.newsScrollView}>
      {
      getNewsList()
      //getNewsListb()
      }
     </ScrollView>
    </View>:
    <MyWebComponent/>  
     }
    
      </>
    );
  }
  
  return (
    <NavigationContainer>
      <Tab.Navigator   screenOptions={{headerShown: false}} >
        <Tab.Screen   name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/icons/home_icon.png")}
                />
              );
            },
          }} />
        <Tab.Screen 
        name="Watch" 
        component={WatchScreen}
        options={{
          tabBarIcon: ({size,focused,color}) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("./assets/icons/video_icon.png")}
              />
            );
          },
        }}  
        />
        <Tab.Screen 
          name="Setting" 
          component={SettingsScreen}
          options={{
          
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/icons/setting_icon.png")}
                />
              );
            },
          }} 
        />
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
  newsList:{
   marginLeft:10,
   marginRight:10, 
   height:60,
   justifyContent:"center"
   

  },
  newsUnderline:{
    backgroundColor:"#B1B1B1",
    height:1,
    marginTop:5
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
  width:75,
  justifyContent:"center",
  marginTop:10
},
buttonText:{
 color:"white"
},
newsScrollView:{
  //marginTop:20
},
scrollViewContainter:{
  marginTop:20,
  height:570,
 
}

});

export default App;
