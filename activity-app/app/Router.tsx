import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";

// views
import RegisterScreen from "./Views/Register";
import ActivityScreen from "./Views/Activity";
import ActivityDetailsScreen from "./Views/ActivityDetails";
import NewActivityScreen from "./Views/NewActivity";
import LoadingScreeen from "./Views/Loading";

// action creators and types
import { authType } from "./actions/authActions";
import Activity from "./models/Activity";

export type ActivityStackParamList = {
  Home: undefined;
  Details: { activity: Activity , userId: string};
  NewActivity: undefined;
};
const ActivityStack = createStackNavigator();
const ActivityScreens = () => (
  <ActivityStack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <ActivityStack.Screen name="Home" component={ActivityScreen} />
    <ActivityStack.Screen name="Details" component={ActivityDetailsScreen} />
    <ActivityStack.Screen name="NewActivity" component={NewActivityScreen} />
  </ActivityStack.Navigator>
);

export type AuthStackParamList = {
  Splash: undefined;
  Register: undefined;
};
const AuthStack = createStackNavigator();
const AuthScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Register"
    >
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

interface IRouterProps {
  isLoading: boolean;
  auth: authType;
}
const Router: React.FC<IRouterProps> = ({ auth }) => {
  const { user } = auth;

  const RenderNavigation = () => (
    <NavigationContainer>
      {user == null ? <AuthScreens /> : <ActivityScreens />}
    </NavigationContainer>
  );
  return auth.isLoading ? <LoadingScreeen /> : <RenderNavigation />;
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Router);
