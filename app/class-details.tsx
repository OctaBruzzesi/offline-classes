import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { Class } from '@/utils/classes'

const ClassDetails = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({})
  const [showResults, setShowResults] = useState(false)
  const { classData: rawClassData } = useLocalSearchParams()

  if (typeof rawClassData !== 'string') {
    return <ThemedText>Error on class data</ThemedText>
  }

  const classData: Class = JSON.parse(rawClassData)

  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }))
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const renderQuestion = (question: Class['questions'][0]) => {
    return (
      <View key={question.id} style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.answers.map((answer) => (
          <TouchableOpacity
            key={answer.id}
            style={[
              styles.answerButton,
              selectedAnswers[question.id] === answer.id &&
                styles.selectedAnswer,
              showResults && answer.isCorrect && styles.correctAnswer,
              showResults &&
                !answer.isCorrect &&
                selectedAnswers[question.id] === answer.id &&
                styles.incorrectAnswer,
            ]}
            onPress={() => handleAnswerSelect(question.id, answer.id)}
            disabled={showResults}
          >
            <Text style={styles.answerText}>{answer.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView edges={{ top: 'off', bottom: 'maximum' }}>
        <Text style={styles.title}>{classData.title}</Text>

        <Video
          source={{ uri: classData.video.url }}
          isMuted
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          useNativeControls
          style={styles.video}
        />

        <Text style={styles.videoTitle}>{classData.video.title}</Text>

        {classData.questions.map(renderQuestion)}

        {!showResults && (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Answers</Text>
          </TouchableOpacity>
        )}

        {showResults && (
          <Text style={styles.resultsText}>
            You got{' '}
            {
              classData.questions.filter(
                (q) =>
                  q.answers.find((a) => a.id === selectedAnswers[q.id])
                    ?.isCorrect
              ).length
            }{' '}
            out of {classData.questions.length} correct!
          </Text>
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answerButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedAnswer: {
    backgroundColor: '#add8e6',
  },
  correctAnswer: {
    backgroundColor: '#90ee90',
  },
  incorrectAnswer: {
    backgroundColor: '#ffcccb',
  },
  answerText: {
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
})

export default ClassDetails
