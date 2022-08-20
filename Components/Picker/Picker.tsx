import {Select} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants';

const Picker = (props: any) => {
  const {
    value,
    placeholder,
    style,
    items,
    showAdd,
    showSearch,
    dropdownIcon,
    onPress,
    onAddPress,
    onValueChange,
  } = props;
  return (
    <View>
      <Select
        onOpen={onPress}
        selectedValue={value}
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
        onValueChange={onValueChange}>
        {/* {showSearch ? (
          <Select.Item
            label="+"
            value=""
            onPress={onShowAddPress}
            style={styles.addButton}
          />
        ) : (
          <></>
        )} */}
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
            value=""
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
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#e1e1e1',
  },
});
