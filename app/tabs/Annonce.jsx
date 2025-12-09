import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { AlertTriangle, Bell, CheckCircle, Info } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GetAnnonce } from "../../services/Annonce";
export default function Annonce() {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["annonce"],
    queryFn: GetAnnonce,
  });

  const typeConfig = {
    info: {
      icon: Info,
      colors: ["#b0396b", "#8b2f5a"], // primary to secondary
      badge: "bg-primary/10 text-primary",
    },
    warning: {
      icon: AlertTriangle,
      colors: ["#f59e0b", "#f97316"], // amber to orange
      badge: "bg-amber-500/10 text-amber-600",
    },
    news: {
      icon: CheckCircle,
      colors: ["#10b981", "#14b8a6"], // emerald to teal
      badge: "bg-emerald-500/10 text-emerald-600",
    },
    deadlines: {
      icon: Bell,
      colors: ["#ef4444", "#f43f5e"], // red to rose
      badge: "bg-red-500/10 text-red-600",
    },
  };

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#b0396b] pt-2 pb-6 px-6 shadow-lg">
        <Text className="text-white text-3xl font-bold">Annonces</Text>
        <Text className="text-white/80 text-sm mt-1">
          Restez informé des dernières actualités
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor="#b0396b"
            colors={["#b0396b"]}
          />
        }
      >
        {isLoading && (
          <View className="flex-1 items-center justify-center py-20">
            <View className="bg-white rounded-full p-6 shadow-md">
              <Text className="text-[#b0396b] text-base font-medium">
                Chargement...
              </Text>
            </View>
          </View>
        )}

        {error && (
          <View className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mx-2">
            <View className="flex-row items-center mb-2">
              <Feather name="alert-circle" size={24} color="#EF4444" />
              <Text className="text-red-800 text-lg font-bold ml-2">
                Erreur
              </Text>
            </View>
            <Text className="text-red-600 text-sm leading-5">
              {error.message}
            </Text>
            <Pressable
              onPress={refetch}
              className="bg-red-600 rounded-xl py-3 mt-4 active:opacity-80"
            >
              <Text className="text-white text-center font-semibold">
                Réessayer
              </Text>
            </Pressable>
          </View>
        )}

        {data && data.length === 0 && (
          <View className="items-center justify-center py-20">
            <View className="bg-white rounded-3xl p-8 shadow-sm items-center">
              <Feather name="inbox" size={64} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg font-medium mt-4">
                Aucune annonce
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                Revenez plus tard
              </Text>
            </View>
          </View>
        )}

        {data && data.length > 0 && (
          <View className="gap-4">
            {data.map((annonce, index) => {
              // const config = getTypeConfig(annonce.Type);
              const config = typeConfig[annonce.Type];
              const Icon = config.icon;
              return (
                <Pressable
                  key={annonce._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <View className="">
                    {/* Header */}
                    <View className="flex-row items-start mb-3 w-full h-32 relative">
                      {annonce.Image ? (
                        <Image
                          src={annonce.Image || "/placeholder.svg"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <LinearGradient
                          colors={config.colors}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          className="h-full w-full flex items-center justify-center"
                        >
                          <View
                            className={`h-full w-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}
                          >
                            <View className="relative">
                              <Animated.View
                                style={{
                                  position: "absolute",
                                  opacity: 0.2,
                                  transform: [{ scale: pulseAnim }],
                                }}
                              >
                                <Icon size={64} color="white" />
                              </Animated.View>

                              {/* Main icon */}
                              <Icon size={64} color="white" />
                            </View>
                          </View>
                        </LinearGradient>
                      )}
                      <View className="absolute top-3 right-3">
                        <Text
                          className={`flex-row  items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm bg-white/90 text-foreground shadow-sm`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {annonce.Type.charAt(0).toUpperCase() +
                            annonce.Type.slice(1)}
                        </Text>
                      </View>
                    </View>
                    <View className=" items-start mb-3 p-5 gap-3">
                      <View className="flex-1 gap-3">
                        <Text className="text-gray-900 text-lg font-bold leading-6">
                          {annonce.Titre}
                        </Text>
                        <Text className="text-gray-600 text-[12px]">
                          {annonce.Description}
                        </Text>
                      </View>
                      <View className="flex-1 flex-row items-center justify-between mt-3 w-full">
                        <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wide">
                          {annonce.Type}
                        </Text>
                      </View>
                    </View>

                    {/* Footer */}
                    {annonce.Image && (
                      <View className="mt-4 ml-13">
                        <Text className="text-gray-400 text-xs">
                          📎 Image jointe
                        </Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Pull to Refresh Hint */}
        {!isLoading && data && (
          <View className="items-center py-6">
            <Text className="text-gray-400 text-xs">
              Tirez vers le bas pour actualiser
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
