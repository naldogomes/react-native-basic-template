import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, BackHandler } from 'react-native';
import { Container, Header, Tab, Tabs, Left, Body, Right, Button, Icon, Title, Drawer } from 'native-base';
import { backAction } from '../helpers/back'
import Menu from '../components/menu'

export default class HomeScreen extends Component {
    constructor(props){
        super(props)

        const { navigation } = this.props;

        this.state = {
            email: navigation.getParam('email'),
            token: navigation.getParam('token'),
        }
    }
    
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', backAction);
    }

    async componentWillMount() {

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    _closeDrawer = () => {
        this.drawer._root.close()
    }

    _openDrawer = () => {
        this.drawer._root.open()
    }

    render() {
        return (
            <Drawer
                tweenDuration={200}
                ref={ref => {
                    this.drawer = ref
                }}
                negotiatePan={true}
                tapToClose={true}
                content={<Menu navigation={this.props.navigation}/>}
                openDrawerOffset={viewport => viewport.width - 320}
                onClose={this._closeDrawer.bind(this)}
                onOpen={this._openDrawer.bind(this)}
                panCloseMask={0.4}
                panOpenMask={0.1}
                panThreshold={0.1}>

                <Container>
                    <Header hasTabs noShadow style={styles.header}>
                    <Left>
                        <Button 
                            onPress={() => {this._openDrawer()}}
                            transparent
                        >
                        <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        
                    </Right>
                    </Header>
                    <View>
                        <Text style={{fontSize:20, fontWeight: 'bold', marginLeft: 20, marginTop: 25}}>
                            React Native basic init template
                        </Text>
                        <Text style={{fontSize:20, marginLeft: 20, marginTop: 10}}>
                            github.com/naldogomes
                        </Text>
                    </View>
                </Container>
        </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        
    },
    header: {
      backgroundColor: '#3232ff'  
    },
});