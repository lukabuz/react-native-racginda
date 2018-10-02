import React, {Component} from 'react';
import {AppRegistry, Text, TextInput, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Alert, Button} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

export default class SubmitForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : null,
            submission: this.props.submission
        }
    }

    onFetchLoginRecords = async () => {
        if(this.state.submission){
            var link = 'https://www.racginda.site/api/posts/' + this.state.submission.id + '/reply';
        } else {
            var link = 'https://www.racginda.site/api/posts';
        }
        var data = {
         text : this.state.text
        };
        try {
         let response = await fetch(
          link,
          {
            method: "POST",
            headers: {
             "Accept": "application/json",
             "Content-Type": "application/json"
            },
           body: JSON.stringify(data)
         }
        );
         if (response.status >= 200 && response.status < 300) {
            response.json().then((responseJson) => {
                    alert(responseJson.message || responseJson.error);
                });
         }
       } catch (errors) {
    
            alert('დაფიქსირდა შეცდომა');
        } 
    }

    submit = async () => {
        if(this.state.text){
            this.onFetchLoginRecords();
        } else {
            Alert.alert('გთხოვთ შეავსოთ ტექსტის ველი');
        }
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>დააფიქსირე შენი აზრი</Text>
                </View>
                <View style={styles.textAreaContainer}>
                <TextInput
                    maxLength= {3000}
                    multiline = {true}
                    underlineColorAndroid="transparent"
                    placeholder= "ასჯერ გაზომე, ერთხელ გაჭერი"
                    style= {styles.textInput}
                    onChangeText= {(text) => this.setState({text})}
                    value= {this.state.text}
                />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.uploadPictureContainer}>
                    </View>
                    <View style={styles.midPlaceHolder}>
                        <TouchableOpacity
                        onPress={this.props.onRetractButtonPress}
                        >
                            <View>
                                <AutoHeightImage width={25}
                                source={require('./up.png')} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.submitButtonContainer}>
                        <TouchableOpacity
                        onPress={this.submit}
                        >
                            <View>
                                <Text style={{fontWeight:'bold',color:'white',fontSize:18,margin:10}}>გაჭრა</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>                
            </View>
        );
    }
}

//http://www.racginda.site/fonts/bld.ttf
//http://www.racginda.site/fonts/english.ttf
//http://www.racginda.site/fonts/gogo.ttf
//http://www.racginda.site/fonts/nrml.ttf

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    textAreaContainer: {
        flex: 4,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    textInput: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'white',
    },
    headerContainer: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        color: 'white',
        // fontFamily: 'bld'
    },
    uploadPictureContainer: {
        flex: 2,
        // backgroundColor: 'white'
    },
    midPlaceHolder: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonContainer: {
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8e24aa',
        borderRadius: 3,
        margin: 7
    },
    submitButton:{
        margin: 10,
        backgroundColor: 'black'
    },
    submitButtonText: {
        fontSize: 25,
        fontWeight: 'bold',
        // fontFamily: 'nrml'
    }
});

AppRegistry.registerComponent('SubmitForm', () => SubmitForm);