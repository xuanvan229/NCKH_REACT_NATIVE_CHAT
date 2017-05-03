import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements'
import * as firebase from 'firebase';

export default class Info extends Component {
  constructor(props){
    super(props);
    this.state={
      allaccount:[

      ]
    }
  }
  componentDidMount(){
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const account = snapshot.val();
      if(account != null){
        this.setState({
          allaccount:account
        })
      }
    })
  }
  render() {
    var address;
    var email;
    var phone;
    var birthday;
    for(var i=0; i<this.state.allaccount.length;i++){
      if(this.props.targetUser==this.state.allaccount[i].username){
        address=this.state.allaccount[i].address;
        email=this.state.allaccount[i].email;
        phone=this.state.allaccount[i].phone;
        birthday=this.state.allaccount[i].birthday;
      }
    }
    return (
      <View>
          <View style={styles.row}>
            <Icon
            name='home'
            color='#fff' />
            <Text style={styles.text}>{address}</Text>
          </View>
          <View style={styles.row}>
            <Icon
            name='email'
            color='#fff' />
            <Text style={styles.text}>{email}</Text>
          </View>
          <View style={styles.row}>
            <Icon
            name='phone'
            color='#fff' />
            <Text style={styles.text}>{phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon
            name='cake'
            color='#fff' />
            <Text style={styles.text}>{birthday}</Text>
          </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  text: {
    color:'#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 20
  },
  row: {
    flexDirection:'row',
    alignItems:'center',
    marginTop: 20,
    marginLeft: 15
  }
})
