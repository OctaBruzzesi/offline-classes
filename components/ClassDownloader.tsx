import { useState, useEffect } from 'react'
import { View, Text, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import { Class } from '@/utils/classes'

type ClassDownloaderProps = {
  classData: Class
}

export const ClassDownloader = ({ classData }: ClassDownloaderProps) => {
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  useEffect(() => {
    const validateIfDownloaded = async () => {
      try {
        const downloadedData = await AsyncStorage.getItem(
          `class_${classData.id}`
        )
        setIsDownloaded(!!downloadedData)
      } catch (error) {
        console.error('Error checking downloaded status:', error)
      }
    }

    validateIfDownloaded()
  }, [])

  const downloadClass = async () => {
    try {
      // Download video
      const videoFileName = `video_${classData.video.id}.mp4`
      const videoFileUri = FileSystem.documentDirectory + videoFileName

      const downloadResumable = FileSystem.createDownloadResumable(
        classData.video.url,
        videoFileUri,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite
          setDownloadProgress(progress)
        }
      )

      const download = await downloadResumable.downloadAsync()

      if (!download) {
        return
      }

      const { uri } = download

      // Prepare data for storage
      const offlineData = {
        ...classData,
        video: {
          ...classData.video,
          url: uri,
        },
      }

      // Store data in AsyncStorage
      await AsyncStorage.setItem(
        `class_${classData.id}`,
        JSON.stringify(offlineData)
      )

      setIsDownloaded(true)
    } catch (error) {
      console.error('Error downloading class:', error)
      Alert.alert('Error', 'Failed to download class. Please try again.')
    }
  }

  const deleteDownloadedClass = async () => {
    try {
      // Remove data from AsyncStorage
      await AsyncStorage.removeItem(`class_${classData.id}`)

      // Delete video file
      const videoFileName = `video_${classData.video.id}.mp4`
      const videoFileUri = `${FileSystem.documentDirectory}${videoFileName}`
      await FileSystem.deleteAsync(videoFileUri)

      setIsDownloaded(false)
      setDownloadProgress(0)
    } catch (error) {
      console.error('Error deleting downloaded class:', error)
    }
  }

  return (
    <View>
      {isDownloaded ? (
        <Button
          title="Delete Downloaded Class"
          onPress={deleteDownloadedClass}
        />
      ) : (
        <View>
          <Button title="Download for Offline Use" onPress={downloadClass} />
          {downloadProgress > 0 ? (
            <Text>
              Download Progress: {(downloadProgress * 100).toFixed(2)}%
            </Text>
          ) : null}
        </View>
      )}
    </View>
  )
}
