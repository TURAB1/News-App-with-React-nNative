
  import React from "react"
  import { View } from "react-native";
  import WebView from "react-native-webview";
  

 export const  WatchVideo =() =>{

  const [videoData,setVideoData]=React.useState(null);

  let videoBaseurl="https://www.scorebat.com/video-api/v3/feed/?token=MTQ1OTU4XzE3MTAxMjQ1MjhfYmFkZmQxN2JmNmVjZDk4Yjk4ZGY1MTcwNmNjMThiMWIwZDFmMjdmNw==" ;
   //let videoUrl="https://reactnative.dev/docs/next/getting-started"
  async function fetchVideoData(baseUrl:string){
    fetch(baseUrl)
      .then((Response)=>Response.json())
      .then((videoData)=>{
       setData(videoData);
       console.log(videoData);
 
         })
       .catch(error=>{
        console.error(error); 
       })  
     
      
   }


   const getVideoUrl=()=>{

    if (videoData !==null){
     return  videoData.response.map((item, index) => {
       if(index==0)
       videoUrl=item.matchviewUrl;
    
   });
  }
 }


    return (
      <View style={{flex:1,marginTop:10}}>
       <WebView
       source={{uri:"https://www.scorebat.com//embed//matchview//1393880//?token=MTQ1OTU4XzE3MTAxNDc2NTBfNzlkZmVlZDQ2ZmVjMjQyMzQ2M2VjNDQ1YThlODJmNGQ0ZDE2MzNhNg=="}}
       ></WebView> 
      </View>
      );
  

  }


  



