import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Channel, ChannelList, MessageInput, MessageList, useChatContext } from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";
import Modal from "react-native-modal";
import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const ChatScreen = () => {
  const themeColor = useThemeColor({ light: "#151515", dark: "#fefefe" }, 'background');
  const [channel, setChannel] = useState<ChannelType | null>();

  const { client } = useChatContext();

  if (channel) {
    return (
      <Modal isVisible style={{margin: 0, paddingBottom: 48, backgroundColor: "white"}} >
        <Button mod={["white", "square"]} onPress={() => setChannel(null)} style={{position: 'absolute', top: 64, left: 32, zIndex: 999}}>
          <AntDesign name='arrowleft' size={24} color={themeColor}/>
        </Button>
        <Channel channel={channel}>
          <MessageList/>
          <MessageInput/>
        </Channel>
      </Modal>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ChannelList onSelect={setChannel}/>
    </ThemedView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 50,
  },
});
