import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
  } from 'react-native-fbsdk';
  import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends React.Component {

constructor(){
    super();
    this.state={
        emailError:'',
        email:'',
        password:'',
        passwordError:''
    }
}

    handleChange=async()=>{
        const {email,password}=this.state
        if(!/\S+@\S+\.\S+/.test(email) && password.length < 6){
return null
        }else{
             
                try {
                  await AsyncStorage.setItem("user", JSON.stringify(email));
            console.log('sucess')
                } catch (error) {
                  console.log(error);
                }
              };
            this.props.navigation.navigate('Products')
        

    }



  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({userInfo: result});
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  validateEmail = () => {
    const { email } = this.state;
    if (!email) {
      this.setState({ emailError: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      this.setState({ emailError: 'Invalid email format' });
    } else {
      this.setState({ emailError: '' });
    }
  }

  validatePassword = () => {
    const { password } = this.state;
    if (!password) {
      this.setState({ passwordError: 'Password is required' });
    } else if (password.length < 6) {
      this.setState({ passwordError: 'Password must be at least 8 characters long' });
    } else {
      this.setState({ passwordError: '' });
    }
  }
  render(): React.ReactNode {
    return (
      <View style={styles.mainContainer}>
        <Text style={{color:'#ffffff',marginLeft:30, fontSize:35, fontWeight:'600',marginBottom:15}}>Login</Text>
        <View style={styles.miniContainer}>
            <View style={{margin:10}}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={'#ff8b24'}
            style={styles.input}
            onChangeText={(text) => this.setState({ email: text })}
        onBlur={this.validateEmail}
          />
           {this.state.emailError ? <Text style={{ color: 'red' }}>{this.state.emailError}</Text> : null}
           <TextInput
            placeholder="Password"
            placeholderTextColor={'#ff8b24'}
            style={styles.input}
            onChangeText={(text) => this.setState({ password: text })}
        onBlur={this.validateEmail}
          />
          <TouchableOpacity style={styles.submitbutton} onPress={this.handleChange}>
            <Text style={{color:'#ffffff', fontSize:15,fontWeight:'500'}}>SUBMIT</Text>
          </TouchableOpacity>
          </View>
          <View style={{alignItems:'center'}}>
          <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken.toString();
                this.getInfoFromToken(accessToken);
              });
            }
          }}
          onLogoutFinished={() => this.setState({userInfo: {}})}
        />
          </View>
        </View>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#ff8b24',
    height: '100%',
    justifyContent:'center'
  },
  submitbutton: {
    backgroundColor: '#ff8b24',
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ffffffaa',
    fontSize:15,
    borderRadius:10,
    marginBottom:20
  },
  miniContainer: {
    marginHorizontal: 20,
    backgroundColor:'#ffffffaa',
    height:270,
    justifyContent:'center',
    borderRadius:10,
    

  },
});
