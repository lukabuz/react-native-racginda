import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, Text, View, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

export default class SubmissionCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            upvoteColor: 'white',
            downvoteColor: 'white',
            submission: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            score: nextProps.submission.score,
            submission: nextProps.submission,
            index: nextProps.index
        });  
    }

    componentDidUpdate(){
        this.updateColors;
    }

    componentDidMount = () => {
        this.updateColors;
    }

    

    updateColors(){
        var upvotecolor = this.state.upvoteColor;
        var downvotecolor = this.state.downvoteColor;
        if(this.state.submission.votevalue == 1){
            upvotecolor = '#e53935';
        }
        if(this.state.submission.votevalue == -1){
            downvotecolor = '#303f9f';
        }
        this.setState({
            upvoteColor: upvotecolor,
            downvoteColor: downvotecolor
        });
    }
    
    upvoteButtonPressed = () => {
        var upvotecolor = this.state.upvoteColor;
        var downvotecolor = this.state.downvoteColor;
        var score = this.state.score;
        
        if(downvotecolor == '#303f9f'){
            downvotecolor = 'white';
            upvotecolor = '#e53935';
            score = score + 2;
        } else if (upvotecolor == '#e53935'){
            upvotecolor = 'white';
            score = score - 1;
        } else if (upvotecolor == 'white'){
            upvotecolor = '#e53935';
            score = score + 1;
        }     

        this.setState({
            upvoteColor: upvotecolor,
            downvoteColor: downvotecolor,
            score: score
        });

        var cookie = this.getCookie();
        if(cookie){
            fetch('https://www.racginda.site/api/apivote/' + this.state.submission.id + '/upvote?APICookie=' + cookie);
        } else {
            fetch('https://www.racginda.site/api/apivote/' + this.state.submission.id + '/upvote');
        }
    }

    goToSubmission = () => {
        this.props.goToSubmission(this.state.submission);
    }

    downvoteButtonPressed = () => {
        var upvotecolor = this.state.upvoteColor;
        var downvotecolor = this.state.downvoteColor;
        var score = this.state.score;
        
        if(upvotecolor == '#e53935'){
            upvotecolor = 'white';
            downvotecolor = '#303f9f';
            score = score - 2;
        } else if (downvotecolor == '#303f9f'){
            downvotecolor = 'white';
            score = score + 1;
        } else if (downvotecolor == 'white'){
            downvotecolor = '#303f9f';
            score = score - 1;
        }     

        this.setState({
            upvoteColor: upvotecolor,
            downvoteColor: downvotecolor,
            score: score
        });

        var cookie = this.getCookie();
        if(cookie){
            fetch('https://www.racginda.site/api/apivote/' + this.state.submission.id + '/downvote?APICookie=' + cookie);
        } else {
            fetch('https://www.racginda.site/api/apivote/' + this.state.submission.id + '/downvote');
        }
    }

    getCookie= async () => {
        try {
            const value = await AsyncStorage.getItem('cookie');
            if (value !== null) {
                console.log(value);
                return value;
            }
            console.log('no value');
            return null;
        } catch (error) {
            console.log('error getting cookie');
            return null;
        }
    }

    checkIndexIsEven (n) {
        return n % 2 == 0;
    }

    render(){
        if(!this.state.submission.imageLink){
            return(
                <View style={this.checkIndexIsEven(this.state.index) ? styles.mainContainer : styles.mainContainerBlue}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.description}>{this.state.submission.description}</Text>
                        <TouchableWithoutFeedback
                        onPress={this.goToSubmission}
                        >
                            <View style={styles.postInfo}>
                                <AutoHeightImage width={20} 
                                source={require('./anon.png')} 
                                />
                                <Text style={styles.infoText}>{this.state.submission.getid}</Text>
                                <AutoHeightImage width={20} 
                                source={require('./reply.png')} 
                                />
                                <Text style={styles.infoText}>{this.state.submission.replycount}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.leftContainer}>
                        <View style={styles.topContainer}>
                            <TouchableWithoutFeedback
                            onPress={this.upvoteButtonPressed}
                            >
                                <View style={styles.upvoteButtonContainer}>
                                <Text style={{color: this.state.upvoteColor, fontSize: 20, fontWeight: 'bold'}}>▲</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.voteCount}>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{this.state.score}</Text>
                            </View>
                            <TouchableWithoutFeedback
                            onPress={this.downvoteButtonPressed}
                            >
                                <View style={styles.downvoteButtonContainer}>
                                <Text style={{color: this.state.downvoteColor, fontSize: 20, fontWeight: 'bold'}}>▼</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.bottomPlaceHolder}>
                        </View>
                    </View>
                </View>
            );
        } else {
            return(
                <View style={this.checkIndexIsEven(this.state.index) ? styles.mainContainer : styles.mainContainerBlue}>
                    <View style={styles.rightContainer}>
                        <Text style={styles.description}>{this.state.submission.description}</Text>
                        <AutoHeightImage style={{marginLeft:15}} width={200}
                            source={{ uri: 'https://s3.eu-central-1.amazonaws.com/racginda/photos/' + this.state.submission.imageLink}}
                        ></AutoHeightImage>
                        <TouchableWithoutFeedback
                        onPress={this.goToSubmission}
                        >
                            <View style={styles.postInfo}>
                                <AutoHeightImage width={20} 
                                source={require('./anon.png')} 
                                />
                                <Text style={styles.infoText}>{this.state.submission.getid}</Text>
                                <AutoHeightImage width={20} 
                                source={require('./reply.png')} 
                                />
                                <Text style={styles.infoText}>{this.state.submission.replycount}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.leftContainer}>
                        <View style={styles.topContainer}>
                            <TouchableWithoutFeedback
                            onPress={this.upvoteButtonPressed}
                            >
                                <View style={styles.upvoteButtonContainer}>
                                <Text style={{color: this.state.upvoteColor, fontSize: 20, fontWeight: 'bold'}}>▲</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={styles.voteCount}>
                            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{this.state.score}</Text>
                            </View>
                            <TouchableWithoutFeedback
                            onPress={this.downvoteButtonPressed}
                            >
                                <View style={styles.downvoteButtonContainer}>
                                <Text style={{color: this.state.downvoteColor, fontSize: 20, fontWeight: 'bold'}}>▼</Text>
                                </View>
                            </TouchableWithoutFeedback>
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
    mainContainerBlue: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#4180AC',
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
        // fontFamily: 'gogo'
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

AppRegistry.registerComponent('SubmissionCard', () => SubmissionCard);