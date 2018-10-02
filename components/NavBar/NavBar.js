import React, {Component} from 'react';
import {AppRegistry, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import SubmitForm from '../SubmitForm/SubmitForm';

export default class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            expanded : false,
        }
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
                                        onPress={this.props.sortByHot }
                                    >
                                    <View>
                                        
                                            <AutoHeightImage width={20} style={styles.hotImage}
                                            source={require('./hot.png')} 
                                            />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.newContainer}>
                                <TouchableOpacity
                                        onPress={this.props.sortByNew }
                                    >
                                    <View>
                                        <AutoHeightImage width={25} style={styles.newImage}
                                        source={require('./new.png')} 
                                        />
                                    
                                    </View>
                                </TouchableOpacity>
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
                    <SubmitForm onRetractButtonPress={this.onRetractButtonPress}>
                    </SubmitForm>
                </View>
            );
        }
    }
}

AppRegistry.registerComponent('NavBar', () => NavBar);

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