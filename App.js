import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import Expo from 'expo';
import uuidv4 from 'uuid/v4';
import ListItem from './ListItem';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        // Samples
        { id: uuidv4(), title: '1' },
        { id: uuidv4(), title: '2' },
        { id: uuidv4(), title: '3' }
      ],
      text: '',
      isEditing: false,
      selected: null
    };
  }

  onSwipeOpen = rowIndex => {
    console.log(`onSwipeOpen: ${rowIndex}`);
    this.setState({
      selected: rowIndex
    });
  };

  onEdit = id => {
    console.log(`[editItem] id: ${id}}`);

    const editingItem = this.state.items.find(item => item.id === id);

    this.setState({
      text: editingItem.title,
      isEditing: true
    });
  };

  onDelete = id => {
    const newItems = this.state.items.filter(item => item.id !== id);
    console.log(`[onDelete] newItems: ${newItems}}`);
    this.setState({
      items: newItems,
      selected: null
    });
  };

  editItem = () => {
    const { selected } = this.state;
    console.log(`[editItem] selected: ${selected}}`);

    const newItems = [...this.state.items];
    newItems[selected] = {
      id: this.state.items[selected].id,
      title: this.state.text
    };

    this.setState({
      items: newItems,
      text: '',
      selected: null,
      isEditing: false
    });

    Keyboard.dismiss();
  };

  addItem = () => {
    this.setState({
      items: [...this.state.items, { id: uuidv4(), title: this.state.text }],
      text: ''
    });

    Keyboard.dismiss();
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.items}
          renderItem={({ item, index }) => (
            <ListItem
              id={item.id}
              title={item.title}
              onEdit={this.onEdit}
              onDelete={this.onDelete}
              onSwipeOpen={this.onSwipeOpen}
              index={index}
              isSelected={this.state.selected === index}
            />
          )}
          keyExtractor={item => item.id}
          extraData={this.state.isSelected}
        />

        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior="padding"
          keyboardVerticalOffset={Expo.Constants.statusBarHeight}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Add todo here..."
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <View style={styles.buttonContainer}>
            {this.state.isEditing ? (
              <Button
                title="Update"
                onPress={this.editItem}
                disabled={!this.state.text}
              />
            ) : (
              <Button
                title="Add item"
                onPress={this.addItem}
                disabled={!this.state.text}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: Expo.Constants.statusBarHeight
  },
  keyboardAvoidingView: {
    borderTopWidth: 1,
    borderTopColor: '#c9c9c9'
  },
  textInput: {
    height: 40,
    margin: 8,
    paddingLeft: 4,
    paddingRight: 4
  },
  buttonContainer: {
    padding: 8
  }
});
