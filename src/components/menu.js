import React, { Component } from 'react'
import { Container, Content, View, Text, Thumbnail, List, ListItem } from 'native-base'
import { StyleSheet } from 'react-native'
import { AsyncStorage } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


class Menu extends Component {
    constructor(props){
        super(props)

        const { navigation } = this.props;

        this.state = {
            // email: navigation.getParam('email'),
            // token: navigation.getParam('token'),
        }
    }

    async componentDidMount() {

    }

    clearSession = async () => {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('token');

    }

    async logOut() {
        await this.clearSession();
        this.props.navigation.replace('SignIn');
    }

    goTo(screen) {
        // const { email, token } = this.state

        // this.props.navigation.replace(screen, {
        //     email,
        //     token,
        // })
    }


    render() {
        // splitName = this.state.nome.split(' ');
        // nome = `${splitName[0]} ${splitName[1]}`
        return (
        <Container>
            <Content>
            <LinearGradient
                style={styles.menuHeader}
                colors={['#7f7fff', '#4c4cff']}>
                <View style={styles.perfilImage}>
                    {/* <Thumbnail source={{uri: this.state.url}} /> */}
                    <Thumbnail source={require('../imgs/perfil.png')} />
                </View>
                <View>
                    <Text style={{ color: 'white' }}>username</Text>
                    <Text style={{ color: 'white' }}>username@myapp.com</Text>
                </View>

            </LinearGradient>
            <Content>
            <List>
                    <ListItem onPress={() => {this.goTo('Screen1')}}>
                        <Text>Screen1</Text>
                    </ListItem>
                    <ListItem onPress={() => {this.goTo('Screen1')}}>
                        <Text>Screen2</Text>
                    </ListItem>
                    <ListItem onPress={() => {this.goTo('Screen1')}}>
                        <Text>Screen3</Text>
                    </ListItem>
                    <ListItem onPress={() => {this.goTo('Screen1')}}>
                        <Text>Screen4</Text>
                    </ListItem>
                    <ListItem onPress={() => {this.logOut()}}>
                        <Text>Logout</Text>
                    </ListItem>
                </List>
                </Content>
            </Content>
        </Container>
        )
    }
}

export default Menu

const styles = StyleSheet.create({
    content: {
        
    },
    menuHeader: {
        height: 120,
        alignItems: 'center',
        flexDirection: 'row'
    },
    menuContent: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    perfilImage: {
        padding: 15
    },
    menuOptions: {

    }
    
});