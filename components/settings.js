import { View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';

export const SettingsScreen=()=> {
    const [baseUrl,setBaseUrl]=React.useState("")

    const countries = ["India","USA","Australia","Russia","France","United Kingdom"];
    const languages=["English","Korean","French","Japanese","Chinese"];
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)

              setBaseUrl("https://newsdata.io/api/1/news?apikey=pub_398597730d74d20392b106ad0dd36c1322456&country=us");
              
            }}
            buttonTextAfterSelection={(selectedItem, index) => {

              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
       
              return item
            }}
          />
          <SelectDropdown
            data={languages}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setBaseUrl("https://newsdata.io/api/1/news?apikey=pub_398597730d74d20392b106ad0dd36c1322456&language=eng");
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
          
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
          
              return item
            }}
          />  
      </View>
    );
  }
