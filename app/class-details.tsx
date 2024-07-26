import { ThemedText } from '@/components/ThemedText'
import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native'

const ClassDetails = () => {
  const { name } = useLocalSearchParams()
  const title = Array.isArray(name) ? name[0] : name

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title }} />
      <ThemedText>Class</ThemedText>
    </SafeAreaView>
  )
}

export default ClassDetails
