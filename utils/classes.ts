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
}

const mockClasses: Class[] = [
  {
    id: 1,
    title: 'Introduction to React Native',
    video: {
      id: 101,
      title: 'Setting up your environment',
      url: 'https://videos.pexels.com/video-files/26811242/12011463_1920_1080_50fps.mp4',
    },
    questions: [
      {
        id: 201,
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
      url: 'https://videos.pexels.com/video-files/3321011/3321011-hd_1920_1080_30fps.mp4',
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
      url: 'https://videos.pexels.com/video-files/10968936/10968936-uhd_2560_1440_30fps.mp4',
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
]

export const fetchClasses = () => {
  return new Promise<Class[]>((resolve) => {
    setTimeout(() => {
      resolve(mockClasses)
    }, 1000)
  })
}
