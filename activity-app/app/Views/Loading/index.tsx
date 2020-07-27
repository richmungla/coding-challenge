import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";

import styles from "./styles";

const Loading: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default Loading;
