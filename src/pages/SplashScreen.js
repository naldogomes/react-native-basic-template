import React, { Component } from 'react';
import { AsyncStorage, View, StyleSheet, StatusBar, Image, ActivityIndicator } from 'react-native';
import { sh, sw } from '../helpers/dimensions'

export default class SplashScreen extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: null,
            token: null,
        }
    }

    async componentDidMount() {
        StatusBar.setHidden(true);
        await this.loadSession();

        const { loggedInStatus, email, token } = this.state;

        if(loggedInStatus === "true") {
            this.wait(2000);
            this.props.navigation.replace('Home', {
                email,
                token,
            })
        }
        else {
            this.wait(2000);
            this.props.navigation.replace('SignIn')
        }
    }

    async componentWillMount() {
        await AsyncStorage.setItem('version', 'Versão 1.0.0');
    }

    wait = (ms) => {
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
            end = new Date().getTime();
        }
    }

    loadSession = async () => {
        const loggedInStatus = await AsyncStorage.getItem('loggedInStatus');
        if(loggedInStatus === "true") {
            const email = await AsyncStorage.getItem('email');
            const token = await AsyncStorage.getItem('token');

            this.setState({
                email,
                token,
            })
        }
    }

    render() {
        return (
            <View>
                <Image
                    style={{ width: 400, height: 300, marginTop: sh*0.30 }}
                    source={require('../imgs/splash.png')}
                />
                <ActivityIndicator size="large" color="#7f7fff" style={styles.loading}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        marginTop: sh*0.47,
        marginLeft: sw*0.47
    },
})