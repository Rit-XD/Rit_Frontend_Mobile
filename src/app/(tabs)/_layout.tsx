import { Redirect, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/providers/AuthProvider";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

const client = StreamChat.getInstance("zpg78zdqbyrd");

export default function TabLayout() {
  const {colorScheme} = useAuth();
  const { session } = useAuth();

  useEffect(() => {
    const connect = async() => {
      await client.connectUser(
        {
          id: 'jlahey',
          name: 'Jim Lahey',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
        client.devToken('jlahey'),
      );

      // const channel = client.channel('messaging', 'the_park', {
      //   name: 'The Park',
      // });
      // await channel.watch();
    }
    if(client.user === undefined)connect();
  }, []);

  if (!session) return <Redirect href="/login" />;
  return (
    <OverlayProvider>
      <Chat client={client}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarStyle: { bottom: 0, height: 90, paddingTop: 10, backgroundColor: colorScheme === "dark" ? "#101010" : "#fff", borderTopWidth: 0, shadowColor: "rgba(0, 0, 0, 0.25)", shadowOffset: { width: 0, height: 1 }, shadowRadius: 9, shadowOpacity: 1 }
          }}
        >
          <Tabs.Screen name="index" options={{ href: null }} />
          <Tabs.Screen
            name="home"
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "chatbox" : "chatbox-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="car"
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? "car" : "car-outline"} color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "settings" : "settings-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              href: null,
              title: "",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </Chat>
    </OverlayProvider>
  );
}
