import { primaryColor } from "@/constants/Colors";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const connect = async() => {
          console.log(user)
          await client.connectUser(
            {
              id: user.id,
              name: `${user.firstname} ${user.lastname}`,
              image: 'https://i.imgur.com/fR9Jz14.png',
            },
            client.devToken(user.id),
          );
          setIsReady(true);
    
          // const channel = client.channel('messaging', 'the_park', {
          //   name: 'The Park',
          // });
          // await channel.watch();
        }
        connect();

        return () => {
          if (isReady) client.disconnectUser();
          setIsReady(false);
        }
      }, [user.id]);

    if(!isReady) return <ActivityIndicator style={{marginTop: 75}} color={primaryColor} size={"large"}/>;

    return (
        <>
            <OverlayProvider>
                <Chat client={client}>
                    {children}
                </Chat>
            </OverlayProvider>
        </>
    )
}