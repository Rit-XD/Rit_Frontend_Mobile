import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Ride } from '@/types/Ride.type'
import MapView from 'react-native-maps'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import Button from '../ui/Button'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { Passenger } from '@/types/Passenger.type'

type detailsProps = {
    ride: Ride,
    closeDetails: () => void
}
const RideDetails = ({ride, closeDetails}:detailsProps) => {
    const [passenger, setPassenger]= React.useState<Passenger | null>(null);
    const origin = {
        latitude: 51.02735567847175,
        longitude: 4.478807550388861,
        latitudeDelta: 2,
        longitudeDelta: 2,
      };
      
        useEffect(()=> {
            const fetchPassenger = async () => {
                const {data, error} = await supabaseAdmin
                  .from("Passengers")
                  .select("*")
                  .eq("id", ride.passenger_1)
                  .single();

                  if (error) console.log(error);
                  setPassenger(data || null);
            }
            fetchPassenger();
        }, [ride.passenger_1]);

      const themeColor = useThemeColor({ light: "#151515", dark: "#fefefe" }, 'background');

  return (
    <View style={styles.modalContainer}>
        <Modal animationType='slide'>
            <MapView
            style={styles.map}
            initialRegion={origin}
            // provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton
            showsTraffic
            />
            <View style={{position: 'absolute', top: 64, left: 32}}>
                <Button onPress={closeDetails} style={{backgroundColor: "white"}} mod={["white", "square"]}>
                    <AntDesign name='arrowleft' size={24} color={themeColor}/>
                </Button>
            </View>
            <View style={{position: 'absolute', bottom: 64, width: '100%', height: 250}}>
                <ThemedView style={{flex: 1, marginHorizontal: 24, alignItems: "center", borderRadius: 15, padding: 16}}>
                    <ThemedText style={styles.name}>{passenger?.firstname}</ThemedText>
                    <ThemedText style={styles.distance}>{ride.distance? Math.round(ride.distance/1000) : ""} km</ThemedText>
                    <ThemedText style={styles.date}>{ride.timestamp? new Date(ride.timestamp).toLocaleDateString("nl-BE", {day: 'numeric', month: "long", year: 'numeric'}) : "1 jan 0000"}</ThemedText>
                    <ThemedText style={styles.time}>{ride.timestamp? new Date(ride.timestamp).toLocaleTimeString("nl-BE", {hour: "numeric", minute: "numeric"}) : "00.00"}</ThemedText>
                    <View style={{borderBottomColor: themeColor, borderBottomWidth: 1, width: "100%", opacity: .2, height: 8}}/>
                </ThemedView>
            </View>
        </Modal>
    </View>
  )
}

export default RideDetails

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    map: {
        width: "100%",
        height: "110%",
    },
    name: {
        fontSize: 24,
        fontFamily: "Cocon",
    },
    distance: {
        fontSize: 32,
        fontFamily: "Cocon",
        paddingVertical: 16,
    },
    date: {
        fontSize: 18,
    },
    time: {
        fontSize: 18,
    }
})