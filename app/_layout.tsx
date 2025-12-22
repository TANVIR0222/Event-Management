import store from "@/redux/store/store";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useEffect(() => {
    // app load হলেই splash hide
    SplashScreen.hideAsync();
  }, []);

  return (

    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="/common" />

        <Stack.Screen
          name="modals/createNewTeam"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",

          }}
        />
        <Stack.Screen
          name="modals/report_user"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",

          }}
        />
        <Stack.Screen
          name="modals/delete_team"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",

          }}
        />
        <Stack.Screen
          name="modals/delete_user"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",

          }}
        />
        <Stack.Screen
          name="modals/edit_team"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",

          }}
        />
        <Stack.Screen
          name="modals/share_event"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",

          }}
        />
        <Stack.Screen
          name="modals/view_teamlist"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",

          }}
        />

        <Stack.Screen
          name="modals/choosePayment_method"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
            contentStyle: { backgroundColor: "transparent" },
          }} />
        <Stack.Screen
          name="modals/Payment_Modal"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
            contentStyle: { backgroundColor: "transparent" },
          }} />
        <Stack.Screen
          name="modals/winner_selection"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: "fitToContents",
            contentStyle: { backgroundColor: "transparent" },
          }} />
      </Stack>
    </Provider>
  );
}
