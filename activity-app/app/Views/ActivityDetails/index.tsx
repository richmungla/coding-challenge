import React, { useState } from "react";
import { SafeAreaView, View, TouchableOpacity, ScrollView } from "react-native";
import {
  Text,
  Header,
  Icon,
  Divider,
  Card,
  Overlay,
  Button,
} from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import { connect } from "react-redux";

import styles from "./style";
import { ActivityStackParamList } from "../../Router";
import { deleteAndUpdate } from "../../actions/activityActions";

type ActivityNavigationProp = StackNavigationProp<ActivityStackParamList>;
type ActivityDetailsProps = {
  navigaiton: ActivityNavigationProp;
  route: any;
  deleteActivity: any;
};

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  navigaiton,
  route,
  deleteActivity,
}) => {
  const [isDeleteVisible, setDeleteVisible] = useState<boolean>(false);
  const { activity, userId } = route.params;
  console.log(activity);
  const ActionIcons = () => {
    return (
      <View style={styles.flexWrapper}>
        <TouchableOpacity style={styles.actionIcon}>
          <Icon name="pencil" type="font-awesome" color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon}>
          <Icon
            name="trash"
            type="font-awesome"
            color="white"
            onPress={() => {
              setDeleteVisible(true);
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView>
      <Header
        placement="left"
        centerComponent={{
          text: "Activity Details",
          style: { color: "white" },
        }}
        rightComponent={<ActionIcons />}
      />
      <Overlay
        isVisible={isDeleteVisible}
        overlayStyle={styles.overlayContainer}
        onBackdropPress={() => {
          setDeleteVisible(false);
        }}
      >
        <View>
          <Text h4>Delete</Text>
          <Divider />
          <Text>
            Are you sure you want to delete? This acition cannot be reversed.
          </Text>
          <View style={[styles.flexWrapper, styles.deleteButtons]}>
            <Button
              title="Cancel"
              onPress={() => {
                setDeleteVisible(false);
              }}
            />
            <Button
              title="Delete"
              type="outline"
              onPress={() => {
                setDeleteVisible(false);
                deleteActivity(activity._id, userId);
              }}
            />
          </View>
        </View>
      </Overlay>
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <View style={[styles.flexWrapper, styles.spaceBetween]}>
            <Text style={styles.label}>{activity.name}</Text>
            <Text>{activity.time}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={[styles.flexWrapper, styles.spaceBetween]}>
            <Text>Start Date</Text>
            <Text>{activity.startDate}</Text>
          </View>
          <View style={[styles.flexWrapper, styles.spaceBetween]}>
            <Text>End Date</Text>
            <Text>{activity.endDate}</Text>
          </View>
          <View>
            <Text>{activity.description}</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    deleteActivity: (activityId, userId) => {
      dispatch(deleteAndUpdate(activityId, userId));
    },
  };
}

export default connect(null, mapDispatchToProps)(ActivityDetails);
