import React, {Component} from 'react';
import {AppRegistry, ScrollView, Text, View, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import SubmissionNavBar from '../SubmissionNavBar/SubmissionNavBar';
import SubmissionCard from '../SubmissionCard/SubmissionCard';
import ReplyCard from '../ReplyCard/ReplyCard';

export default class SubmissionScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
          submission: this.props.submission,
          isLoaded: true,
          replies: []
        };
    }

    componentDidMount(){
      this.fetchAPI();
    }

    goToSubmission = (submission) => {
      
    }

    checkIndexIsEven (n) {
      return n % 2 == 0;
    }

    fetchAPI(){
        fetch('https://www.racginda.site/api/posts/' + this.props.submission.id + '/view')
          .then(res => res.json())
          .then(
            (result) => {
              if(result.Status != 'Success'){
                this.setState({
                  isLoaded: true,
                  error
                });
              }
              this.setState({
                isLoaded: true,
                replies: result.replies
              });
              this.forceUpdate();
            },
            (error) => {
              throw(error);
              this.setState({
                isLoaded: true,
                error
              });
              alert('ვერ მოხერხდა ინტერნეტიდან რესურსების აღება');
            }
          )
      }


    render(){
      console.log(this.state.replies);
        return(
          <View style={styles.mainContainer}>
            <SubmissionNavBar refresh={this.props.refresh} submission={this.state.submission} goBack={this.props.goBack} />
            <View style={styles.cardsContainer}>
              <ScrollView>
                <View style={styles.submissionCardContainer}>
                    <SubmissionCard goToSubmission={this.goToSubmission} submission={this.props.submission}/> 
                </View>
                <View style={styles.bottomContainer}>
                <View style={styles.leftOffset}></View>
                <View style={styles.repliesContainer}>
                  { this.state.replies.map((reply, index) => (
                    <View key={reply.id} style={this.checkIndexIsEven(index) ? replyStyles.mainContainer : replyStyles.mainContainerBlue}>
                        <View style={replyStyles.rightContainer}>
                            <Text style={replyStyles.description}>{reply.description}</Text>
                            <AutoHeightImage style={{marginLeft:15}} width={200}
                                source={{ uri: 'https://s3.eu-central-1.amazonaws.com/racginda/photos/' + reply.imageLink}}
                            ></AutoHeightImage>
                                <View style={replyStyles.postInfo}>
                                    <AutoHeightImage width={20} 
                                    source={require('./anon.png')} 
                                    />
                                    <Text style={replyStyles.infoText}>{reply.getid}</Text>
                                    <Text style={replyStyles.infoText}></Text>
                                </View>
                        </View>
                        <View style={replyStyles.leftContainer}>
                            <View style={replyStyles.topContainer}>
                                    <View style={replyStyles.upvoteButtonContainer}>
                                    </View>
                                <View style={replyStyles.voteCount}>
                                </View>
                                    <View style={replyStyles.downvoteButtonContainer}>
                                    </View>
                            </View>
                            <View style={replyStyles.bottomPlaceHolder}>
                            </View>
                        </View>
                    </View>
                  ))}
                </View>
            </View>
              </ScrollView>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    cardsContainer: {
        flex: 9,
    },
    submissionCardContainer: {
    },
    bottomContainer: {
      flexDirection: 'row',
    },
    leftOffset: {
      flex: 1,
    },
    repliesContainer: {
      flex: 8,
    }
});

const replyStyles = StyleSheet.create({
  mainContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#D4910B',
      margin: 5
  },
  mainContainerBlue: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4180AB',
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
    //   fontFamily: 'gogo'
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

AppRegistry.registerComponent('SubmissionScreen', () => SubmissionScreen);