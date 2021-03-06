import React, { Component, PropTypes } from 'react';
import { View,
   Text,
   ScrollView,
   StyleSheet,
   TextInput,
   Image,
   Dimensions,
   TouchableHighlight,
   Navigator,
   FlatList,
   InteractionManager
 } from 'react-native';
 import ReactNative from 'react-native'
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase';
import { Icon, Button } from 'react-native-elements'
const window= Dimensions.get('window');
var srcimg='';
import NavJs from './nav.js'
export default class LOGIN extends Component {
  constructor(props){
    super(props);
    this.state={
      text:'',
      messages:[

      ],
      allaccount:[

      ],
      renderPlaceholderOnly:true

    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderPlaceholderOnly: false});
    });
    firebase.database().ref('allroom/'+this.props.id).on('value',(snapshot)=>{
      const yourmessage=snapshot.val();
      if(yourmessage !=null){
        this.setState({
          messages:yourmessage
        })
      }
    })
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const currentaccount=snapshot.val();
      if(currentaccount!=null){
        this.setState({
          allaccount:currentaccount
        })
      }
    })

  }
  _handlepress(){
    const nextms={
    id: this.state.messages.length,
    message:this.state.text,
    username:this.props.username,
    imgsrc:srcimg
  }

  firebase.database().ref('allroom/'+this.props.id+'/'+nextms.id).set(nextms);
  // this.refs['textInput1'].setNativeProps({text: ''});
    this.setState({
      text:''
    })
  }
  checkstyle(username){
    if(username==this.props.username){
      return {
        marginLeft:20,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:window.height*0.02,
        height:window.height*0.04,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#0084ff',
      }
    }
    else{
      return{
        marginLeft:20,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:window.height*0.02,
        height:window.height*0.04,
        paddingTop:5,
        paddingBottom:5,
        backgroundColor:'#f1f0f0',
      }
    }
  }
  scrollToInput(event, reactNode) {
    this.refs.scrollView.scrollToFocusedInput(event, reactNode)
  }
  checkstylechat(username){
    if(username==this.props.username){
      return{
        alignItems:'center',
        flexDirection:'row-reverse',
        height:window.height*0.05,
        marginTop:10,
      }
    }
    else {
      return{
        alignItems:'center',
        flexDirection:'row',
        height:window.height*0.05,
        marginTop:10,
      }
    }
  }
  checktext(username){
    if (username==this.props.username) {
      return{
        color:'white',
      }
    }
  }
  _renderItem=({item})=>{
    return(
      <View key={item.id} style={this.checkstylechat(item.username)}>
        <Image source={{uri:item.imgsrc}}
        style={styles.avatar}
        />
        <View style={this.checkstyle(item.username)}>
          <Text style={this.checktext(item.username)}>
          {item.message}
          </Text>
        </View>
      </View>
    )

  }
  _navigatebefore=()=>{
    this.props.navigator.pop();
  }

  render() {
    var nametarget;
    for(var i=0; i<this.state.allaccount.length;i++){
      if(this.props.targetUser==this.state.allaccount[i].username){
        nametarget=this.state.allaccount[i].fullname
      }
    }
    // var nametarget = this.state.allaccount.map((name,i)=>{
    //   if(this.props.targetUser==name.username){
    //     return name.fullname;
    //   }
    // })
    console.log(nametarget);
    if(this.state.renderPlaceholderOnly==true) return(
      <View style={{flex:1,backgroundColor:'white'}}>

      </View>
    )

    var i;
    for(i=0;i<this.state.allaccount.length;i++){
      if(this.props.username==this.state.allaccount[i].username){
          srcimg=this.state.allaccount[i].imgsrc
      }
    }
    return (
      <View style={styles.container}>
      <View style={styles.topnav}>
          <Button
              raised
              icon={{name: 'navigate-before', color: '#000'}}
              buttonStyle= {styles.navigatebefore}
              textStyle={styles.textnavigate}
              onPress={this._navigatebefore.bind(this)}
              underlayColor='#fff'
              color='#000'
              title='Home' />
          <Text style={styles.nametarget}>{nametarget}</Text>
          <Text style={styles.nametarget}></Text>
      </View>
      <FlatList
        data={this.state.messages}
        renderItem={this._renderItem}
        keyExtractor={item=>item.id}
      />
      <View style={styles.bottom}>
          <TextInput style={styles.username} ref='input1' 
          underlineColorAndroid='#ff8b8b'
          placeholderTextColor='#ff8b8b'
          defaultValue={this.state.text}
          onChangeText={(text) => this.setState({text})}
          placeholder="type your message">
          </TextInput>
          <Icon
            name='send'
            color='#ff0000'
            style={styles.submit}
            onPress={this._handlepress.bind(this)}
            size={25} />

      </View>

      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  listchat:{
    flex:0.92,
  },
  nametarget:{
    width:window.width*0.5,
    textAlign:'center',
    color:'#0084ff'
  },
  topnav:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  navigatebefore:{
    width: window.width*0.2,
    backgroundColor:'white',
    marginLeft:0,
    shadowColor: '#fff'
  },
  textnavigate:{
    color:'#000'
  },
  chat:{
    alignItems:'center',
    flexDirection:'row',
    height:window.height*0.05,
    marginTop:10,
  },
  bottom:{
    flexDirection:'row',
    borderWidth:1,
  },

  chatright:{
    marginLeft:20,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:window.height*0.02,
    height:window.height*0.04,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'pink',
  },
  mychat:{
    marginLeft:20,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:window.height*0.02,
    height:window.height*0.04,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'red',
  },
  avatar:{
     width:window.height*0.04,
     height:window.height*0.04,
     borderRadius:window.height*0.02,
   },
  submit:{
    width:window.width*0.1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e88565',
  },
  username:{
    width: window.width*0.9,
    height: window.height*0.08,
  },
})
