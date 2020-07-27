import React, { useState } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";

import styles from "./style";
import { registerUser, loginUser } from "../../actions/authActions";
import User from "../../models/User";

type RegisterProps = {
  register: any;
  login: any;
};
const Register: React.FC<RegisterProps> = ({ register, login }) => {
  const [userName, setUserName] = useState<string>("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Input
          placeholder="Name"
          inputContainerStyle={styles.inputStyle}
          onChangeText={(text) => {
            setUserName(text);
          }}
        />
        <View style={styles.flexWrapper}>
          <Button
            title="Login"
            type="outline"
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              login(userName);
            }}
          />
          <Button
            title="Register"
            buttonStyle={styles.buttonStyle}
            onPress={() => {
              const newUser: User = {
                name: userName,
                activities: [],
              };
              register(newUser);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    register: (user) => {
      dispatch(registerUser(user));
    },
    login: (userName) => {
      dispatch(loginUser(userName));
    },
  };
}

export default connect(null, mapDispatchToProps)(Register);
