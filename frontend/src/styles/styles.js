import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4522',
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  searchText: {
    color: 'gray',
  },
  mapPlaceholder: {
    backgroundColor: '#5B4322',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#4A4522',
    padding: 20,
  },
  messageBubble: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#ff9900',
    padding: 15,
    borderRadius: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1, // Stretch to fill available space
    backgroundColor: '#5B4322',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
  },
  searchInput: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
    container: {
      flex: 1,
      backgroundColor: '#49441f',
      paddingTop: 40,
      paddingHorizontal: 16,
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 16,
      textAlign: 'center',
    },
    filterRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      marginBottom: 12,
    },
    filterButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: '#2b2b2b',
      borderRadius: 6,
    },
    activeFilter: {
      backgroundColor: '#ffcc00',
    },
    filterText: {
      color: '#fff',
      fontWeight: '600',
    },
    submitButton: {
      backgroundColor: '#2b2b2b',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignSelf: 'center',
      marginBottom: 16,
    },
    submitButtonText: {
      color: '#ffcc00',
      fontWeight: '600',
      fontSize: 14,
    },
    listPadding: {
      paddingBottom: 16,
    },
    alertWrapper: {
      paddingHorizontal: 8,
    },
    alertCard: {
      backgroundColor: '#2b2b2b',
      padding: 16,
      borderRadius: 8,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#ffcc00',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      marginBottom: 4,
    },
    meta: {
      color: '#ddd',
      fontSize: 14,
    },
    distanceText: {
      color: '#ccc',
      fontSize: 13,
      marginTop: 2,
    },
    timestamp: {
      color: '#bbb',
      fontSize: 12,
      marginTop: 4,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    backArrow: {
      color: '#fff',
      fontSize: 24,
    },
    title: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
    },
    icon: {
      color: '#fff',
      fontSize: 22,
    },
    chatArea: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 30,
      borderWidth: 2,
      borderColor: '#9C5DFF',
      marginBottom: 20,
    },
    chatContent: {
      padding: 15,
    },
    messageBubble: {
      maxWidth: '80%',
      padding: 12,
      borderRadius: 20,
      marginVertical: 5,
    },
    userMessage: {
      backgroundColor: '#9C5DFF',
      alignSelf: 'flex-end',
    },
    aiMessage: {
      backgroundColor: '#F0F0F0',
      alignSelf: 'flex-start',
    },
    errorMessage: {
      backgroundColor: '#FFE5E5',
    },
    loadingMessage: {
      backgroundColor: '#F8F8F8',
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    loadingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    loadingText: {
      color: '#666',
      fontSize: 16,
    },
    messageText: {
      fontSize: 16,
      color: '#000',
    },
    userMessageText: {
      color: '#fff',
    },
    errorText: {
      color: '#FF0000',
    },
    inputArea: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 50,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#000',
    },
    sendIcon: {
      fontSize: 20,
      color: '#9C5DFF',
    },
    sendIconDisabled: {
      opacity: 0.5,
    },
    sendButton: {
      padding: 8,
    }
});
