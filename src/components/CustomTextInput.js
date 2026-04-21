import { Text, TextInput, View } from 'react-native';

const CustomTextInput = ({
  placeholder,
  label,
  labelStyle,
  value,
  containerStyle,
  textStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={value}
        style={[
          textStyle,
          {
            width: '80%',
            borderBottomWidth: 1,
          },
        ]}
      />
    </View>
  );
};

export default CustomTextInput;
