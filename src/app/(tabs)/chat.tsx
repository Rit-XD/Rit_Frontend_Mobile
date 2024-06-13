import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
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

const ChatScreen = () => {
  const themeColor = useThemeColor(
    { light: "#151515", dark: "#fefefe" },
    "background"
  );
  const { user } = useAuth();
  const [channel, setChannel] = useState<ChannelType | null>();

  return (
    <>
      {channel ? (
        <Modal
          isVisible
          style={{ margin: 0, paddingBottom: 48, backgroundColor: "white" }}
          animationIn="slideInRight"
          animationOut="slideOutRight"
        >
          <Button
            mod={["white", "square"]}
            onPress={() => setChannel(null)}
            style={{ position: "absolute", top: 64, left: 32, zIndex: 999 }}
          >
            <AntDesign name="arrowleft" size={24} color={themeColor} />
          </Button>
          <View style={{ marginTop: 50 }}>
            <Channel channel={channel}>
              <MessageList />
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
    marginTop: 24,
    marginBottom: 24,
    fontFamily: "Cocon",
  },
  container: {
    height: "100%",
    paddingTop: 50,
  },
});
