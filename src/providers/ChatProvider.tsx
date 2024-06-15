import { primaryColor } from "@/constants/Colors";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, useColorScheme } from "react-native";
import { StreamChat } from "stream-chat";
import {
  Chat,
  DeepPartial,
  OverlayProvider,
  Streami18n,
  Theme,
} from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { useThemeColor } from "@/hooks/useThemeColor";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);
const streami18n = new Streami18n({ language: "nl" });

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { user } = useAuth();
  const authColorScheme = useAuth().colorScheme;
  const colorScheme = useColorScheme();

  const theme: DeepPartial<Theme> = {
    colors: {
      accent_blue: primaryColor,
      overlay: primaryColor,
      grey_gainsboro: colorScheme === "dark" ? "#303030" : "#fefefe",
      white:
        authColorScheme === "dark"
          ? "#151515"
          : authColorScheme === "light"
          ? "#fefefe"
          : useThemeColor({ light: "#fefefe", dark: "#151515" }, "background"),
      black:
        authColorScheme === "dark"
          ? "#fefefe"
          : authColorScheme === "light"
          ? "#151515"
          : useThemeColor({ light: "#151515", dark: "#fefefe" }, "background"),
    },
    messageList: {
      container: {
        backgroundColor: colorScheme === "dark" ? "#151515" : "#fefefe",
      },
    },
    channelListMessenger: {
      flatListContent: {
        backgroundColor: colorScheme === "dark" ? "#151515" : "#fefefe",
      },
    },
    channelPreview: {
      container: {
        backgroundColor: colorScheme === "dark" ? "#151515" : "#fefefe",
      },
    },
    messageSimple: {
      container: {
        backgroundColor: colorScheme === "dark" ? "#151515" : "#fefefe",
      },
      content: {
        senderMessageBackgroundColor: primaryColor,
      },
      gallery: {
        galleryContainer: {
          backgroundColor: colorScheme === "dark" ? "#151515" : "#fefefe",
        },
      },
    },
    messageInput: {
      container: {
        backgroundColor: colorScheme === "dark" ? "#151515" : "#fefefe",
      },
    },
  };

  const style = { style: theme };

    useEffect(() => {
        const connect = async() => {
          if(client.user) return setIsReady(true);
            await client.connectUser(
              {
                id: user!.id,
                name: `${user!.firstname} ${user!.lastname}`,
                image: user!.picture || 'https://i.imgur.com/fR9Jz14.png',
              },
              client.devToken(user!.id),
            );
            setIsReady(true);
        }
        connect();
      }, []);

  if (!isReady)
    return (
      <ActivityIndicator
        style={{ marginTop: 75 }}
        color={primaryColor}
        size={"large"}
      />
    );

  return (
    <>
      <OverlayProvider i18nInstance={streami18n} value={style}>
        <Chat client={client} i18nInstance={streami18n}>
          {children}
        </Chat>
      </OverlayProvider>
    </>
  );
}
