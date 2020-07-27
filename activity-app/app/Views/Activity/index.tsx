import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect } from "react-redux";
import {
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Header,
  Icon,
  Card,
  Text,
  Divider,
  Overlay,
  Input,
} from "react-native-elements";

import styles from "./style";
import { ActivityStackParamList } from "../../Router";
import { authType } from "../../actions/authActions";
import { getActivities } from "../../actions/activityActions";

type ActivityNavigationProp = StackNavigationProp<ActivityStackParamList>;
type ActivityProps = {
  navigation: ActivityNavigationProp;
  auth: authType;
  fetchActivities: any;
};

const Activity: React.FC<ActivityProps> = ({
  navigation,
  auth,
  fetchActivities,
}) => {
  const { user } = auth;
  const { activities } = user;

  setTimeout(async () => {
    if (activities == undefined) {
      await fetchActivities(user._id);
    }
  }, 2000);

  const AddIcon = () => (
    <Icon
      name="plus-circle"
      size={25}
      type="font-awesome"
      color="white"
      onPress={() => {
        navigation.push("NewActivity");
      }}
    />
  );

  return (
    <SafeAreaView>
      <Header
        placement="left"
        leftComponent={{ icon: "home", color: "white" }}
        centerComponent={{ text: "My Activities", style: { color: "white" } }}
        rightComponent={<AddIcon />}
      />
      <ScrollView style={styles.container}>
        {activities != undefined ? (
          activities.map((value, index) => {
            return (
              <Card key={index} containerStyle={styles.cardContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Details", {
                      activity: value,
                      userId: user._id,
                    });
                  }}
                >
                  <View style={styles.cardHeader}>
                    <Text>{value.name}</Text>
                    <Text>9:00</Text>
                  </View>
                  <Divider style={styles.cardDivider} />
                  <Text style={styles.cardBoldLabel}>Description:</Text>
                  <Text>
                    {value.description.length >= 100
                      ? `${value.description.slice(0, 120)}...`
                      : value.description}
                  </Text>
                  <View style={styles.cardDateContainer}>
                    <View style={styles.cardflexWrapper}>
                      <Text style={styles.cardDateLabel}>Start Date: </Text>
                      <Text style={styles.cardDateText}>{value.startDate}</Text>
                    </View>
                    <View style={styles.cardflexWrapper}>
                      <Text style={styles.cardDateLabel}>End Date:</Text>
                      <Text style={styles.cardDateText}>{value.endDate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            );
          })
        ) : (
          <Text></Text>
        )}
      </ScrollView>
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
    fetchActivities: (userId) => {
      dispatch(getActivities(userId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
