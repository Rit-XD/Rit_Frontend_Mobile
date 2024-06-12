import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Channel, ChannelList, MessageInput, MessageList } from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";
import Modal from "react-native-modal";
import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import ChatProvider from "@/providers/ChatProvider";
import { ThemedText } from "@/components/ThemedText";

const ChatScreen = () => {
  const themeColor = useThemeColor({ light: "#151515", dark: "#fefefe" }, 'background');
  const [channel, setChannel] = useState<ChannelType | null>();

  return (
    <ChatProvider>
      {channel? (
      <Modal isVisible style={{margin: 0, paddingBottom: 48, backgroundColor: "white"}} animationIn="slideInRight" animationOut="slideOutRight">
          <Button mod={["white", "square"]} onPress={() => setChannel(null)} style={{position: 'absolute', top: 64, left: 32, zIndex: 999}}>
            <AntDesign name='arrowleft' size={24} color={themeColor}/>
          </Button>
          <Channel channel={channel}>
            <MessageList/>
            <MessageInput/>
          </Channel>
      </Modal>
      ) : (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Chat</ThemedText>
        <ChannelList onSelect={setChannel}/>
      </ThemedView>
      )}
    </ChatProvider>
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
    fontFamily: "Cocon"
  },
  container: {
    height: "100%",
    paddingTop: 50,
  },
});
