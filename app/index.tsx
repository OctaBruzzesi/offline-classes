import { FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { Class, fetchClasses } from '@/utils/classes'

export default function HomeScreen() {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getClasses = async () => {
      try {
        const classes = await fetchClasses()
        setClasses(classes)
        setLoading(false)
      } catch (e) {
        console.error('Error fetching classes:', e)
        setLoading(false)
      }
    }

    getClasses()
  }, [])

  if (loading) {
    return <ThemedText>Loading...</ThemedText>
  }

  const renderClassItem = ({ item }: { item: Class }) => (
    <Link
      href={{ pathname: 'class-details', params: { name: item.title } }}
      asChild
    >
      <TouchableOpacity style={styles.classItem}>
        <ThemedText style={styles.classTitle}>{item.title}</ThemedText>
      </TouchableOpacity>
    </Link>
  )

  return (
    <SafeAreaView>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderClassItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  classItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  classTitle: {
    fontSize: 18,
  },
})
