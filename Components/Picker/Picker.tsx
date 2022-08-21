import {FormControl, Input, Select} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants';

const Picker = (props: any) => {
  const {
    value,
    placeholder,
    style,
    items,
    showAdd,
    selectedItem,
    showSearch,
    dropdownIcon,
    onChangeSearchValue,
    onEndSearchValue,
    setCompanySearchValue,
    onPress,
    onAddPress,
    onValueChange,
  } = props;

  const [searchValue, setSearchValue] = useState('');

  return (
    <View>
      <Select
        onOpen={onPress}
        selectedValue={value}
        _selectedItem={selectedItem}
        minWidth={style?.minWidth ? style.minWidth : '200'}
        accessibilityLabel={placeholder}
        placeholder={placeholder}
        color={COLORS.textColor}
        mt={style?.marginTop ? style.marginTop : 5}
        placeholderTextColor={style?.color ? style.color : COLORS.textColor}
        fontSize={style?.fontSize ? style.fontSize : 14}
        borderRadius={style?.borderRadius ? style.borderRadius : 10}
        backgroundColor={style?.backgroundColor}
        borderWidth={style?.borderWidth}
        paddingRight={style?.paddingRight}
        borderColor={style?.borderColor ? style.borderColor : COLORS.textColor}
        paddingLeft={style?.paddingLeft ? style.paddingLeft : 2}
        height={style?.height ? style.height : 10}
        dropdownIcon={dropdownIcon}
        onValueChange={onValueChange}
        _actionSheetBody={{
          ListHeaderComponent: showSearch && (
            <FormControl px={2} mb={0}>
              <Input
                py={0}
                borderRadius={8}
                height={8}
                fontSize={14}
                _focus={{
                  backgroundColor: '#fff',
                  borderColor: COLORS.DEFAULT_COLOR,
                }}
                value={searchValue}
                placeholder="Хайх"
                type="text"
                onEndEditing={() => onEndSearchValue(searchValue)}
                onChangeText={val => setSearchValue(val)}
              />
            </FormControl>
          ),
        }}>
        {items?.map((el: any, index: any) => (
          <Select.Item
            key={index}
            label={el.label}
            value={el.value}
            borderBottomWidth={1}
            borderBottomColor={'#e1e1e1'}
            color={COLORS.textColor}
          />
        ))}
        {showAdd ? (
          <Select.Item
            label="+"
            paddingTop={0}
            value="0"
            onPress={onAddPress}
            style={styles.addButton}
          />
        ) : (
          <></>
        )}
      </Select>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  addButton: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: COLORS.textColor,
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    // backgroundColor: '#d7d7d7',
  },
});
