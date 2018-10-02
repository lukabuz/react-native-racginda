import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

export default class ReplyCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            reply : this.props.reply,
        }
    }

    render(){
        if(!this.props.reply.imageLink){
            return(
                <View style={styles.mainContainer}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.description}>{this.props.reply.description}</Text>
                            <View style={styles.postInfo}>
                                <AutoHeightImage width={20} 
                                source={require('./anon.png')} 
                                />
                                <Text style={styles.infoText}>{this.props.reply.getid}</Text>
                                <Text style={styles.infoText}></Text>
                            </View>
                    </View>
                    <View style={styles.leftContainer}>
                        <View style={styles.topContainer}>
                                <View style={styles.upvoteButtonContainer}>
                                </View>
                            <View style={styles.voteCount}>
                            </View>
                                <View style={styles.downvoteButtonContainer}>
                                </View>
                        </View>
                        <View style={styles.bottomPlaceHolder}>
                        </View>
                    </View>
                </View>
            );
        } else {
            return(
                <View style={styles.mainContainer}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.description}>{this.props.reply.description} {this.props.reply.imageLink}</Text>
                        <AutoHeightImage style={{marginLeft:15}} width={100}
                            source={{ uri: 'https://s3.eu-central-1.amazonaws.com/racginda/photos/' + this.props.reply.imageLink}}
                        ></AutoHeightImage>
                        <View style={styles.postInfo}>
                            <AutoHeightImage width={20} 
                            source={require('./anon.png')} 
                            />
                            <Text style={styles.infoText}>{this.props.reply.getid}</Text>
                            <Text style={styles.infoText}></Text>
                        </View>
                    </View>
                    <View style={styles.leftContainer}>
                        <View style={styles.topContainer}>
                                <View style={styles.upvoteButtonContainer}>
                                </View>
                            <View style={styles.voteCount}>
                            </View>
                                <View style={styles.downvoteButtonContainer}>
                                </View>
                        </View>
                        <View style={styles.bottomPlaceHolder}>
                        </View>
                    </View>
                </View>
            );
        }        
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#D4910B',
        margin: 5
    },
    rightContainer: {
        flex: 7,
        flexDirection: 'column'
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    description:{
        flex: 3,
        fontSize: 16,
        color: 'white',
        // margin: 15,
        // backgroundColor: 'blue'
        marginLeft: 15,
        marginTop: 15,
        // fontFamily: 'bld'
    },
    postInfo: {
        flex: 1,
        flexDirection: 'row',
        margin: 15,
    },
    replyImage: {
        flex: 1,
    },
    anonImage: {
        flex : 1,
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
    },
    upvoteButtonContainer: {
        flex:1,
        justifyContent: 'flex-end'
    },
    downvoteButtonContainer: {
        flex:1,
    },
    voteCount: {
        flex:1,
        justifyContent: 'center',
    },
    topContainer: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bottomPlaceHolder: {
        flex: 2
    }
});

AppRegistry.registerComponent('ReplyCard', () => ReplyCard);