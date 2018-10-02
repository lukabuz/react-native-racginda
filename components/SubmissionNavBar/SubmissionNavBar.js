import React, {Component} from 'react';
import {AppRegistry, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import SubmitForm from '../SubmitForm/SubmitForm';

export default class SubmissionNavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            expanded : false,
            submission: this.props.submission
        }
    }

    goBack = () => {
        this.props.goBack();
    }

    onExpandButtonPress = () => {
        this.setState({
            expanded: true
        });
    }

    onRetractButtonPress = () => {
        this.setState({
            expanded: false
        });
    }

    render(){
        if(!this.state.expanded){
            return(
                
                    <View style={styles.navBarContainer}>
                        <View style={styles.navBarLeftButtons}>
                            <View style={styles.hotContainer}>
                                <TouchableOpacity
                                        onPress={this.goBack}
                                    >
                                    <View>
                                        
                                            <AutoHeightImage width={20} style={styles.hotImage}
                                            source={require('./back.png')}
                                            />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.newContainer}>
                                
                            </View>
                        </View>
                        <View style={styles.navBarCenter}>
                        <TouchableOpacity
                            onPress={this.onExpandButtonPress}
                        >   
                            <View>
                                <View>
                                    <AutoHeightImage width={25}
                                    source={require('./down.png')} 
                                    />
                                </View>                    
                            </View>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.navBarRightButtons}>
                            <TouchableOpacity
                                onPress={this.props.refresh}
                            >
                                <AutoHeightImage width={25} style={styles.refreshImage}
                                source={require('./refresh.png')} 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
            );
        } else{
            return(
                <View style={styles.expandedNavBarContainer}>
                    <SubmitForm submission={this.state.submission} onRetractButtonPress={this.onRetractButtonPress}>
                    </SubmitForm>
                </View>
            );
        }
    }
}

AppRegistry.registerComponent('SubmissionNavBar', () => SubmissionNavBar);

const styles = StyleSheet.create({
    navBarContainer: {
        flex: 1,
        backgroundColor: '#7986cb',
        flexDirection: 'row',
    },
    expandedNavBarContainer:{
        flex: 8,
        backgroundColor: '#7986cb',
        flexDirection: 'row',
    },
    navBarLeftButtons: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hotImage: {
        padding: 1,
        margin: 2,
        marginRight: 5
    },
    newImage: {
        padding: 1,
        margin: 2,
    },
    refreshImage: {
        padding: 1,
        margin: 2,
    },
    navBarCenter: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarRightButtons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hotContainer: {
        flex:1,
        alignItems: 'center'
    },
    newContainer: {
        flex:1,
        alignItems: 'center'
    }
});