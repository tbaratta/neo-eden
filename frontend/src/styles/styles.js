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
    }
});
