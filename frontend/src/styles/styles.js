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
});
