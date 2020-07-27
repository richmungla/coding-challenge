import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Platform } from "react-native";
import { Header, Text, Icon, Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect } from "react-redux";

import styles from "./style";
import Activity from "../../models/Activity";
import { ActivityStackParamList } from "../../Router";
import { createAndUpdate } from "../../actions/activityActions";
import { authType } from "../../actions/authActions";

type NewActivityNavigationProps = StackNavigationProp<ActivityStackParamList>;
type NewActivityProps = {
  navigation: NewActivityNavigationProps;
  createActivity: any;
  auth: authType;
};

const InitialActivity: Activity = {
  name: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  time: new Date(),
};

const NewActivity: React.FC<NewActivityProps> = ({
  navigation,
  createActivity,
  auth,
}) => {
  const [activity, setActivity] = useState<Activity>(InitialActivity);
  const [showStartDate, toggleStartDate] = useState<boolean>(false);
  const [showEndDate, toggleEndDate] = useState<boolean>(false);
  const [showTime, toggleTime] = useState<boolean>(false);

  const BackIcon = () => (
    <Icon
      name="arrow-back"
      color="white"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );

  const onDateChange = (event: any, selectedDate: Date, type: string) => {
    switch (type) {
      case "start":
        setActivity({ ...activity, startDate: selectedDate });
        toggleStartDate(false);
        break;
      case "end":
        setActivity({ ...activity, endDate: selectedDate });
        toggleEndDate(false);
        break;
      case "time":
        setActivity({ ...activity, time: selectedDate });
        toggleTime(false);
        break;
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Header
          placement="left"
          leftComponent={<BackIcon />}
          centerComponent={{ text: "New Activity", style: { color: "white" } }}
        />
        <ScrollView style={styles.container}>
          {showStartDate && (
            <DateTimePicker
              testID="startDatePicker"
              value={activity.startDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                onDateChange(event, date, "start");
              }}
            />
          )}
          {showEndDate && (
            <DateTimePicker
              testID="startDatePicker"
              value={activity.endDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                onDateChange(event, date, "end");
              }}
            />
          )}
          {showTime && (
            <DateTimePicker
              testID="startDatePicker"
              value={activity.time}
              mode="time"
              display="default"
              onChange={(event, date) => {
                onDateChange(event, date, "time");
              }}
            />
          )}
          <Input
            placeholder="Activity Name"
            value={activity.name}
            onChangeText={(text) => {
              setActivity({ ...activity, name: text });
            }}
          />
          <View
            style={[styles.flexWrapper, { justifyContent: "space-between" }]}
          >
            <View style={styles.flexWrapper}>
              <Icon
                name="calendar"
                type="font-awesome"
                size={25}
                onPress={() => {
                  toggleStartDate(true);
                }}
                containerStyle={styles.dateIcon}
              />
              <Text>Start Date</Text>
            </View>
            <View>
              <Text>{activity.startDate.toLocaleDateString()}</Text>
            </View>
          </View>
          <View
            style={[
              styles.flexWrapper,
              { justifyContent: "space-between", marginTop: 10 },
            ]}
          >
            <View style={styles.flexWrapper}>
              <Icon
                name="calendar"
                type="font-awesome"
                size={25}
                onPress={() => {
                  toggleEndDate(true);
                }}
                containerStyle={styles.dateIcon}
              />
              <Text>Start Date</Text>
            </View>
            <View>
              <Text>{activity.endDate.toLocaleDateString()}</Text>
            </View>
          </View>
          <View
            style={[
              styles.flexWrapper,
              {
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 15,
              },
            ]}
          >
            <View style={styles.flexWrapper}>
              <Icon
                name="calendar"
                type="font-awesome"
                size={25}
                onPress={() => {
                  toggleTime(true);
                }}
                containerStyle={styles.dateIcon}
              />
              <Text>Time</Text>
            </View>
            <View>
              <Text>{activity.time.toLocaleTimeString()}</Text>
            </View>
          </View>
          <Input
            placeholder="Description"
            multiline
            numberOfLines={5}
            value={activity.description}
            onChangeText={(text) => {
              setActivity({ ...activity, description: text });
            }}
          />
          <View style={[styles.flexWrapper, styles.buttonGroup]}>
            <Button title="Cancel" type="outline" buttonStyle={styles.button} />
            <Button
              title="Create"
              buttonStyle={styles.button}
              onPress={() => {
                createActivity(activity, auth.user._id);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createActivity: (activity, userId) => {
      dispatch(createAndUpdate(activity, userId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewActivity);
