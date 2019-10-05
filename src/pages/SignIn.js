import React, { Component } from 'react'
import { View, Image, ScrollView, StyleSheet, Alert, AsyncStorage, ActivityIndicator} from 'react-native'
import { Toast } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { isEmail } from '../services/validator.service'
import axios from 'axios';
import DialogInput from 'react-native-dialog-input';
import {
        Button,
        Text,
        Item,
        Input,
        Icon,
        Spinner,
} from 'native-base'

const ErrorMessage = props => {
  if(props.error){
    return (
      <Text style={ style.input__error}>
       — {props.error}
      </Text>
    )
  }

  return null
}

const Loading = props => {
  if(props.isLoading){
    return (
      <View style={style.load}>
        <Spinner color='#FFFFFF' />
      </View>
    )
  }

  return null
}

const emailIcon = error => {
  if(error === undefined ) return 'email'
  if(error) return 'error'
  if(!error) return 'check'
}

class SignIn extends Component {
  constructor(){
    super()

    this.state = {
      securePass: true,
      loading: false,

      // Email
      emailValue: undefined,
      emailError: undefined,

      // Password
      passwordValue: undefined,
      passwordError: undefined,

      showRecoverPassDialogue: false,

      isLoading: false,

      version: null
    }
  }

  componentDidMount() {

  }

  async componentWillMount() {

  }

    saveSession = async (email, token) => {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('token', token)
    }

    renderButton() {
      if(this.state.isLoading)
        return <ActivityIndicator size="large" color="black" style={style.submit}/>

      return(
        <Button
            dark
            full
            rounded
            style={{marginTop: 10}}
            onPress={() => {this.tryLogin()}}>
            <Text> Sign In </Text>
        </Button>
      )
    }

    renderMessage(title, message) {
        Alert.alert(
            title,
            message,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }

  async tryLogin() {
      // const { emailValue, passwordValue } = this.state;

      // this.setState({ isLoading:true })

      // let data = {
      //   login: emailValue,
      //   senha: passwordValue
      // }

      // await axios({
      //     method: 'post',
      //     url: 'http://ENDPOINT/authenticate',
      //     data: data,
      //     timeout: 6000
      // })
      // .then(response => {
      //     const { token } = response.data;
      //     this.setState({ isLoading:false })
      //     if(token == 0) {
      //         this.renderMessage(
      //             "Faile!",
      //             "E-mail or password incorrect."
      //         );
      //     }
      //     else if (token == -1) {
      //         this.renderMessage(
      //           "Fail",
      //           "Acount banned"
      //         )
      //     }
      //     else {
      //         this.saveSession(emailValue, token)
      //         this.props.navigation.replace('Home', {
      //             email: emailValue,
      //             token,
      //         })
      //     }
      // })
      // .catch(err => {
      //     this.setState({ isLoading:false })
      //     this.renderMessage(
      //         "Fail",
      //         "Verify your network connection and try again"
      //     )
      // })

      this.props.navigation.replace('Home', {
          // email: emailValue,
          // token,
      })
  }

  showPass(){
    this.setState({
      securePass: !this.state.securePass
    })
  }

  emailBlur(){
    const {emailValue} = this.state

    if(emailValue && isEmail(emailValue)){
      this.setState({ emailError: false })
    }

    if(emailValue && !isEmail(emailValue)){
      this.setState({ emailError: 'Email inválido' })
    }
  }

  emailChange(text){
    this.setState({
      emailValue: text,
      emailError: undefined
    })
  }

  passwordChange(text){
    this.setState({
      passwordValue: text,
      passwordError: undefined
    })
  }

  async recoverPass(email) {
    // let data = {
    //   email
    // }

    // await axios({
    //     method: 'post',
    //     url: 'http://ENDPOINT/recoverpassword',
    //     data: data,
    //     timeout: 6000
    // })
    // .then(response => {
    //     
    // })
    // .catch(err => {
    //   
    //     })
    // })
  }

  render(){
    const {
      emailError,
      passwordError,
      securePass
    } = this.state

    return(
      <LinearGradient
        colors={['#ccccff', '#4c4cff']}
        style={style.wrapper}>

        <DialogInput isDialogVisible={this.state.showRecoverPassDialogue}
          title={"E-mail"}
          message={"Enter your e-mail to reset your password"}
          hintInput={"E-mail"}
          cancelText={"CANCEL"}
          submitText={"CONFIRM"}
          dialogStyle={{marginBottom: 200}}
          submitInput={ (inputText) => {this.recoverPass(inputText)} }
          closeDialog={ () => {this.setState({ showRecoverPassDialogue:false })}}>
        </DialogInput>
        
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={style.scroll}>
          
          <View style={style.content}>

            <Image
              style={style.logo}
              source={require('../imgs/splash.png')}/>

            <View style={style.block}>
              <Text style={style.welcome}>
                Welcome to MyApp!
              </Text>

              <Item style={style.item} regular>
                <Icon 
                  style={style.input__icon(emailError)}
                  name={emailIcon(emailError)}
                  type="MaterialIcons"/>

                <Input
                  onChangeText={(text) => this.emailChange(text)}
                  onBlur={() => {this.emailBlur()}}
                  keyboardType='email-address'
                  autoCapitalize = 'none'
                  style={style.input}
                  placeholder="E-mail"/>
              </Item>

              <ErrorMessage error={emailError} />
                    
              <Item style={style.item} regular>
                <Icon
                  style={style.input__icon(passwordError)}
                  name={passwordError ? 'error' : 'vpn-key'}
                  type="MaterialIcons"/>

                <Input
                  onChangeText={(text) => this.passwordChange(text)}
                  style={style.input}
                  autoCapitalize = 'none'
                  secureTextEntry={securePass}
                  placeholder="Password"/>

                <Icon
                  onPress={() => {this.showPass()}}
                  style={style.seePass(!this.state.securePass)}
                  name="remove-red-eye"
                  type="MaterialIcons"/>
              </Item>

              <ErrorMessage error={passwordError} />

              {this.renderButton()}

              <Text style={style.recover} onPress={() => {this.setState({ showRecoverPassDialogue:true })}}> 
                I forgot my password
              </Text>

              <Text style={style.hack}>
                _______________________________________________________________________________
              </Text>
            </View>

          </View>
        </ScrollView>
        <View style={{alignItems: 'center'}}>
          <View><Text style={style.credits}>mayapp.com.br</Text></View>
          {/* <View><Text style={style.credits}>{this.state.version}</Text></View> */}
        </View>
        <Loading isLoading={this.state.loading}> </Loading>

      </LinearGradient>
    )
  }
}

export default SignIn

const style = StyleSheet.create({
    scroll: {
      alignSelf: 'stretch',
    },
  
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    content: {
      flex: 1,
      paddingTop: 50,
      paddingBottom: 10,
      paddingHorizontal: 20,
      alignItems: 'center'
    },
  
    logo: {
      height: 150,
      // resizeMode: 'contain',
      marginTop: 10,
      marginBottom: 25
    },
  
    welcome:{
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 35,
      color: '#FFFFFF'
    },
  
    block:{
      alignSelf: 'stretch',
      maxWidth: 450,
      marginLeft: 'auto',
      marginRight: 'auto',
      overflow: 'hidden',
      borderRadius: 3
    },
  
    item: {
      marginBottom: 15,
      backgroundColor: "#FFFFFF",
      borderColor: "#FFFFFF",
      borderRadius: 3
    },
  
    input__error:{
      marginTop: -10,
      marginBottom: 15,
      color: '#FFFFFF',
    },
  
    input__icon: (error = undefined) => {
      if(error === undefined) return {color: '#B3B3B3'}
      if(error) return {color: '#EA1E23'}
      if(!error) return {color: '#00B94F'}
    },
  
    seePass: (active = false) => {
      if(active) return {color: '#0085FF'}
      return {color: '#B3B3B3'}
    },
  
    recover:{
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 5,
      textDecorationLine: 'underline'
    },
  
    hack: {
      textAlign: 'center',
      lineHeight: 0
    },
  
    credits: {
      marginBottom: 5,
      fontSize: 13,
      color: '#fff',
    },
  
    load: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      alignSelf: 'stretch',
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      top: 0
    },
    version: {
        marginBottom: 5,
        fontSize: 13,
        color: 'black',
    },
  })
