import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ListView,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Keyboard
} from 'react-native';

/*class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
      </View>
    );
  }
}*/

export default class AwesomeProject_9 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      note: '',
      lang: 'eng',
      isLoading: true
    };
  }

  _keyExtractor = (item, index) => item.word + item.lang + index;

  _stringCapFirst = (words) => words.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');

  _updateWord = (word, note) => {

      fetch('https://pddivine.com/cicada/words', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          words: [ word.toLowerCase() ],
          lang: 'eng',
          notes: note
        })
      })
      .then((responseJson) => {
        if (responseJson.status !== 200) {
          throw responseJson.status;
        }
        this._getWords();
      })
      .catch((error) => {
        alert('Something went wrong', error);
      });
  }

  _getWords() {
    return fetch('https://pddivine.com/cicada/words') // Note: need to configure https for www.
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          words: responseJson
        }, function() {
          this.setState({text: '', note: '', lang: 'eng'})
        });
      })
      .catch((error) => {
        console.log('fetch err', error);
      });

  }

  componentDidMount() {
    this._getWords();

  }
  
  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    // let pic = {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    // };

    console.log('Boom!')

      {/*<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! ios
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <LotsOfGreetings />
      </View>*/}


          {/*<ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.title}, {rowData.releaseYear}</Text>}
          />*/}
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue', justifyContent: 'center', alignItems: 'center'}}> 
          <Text style={{ fontWeight: 'bold' }}>Cicada!</Text>
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            autoCapitalize = 'words'
            returnKeyType = "next"
            placeholder="Enter New Word"
            style={{ width: '90%', textAlign: 'center' }}
            onChangeText={(text) => { 
              this.setState({text})
            }}
            onSubmitEditing={() => {
              this.refs.note_input.focus(); 
            }}
            value={ this.state.text }
          />
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            ref='note_input'
            autoCapitalize = 'sentences'
            returnKeyType = "done"
            placeholder="Enter Note"
            style={{ width: '90%', textAlign: 'center' }}
            onChangeText={(note) => { 
              this.setState({note})
            }}
            onSubmitEditing={() => { 
              this._updateWord(this.state.text, this.state.note);
            }}
            value={ this.state.note }
          />
        </View>
        <View style={{flex: 7, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center'}}>
          <FlatList
            data={this.state.words}
            style={{ padding: 10 }}
            renderItem={({item}) => 
              <Text>
                <Text  style={{fontWeight: 'bold'}}>
                  {this._stringCapFirst(item.word)}
                </Text>
                <Text>, {item.lang.toUpperCase()}, {item.notes.join('; ')}
                </Text>
              </Text>}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('cicada_clients_rn', () => AwesomeProject_9);
