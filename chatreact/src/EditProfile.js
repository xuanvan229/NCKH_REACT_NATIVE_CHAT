import React, { Component, PropTypes } from 'react';
import { View,
  Text,
  TouchableHighlight,
  Navigator,
  StyleSheet,
  Image,
  Dimensions,
  TextInput


 } from 'react-native';
import * as firebase from 'firebase';
import { Icon,Button } from 'react-native-elements'
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import { Kaede,Akira } from 'react-native-textinput-effects';
const window= Dimensions.get('window');
var acc=[];

export default class EditProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      allaccount:[

      ],
      youraccount:[

      ],
      fullname:'',
      password:'',
      email:'',
      address:'',
      phone:''
    }
  }
  componentDidMount(){
    firebase.database().ref('username/').on('value',(snapshot)=>{
      const currentaccount=snapshot.val();
      if(currentaccount != null){
        this.setState({
          allaccount:currentaccount
        })
      }
    })
  }
  _navigatebefore=()=>{
    this.props.navigator.pop();
  }
  _onPress(){
    const update={
      id:acc.id,
      imgsrc:acc.imgsrc,
      username:acc.username,
      password:acc.password,
      fullname:this.state.fullname,
      address:this.state.address,
      email:this.state.email,
      phone:this.state.phone
    }
    firebase.database().ref('username/'+update.id).set(update);
    this.props.navigator.push({
      id:5,
      passProps:{
        username:this.props.username
      }
    })
  }
  render(){
    var i;
    for(i=0;i<this.state.allaccount.length;i++){
      if(this.props.username==this.state.allaccount[i].username)
        acc=this.state.allaccount[i];
    }
    console.log(this.state.fullname);
    return(
      <Image style={styles.background}
      source={require('./bg.jpg')}
          >
                <View style={styles.header}>
                <Button
                    raised
                    icon={{name: 'navigate-before', color: '#E8175D'}}
                    buttonStyle= {styles.navigatebefore}
                    textStyle={styles.textnavigate}
                    onPress={this._navigatebefore.bind(this)}
                    underlayColor='#E8175D'
                    color='#E8175D'
                    title='Home' />
                <TouchableHighlight onPress={this._onPress.bind(this)}>
                <View>
                <Icon
                name='mode-edit'
                color='#00aced' />
                </View>
                </TouchableHighlight>
                </View>
                <View style={styles.centeruser}>
                      <Image source={{uri:acc.imgsrc}}
                      style={styles.avatar}
                      />
                </View>
                <View>
                      <View style={styles.onechoose1}>
                          <Akira
                          label={'Fullname'}
                          inputStyle={{color:'white'}}
                          onChangeText={(fullname)=>this.setState({fullname})}
                          // this is used as active and passive border color
                          borderColor={'#E8175D'}
                          labelStyle={{ color: '#E8175D' }}
                        />
                        <Akira
                        label={'Email'}
                        inputStyle={{color:'white'}}
                        onChangeText={(email)=>this.setState({email})}
                        // this is used as active and passive border color
                        borderColor={'#E8175D'}
                        labelStyle={{ color: '#E8175D' }}
                      />
                      <Akira
                      label={'Address'}
                      inputStyle={{color:'white'}}
                      onChangeText={(address)=>this.setState({address})}
                      // this is used as active and passive border color
                      borderColor={'#E8175D'}
                      labelStyle={{ color: '#E8175D' }}
                    />
                    <Akira
                    label={'Phone'}
                    inputStyle={{color:'white'}}
                    onChangeText={(phone)=>this.setState({phone})}
                    // this is used as active and passive border color
                    borderColor={'#E8175D'}
                    labelStyle={{ color: '#E8175D' }}
                  />
                      </View>
                </View>
          </Image>
    )
  }
}
const styles= StyleSheet.create({
  background:{
    flex:1,
    resizeMode: 'cover',
    width:window.width*1,
    height:window.height*1,
    alignItems:'center',
    backgroundColor:'#fff'
  },
  navigatebefore:{
    width: window.width*0.2,
    backgroundColor:'rgba(0,0,0,0)',
    marginLeft:0,
    shadowColor: 'rgba(0,0,0,0)'
  },
  username:{
    color:"#fff",
    fontSize:25,
  },
  username2:{
    color:"#fff",
    fontSize:25,
  },
  username3:{
    color:"#fff",
    fontSize:25,

  },
  onechoose:{
    flexDirection:'row',
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems:'center',

  },
  onechoose1:{
    paddingTop: 30,
    flexDirection:'column',
    width:window.width*0.6,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent:'center',
    height:window.height*0.6,
  },
  header:{
    width:window.width*1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:window.height*0.04,
  },
  fullname:{
    width:window.width*0.5,
    height:window.height*0.1,
    borderWidth:1,
    borderColor: '#fff',
    color:"#fff",
    borderRadius: window.height*0.05
  },
  name:{
    fontSize:40,
    color:"#fff",
    top:window.height*0.1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  centeruser:{
    alignItems:'center',
  },
   avatar:{
      width:window.height*0.2,
      height:window.height*0.2,
      borderRadius:window.height*0.1,
    },

})
