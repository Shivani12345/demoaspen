import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import COLORS from 'common/colors';
import responsivePixels from 'utils/responsivePixels';
import { Dropdown } from 'react-native-element-dropdown';
import { API_Call_With_Out_Token } from 'services/api';
import { METHODS } from 'services/apiConfig';

const RenderDropDown = ({
  setState,
  StateLists,
  state,
  contactInfo,
  labelField,
  valueField,
  setStateLists,
  infoData
}: any) => {
  
  useEffect(()=>{
    handleStateFetch();
    if(labelField === "title"){
      const noSelectState = {id: 0,
        state_code: "NULL",
        state_name_en: "Please Select",
        state_name_es: "Please Select"}
        StateLists = [noSelectState].concat(StateLists)
    }
  },[])

  const handleStateFetch = async () => {
    try {
      let URL = `states`;
      let state_Lists_Api_Call = await API_Call_With_Out_Token(
        URL,
        {},
        METHODS.GET,
      );
      if (state_Lists_Api_Call?.code === 200) {
        let sortedState = state_Lists_Api_Call?.ResponseJson.data.sort(
          (firstEle: any, secondEle: any) =>
            firstEle.state_name_en.localeCompare(secondEle.state_name_en),
        );
        setStateLists(sortedState);
        const findState = sortedState?.find(
          (el: any) => el.state_code === infoData.renter_state,
        );
        if (findState) {
          setState({value: findState.state_name_en, error: ''});
        }
      }
    } catch (err) {
      console.log('Error State List ', err);
    }
  }

  

  const handleStateSelect = (selectedItem: any) => {
    if(selectedItem[valueField] != "Please Select"){
      setState({value: selectedItem[valueField], error: ''});
    }else{
      setState({value: "", error: ''});
    }
  };

  const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Text style={styles.text}>{contactInfo.state}</Text>
      <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={StateLists}
          search
          maxHeight={300}
          labelField={labelField}
          valueField={valueField}
          placeholder={contactInfo.selectState }
          searchPlaceholder={contactInfo.selectState}
          value={state.value}
          keyboardAvoiding={true}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(true)}
          onChange={(item:any) => {
            setValue(item[valueField]);
            handleStateSelect(item);
            setIsFocus(false);
          }}
        />
    </View>
  );
};

export default RenderDropDown;

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    color: COLORS.mediumGray,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    paddingHorizontal: 8,
    backgroundColor: COLORS.transparent,
    borderWidth: responsivePixels.size1,
    borderRadius: responsivePixels.size6,
    borderColor: COLORS.gray,
    width: '100%',
    marginTop: 5,
    height: responsivePixels.size55,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    fontSize: responsivePixels.size14,
  },
  placeholderStyle: {
    fontSize: responsivePixels.size14,
    color: COLORS.grey,
    marginLeft: responsivePixels.size10,
  },
  selectedTextStyle: {
    fontSize: responsivePixels.size14,
    color: COLORS.black,
    paddingLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: responsivePixels.size14,
  },
});
