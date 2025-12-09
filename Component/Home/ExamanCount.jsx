import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

const ExamanCount = () => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);

  // keep date stable
  const examDate = useMemo(() => new Date("2026-06-15T00:00:00"), []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = examDate.getTime() - now.getTime();

      if (diff > 0) {
        setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));
        setHoursLeft(Math.floor((diff / (1000 * 60 * 60)) % 24));
      } else {
        setDaysLeft(0);
        setHoursLeft(0);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000 * 60); // every minute

    return () => clearInterval(interval);
  }, [examDate]);

  // simple progress (0–100%), clamp to [5, 100]
  const progress = Math.max(5, Math.min(100, 100 - (daysLeft / 365) * 100));

  return (
    <View className="bg-white rounded-2xl p-5 shadow-sm border border-border" style={{margin : 8}}>
      {/* Header */}
      <View className="flex-row items-center"
          style={{marginBottom:10,gap:3}}
      
      >
        {/* Icon background with gradient */}
        <LinearGradient
          colors={["#b0396b", "#58277f"]}
          style={{paddingHorizontal:5,paddingVertical:4,borderRadius:10}}
          className="w-10 h-10  items-center justify-center"
        >
          <Calendar size={20} color="#ffffff" />
        </LinearGradient>

        <View>
          <Text className="font-semibold">
            Examen National
          </Text>
          <Text className="text-xs text-muted-foreground">
            Compte à rebours
          </Text>
        </View>
      </View>

      {/* Days left */}
      <View className="flex-row items-end gap-2">
        <Text className="text-5xl font-bold text-primary">
          {daysLeft}
        </Text>
        <Text className="text-muted-foreground mb-2">jours</Text>
      </View>

      {/* Progress bar */}
      <View className="mt-4 h-2 bg-muted rounded-md overflow-hidden ">
        <LinearGradient
             colors={["#b0396b", "#58277f"]}
          className="w-full rounded-md h-2"
          style={{
            width: `${progress}%`,
            height:10,
            borderRadius:10
          }}
        />
      </View>
    </View>
  );
};

export default ExamanCount;
