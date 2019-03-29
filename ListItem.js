import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Swipeout from 'react-native-swipeout';


class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.swipeoutBtns = [
      {
        text: 'EDIT',
        backgroundColor: '#2e8e23',
        type: 'edit',
        onPress: () => { this.props.onEdit(this.props.id); }
      },
      {
        text: 'DELETE',
        backgroundColor: '#f00',
        type: 'delete',
        onPress: () => { this.props.onDelete(this.props.id); }
      }
    ];
  }

    onPressItem = () => {
      console.log('sdfsdf');
    };


    render() {
      console.log(`[ListItem][render] index: ${this.props.index}`);
      return (
        <Swipeout
          right={this.swipeoutBtns}
          backgroundColor="#fff"
          close={!this.props.isSelected}
          onOpen={() => (this.props.onSwipeOpen(this.props.index))}
        >
          <TouchableHighlight
            style={styles.container}
            onPress={this.onPressItem}
            underlayColor="#d6d6d6"
          >

            <Text style={styles.text}> {this.props.title}</Text>
          </TouchableHighlight>
        </Swipeout>
      );
    }
}

const styles = StyleSheet.create({
  text: {

  },

  container: {
    margin: 8,
    height: 60,
    borderWidth: 1,
    borderColor: '#0008ff',
    borderRadius: 3
  }

});

export default ListItem;
