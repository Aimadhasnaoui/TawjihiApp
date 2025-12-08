
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text, View } from "react-native";
import { GetAnnonce } from "../../services/Annonce";

// export default function Annonce() {
//   const {
//     data,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["annonce"],
//     queryFn: GetAnnonce,
//   });

//   return (
//     <View style={{ flex: 1, padding: 16, alignItems: "center", justifyContent: "center", gap: 10 }}>
//       <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>Annonce 🎉</Text>

//       {isLoading && <Text>Loading…</Text>}

//       {error && (
//         <Text style={{ color: "red", textAlign: "center" }}>
//           Error: {error.message}
//         </Text>
//       )}

//       {data && (
//         <ScrollView style={{ maxHeight: 250, width: "100%", marginTop: 8 }}>
//           <Text selectable style={{ textAlign: "center" }}>
//             {JSON.stringify(data, null, 2)}
//           </Text>
//         </ScrollView>
//       )}

//       <Button title="Reload" onPress={refetch} />
//     </View>
//   );
// }
// import { useQuery } from "@tantml/react-query";
// import { GetAnnonce } from "../../services/Annonce";
import { Feather } from '@expo/vector-icons';
import { Pressable, RefreshControl } from "react-native";

export default function Annonce() {
  const {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["annonce"],
    queryFn: GetAnnonce,
  });

  const getTypeConfig = (type) => {
    switch (type) {
      case 'info':
        return { icon: 'info', bg: '#3B82F6', lightBg: '#DBEAFE' };
      case 'warning':
        return { icon: 'alert-triangle', bg: '#F59E0B', lightBg: '#FEF3C7' };
      case 'success':
        return { icon: 'check-circle', bg: '#10B981', lightBg: '#D1FAE5' };
      case 'urgent':
        return { icon: 'alert-circle', bg: '#EF4444', lightBg: '#FEE2E2' };
      default:
        return { icon: 'bell', bg: '#6B7280', lightBg: '#F3F4F6' };
    }
  };

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
            colors={['#b0396b']}
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
              const config = getTypeConfig(annonce.Type);
              return (
                <View
                  key={annonce._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  {/* Color Bar */}
                  <View
                    className="h-1.5"
                    style={{ backgroundColor: config.bg }}
                  />

                  <View className="p-5">
                    {/* Header */}
                    <View className="flex-row items-start mb-3">
                      <View
                        className="w-10 h-10 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: config.lightBg }}
                      >
                        <Feather name={config.icon} size={20} color={config.bg} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-900 text-lg font-bold leading-6">
                          {annonce.Titre}
                        </Text>
                        <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wide">
                          {annonce.Type}
                        </Text>
                      </View>
                    </View>

                    {/* Description */}
                    <Text className="text-gray-600 text-base leading-6 ml-13">
                      {annonce.Description}
                    </Text>

                    {/* Footer */}
                    {annonce.Image && (
                      <View className="mt-4 ml-13">
                        <Text className="text-gray-400 text-xs">
                          📎 Image jointe
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
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