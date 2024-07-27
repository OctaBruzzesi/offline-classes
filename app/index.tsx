import { FlatList, Switch, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { Class } from '@/utils/classes'
import { useClasses } from '@/hooks/useClasses'
import { ThemedView } from '@/components/ThemedView'

export default function HomeScreen() {
  const [isOffline, setIsOffline] = useState(false)
  const { classes, loading } = useClasses(isOffline)

  const renderClassItem = ({ item }: { item: Class }) => (
    <Link
      href={{
        pathname: 'class-details',
        params: { name: item.title, classData: JSON.stringify(item) },
      }}
      asChild
    >
      <TouchableOpacity style={styles.classItem}>
        <ThemedText style={styles.classTitle}>{item.title}</ThemedText>
      </TouchableOpacity>
    </Link>
  )

  return (
    <SafeAreaView>
      <ThemedView style={styles.switchContainer}>
        <ThemedText>Offline</ThemedText>
        <Switch
          style={styles.switch}
          value={isOffline}
          onValueChange={setIsOffline}
        />
      </ThemedView>

      <FlatList
        data={classes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderClassItem}
      />

      {loading ? <ThemedText>Loading...</ThemedText> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  classItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  switchContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
  },
  switch: {
    marginLeft: 4,
  },
  classTitle: {
    fontSize: 18,
  },
})
