import { useState, useEffect } from 'react'
import {
  Class,
  NetworkError,
  fetchClasses,
  getDownloadedClasses,
} from '@/utils/classes'
// import { getNetworkStateAsync } from 'expo-network'

const getClasses = async (isOffline: boolean) => {
  try {
    // Fetch classes from server
    const classes = await fetchClasses(isOffline)

    return classes
  } catch (e) {
    // No internet, get data from local storage
    if (e instanceof NetworkError) {
      console.log('No internet connection. Returning stored classes')

      return getDownloadedClasses()
    }

    console.error('Unknown error getting classes', e)

    return []
  }
}

export const useClasses = (isOffline: boolean) => {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getClassesData = async () => {
      try {
        setLoading(true)
        // const network = await getNetworkStateAsync()
        const classes = await getClasses(isOffline)

        setClasses(classes)
        setLoading(false)
      } catch (e) {
        console.error('Error fetching classes:', e)
        setLoading(false)
      }
    }

    getClassesData()
  }, [isOffline])

  return { classes, loading }
}
