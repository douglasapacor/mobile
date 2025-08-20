import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

export async function registerForPushNotificationsAsync(): Promise<{
  success: boolean;
  data?: string;
}> {
  try {
    if (!Device.isDevice)
      throw new Error(
        "Notificações push funcionam apenas em dispositivos físicos"
      );

    let finalStatus: Notifications.PermissionStatus;
    const permissions = await Notifications.getPermissionsAsync();

    if (permissions.status !== "granted") {
      const requestPermissions = await Notifications.requestPermissionsAsync();
      finalStatus = requestPermissions.status;
    } else {
      finalStatus = permissions.status;
    }

    if (finalStatus !== "granted")
      throw new Error("Permissão para notificações foi negada");

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    let tokenData = await Notifications.getExpoPushTokenAsync();

    return { success: true, data: tokenData.data };
  } catch (error: any) {
    Alert.alert("msg do erro =>", error.message);

    return {
      success: false,
    };
  }
}
