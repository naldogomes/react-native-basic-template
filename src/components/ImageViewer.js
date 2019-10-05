import React, { Component } from 'react';
import { View, Image, BackHandler } from 'react-native';

export default class ImageViewer extends Component {
    constructor(props){
        super(props)

        const { navigation } = this.props;

        this.state = {
            image: navigation.getParam('image'),
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.pop();
        return true;
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <Image
                    style={{ flex: 1}}
                    source={{uri: this.state.image}}
                />
            </View>
        )
    }
}
