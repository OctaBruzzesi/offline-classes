import AsyncStorage from '@react-native-async-storage/async-storage'

type Video = {
  id: number
  title: string
  url: string
}

export type Class = {
  id: number
  title: string
  video: Video
  questions: {
    id: number
    text: string
    answers: {
      id: number
      text: string
      isCorrect: boolean
    }[]
  }[]
  isDownloaded?: boolean
}

export class NetworkError {}

const mockClasses: Class[] = [
  {
    id: 1,
    title: 'Introduction to React Native',
    video: {
      id: 111,
      title: 'Setting up your environment',
      url: 'https://videos.pexels.com/video-files/26811242/12011463_1920_1080_50fps.mp4',
    },
    questions: [
      {
        id: 121,
        text: 'What is the command to create a new React Native project?',
        answers: [
          { id: 301, text: 'npx react-native init MyApp', isCorrect: true },
          { id: 302, text: 'create-react-native-app MyApp', isCorrect: false },
          { id: 303, text: 'npm init react-native MyApp', isCorrect: false },
        ],
      },
      {
        id: 202,
        text: 'Which component is used to create a scrollable list in React Native?',
        answers: [
          { id: 304, text: 'ScrollView', isCorrect: false },
          { id: 305, text: 'FlatList', isCorrect: true },
          { id: 306, text: 'ListView', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'State Management in React Native',
    video: {
      id: 103,
      title: 'Understanding React hooks',
      url: 'https://videos.pexels.com/video-files/19636643/19636643-uhd_2560_1440_30fps.mp4',
    },
    questions: [
      {
        id: 203,
        text: 'Which hook is used to add state to functional components?',
        answers: [
          { id: 307, text: 'useEffect', isCorrect: false },
          { id: 308, text: 'useState', isCorrect: true },
          { id: 309, text: 'useContext', isCorrect: false },
        ],
      },
      {
        id: 204,
        text: 'What is the main purpose of Redux?',
        answers: [
          { id: 310, text: 'To manage component lifecycle', isCorrect: false },
          {
            id: 311,
            text: 'To handle routing in React Native',
            isCorrect: false,
          },
          {
            id: 312,
            text: 'To manage global state in an application',
            isCorrect: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Colors',
    video: {
      id: 103,
      title: 'An essay about colors',
      url: 'https://videos.pexels.com/video-files/26547629/11958122_1920_1080_24fps.mp4',
    },
    questions: [
      {
        id: 1,
        text: 'Which of the following is a primary color?',
        answers: [
          { id: 313, text: 'Green', isCorrect: false },
          { id: 314, text: 'Purple', isCorrect: false },
          { id: 315, text: 'Blue', isCorrect: true },
          { id: 316, text: 'Orange', isCorrect: false },
        ],
      },
      {
        id: 2,
        text: 'What color is the opposite of red?',
        answers: [
          { id: 317, text: 'Red', isCorrect: false },
          { id: 318, text: 'Green', isCorrect: true },
          { id: 319, text: 'Purple', isCorrect: false },
          { id: 320, text: 'Brown', isCorrect: false },
        ],
      },
      {
        id: 3,
        text: 'Which color is traditionally associated with royalty?',
        answers: [
          { id: 321, text: 'Green', isCorrect: false },
          { id: 322, text: 'Red', isCorrect: false },
          { id: 323, text: 'Blue', isCorrect: false },
          { id: 324, text: 'Purple', isCorrect: true },
        ],
      },
    ],
  },
]

export const fetchClasses = (isOffline: boolean) => {
  if (isOffline) {
    throw new NetworkError()
  }

  return new Promise<Class[]>((resolve) => {
    setTimeout(() => {
      resolve(mockClasses)
    }, 1000)
  })
}

export const getDownloadedClasses = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()

    const classKeys = keys.filter((key) => key.startsWith('class'))
    const classesData = await AsyncStorage.multiGet(classKeys)
    const downloadedClasses = classesData.reduce<Class[]>((prevValue, data) => {
      const value = data[1]

      // If data is missing, ommit this item
      if (!value) {
        return prevValue
      }

      const parsedData = JSON.parse(value)

      return [...prevValue, { ...parsedData, isDownloaded: true }]
    }, [])

    return downloadedClasses
  } catch (e) {
    console.error('Error retrieving local classes', e)

    return []
  }
}
