import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
} from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";
import Modal from "react-native-modal";
import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/providers/AuthProvider";
import { Image } from "expo-image";

const DateRemover = () => <></>;

const ChatScreen = () => {
  const themeColor = useThemeColor(
    { light: "#151515", dark: "#fefefe" },
    "background"
  );

  const backgroundColor = useThemeColor(
    { light: "#fefefe", dark: "#151515" },
    "background"
  );
  const { user } = useAuth();
  const [channel, setChannel] = useState<ChannelType | null>();
  const [channelUser, setChannelUser] = useState<{
    name?: string;
    online?: boolean;
    image?: any;
    last_active?: Date;
  }>({});

  useEffect(() => {
    console.log(channel)
  },[channel]);

  const timeAgo = (date?: Date) => {
    if (!date) return "Onbekend";
    const now = new Date();
    const diff = now.getTime() - date.getTime(); // Tijdsverschil in milliseconden
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) {
      return `${days}d geleden`;
    } else if (hours > 0) {
      return `${hours}u geleden`;
    } else if (minutes > 0) {
      return `${minutes}m geleden`;
    } else {
      return "Zojuist";
    }
  };

  useEffect(() => {
    const updateChannelUsers = () => {
      if (!channel) return;
      const members = Object.values(channel.state.members).map((user) => ({
        name: user.user!.name,
        online: !!user.user!.online,
        image: user.user!.image,
        last_active: new Date(user.user!.last_active!),
      }));
      
      setChannelUser(members.filter((member) => member.name !== `${user?.firstname} ${user?.lastname}`)[0]);
      channel.watch({ presence: true });
    };

    updateChannelUsers();
  }, [channel]);

  return (
    <>
      {channel ? (
        <Modal
          isVisible
          style={{
            margin: 0,
            paddingBottom: 48,
            backgroundColor: backgroundColor,
          }}
          animationIn="slideInRight"
          animationOut="slideOutRight"
        >
          <View style={{ marginTop: 50 }}>
            <Channel channel={channel}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 16,
                  marginHorizontal: 24,
                }}
              >
                <Button
                  mod={["white", "square"]}
                  onPress={() => setChannel(null)}
                >
                  <AntDesign name="arrowleft" size={24} color={themeColor} />
                </Button>
                {channelUser?.image ? (
                  <Image
                    source={channelUser.image}
                    style={{ height: 48, width: 48, borderRadius: 50 }}
                  ></Image>
                ) : null}
                <View style={{ alignItems: "flex-start" }}>
                  <ThemedText style={styles.chatTitle}>
                    {channelUser?.name ? channelUser.name : "User"}
                  </ThemedText>
                  <ThemedText style={styles.activeTitle}>
                    {channelUser?.online
                      ? "Nu actief"
                      : `${timeAgo(channelUser?.last_active)} actief`}
                  </ThemedText>
                </View>
              </View>
              <MessageList DateHeader={DateRemover} />
              <MessageInput />
            </Channel>
          </View>
        </Modal>
      ) : (
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title}>Chat</ThemedText>
          <ChannelList
            onSelect={setChannel}
            filters={{ members: { $in: [user!.id] } }}
            EmptyStateIndicator={() => (
              <ThemedText style={{ marginHorizontal: "auto", paddingTop: 16 }}>
                Er zijn geen actieve chats.
              </ThemedText>
            )}
          />
        </ThemedView>
      )}
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 24,
    fontFamily: "Cocon",
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Cocon",
  },
  activeTitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "inter",
  },
  container: {
    height: "100%",
    paddingTop: 50,
  },
});
