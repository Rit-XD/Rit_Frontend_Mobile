import { primaryColor } from "@/constants/Colors";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider, Streami18n } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";


const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);
const streami18n = new Streami18n({language: "nl"});

export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const { user } = useAuth();

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

    if(!isReady) return <ActivityIndicator style={{marginTop: 75}} color={primaryColor} size={"large"}/>;

    return (
        <>
            <OverlayProvider i18nInstance={streami18n}>
                <Chat client={client} i18nInstance={streami18n}>
                    {children}
                </Chat>
            </OverlayProvider>
        </>
    )
}