import React, {Component} from 'react';
import {AppRegistry, AsyncStorage, Text, FlatList, ActivityIndicator, ScrollView, StyleSheet, Image, View} from 'react-native';

import SubmissionCard from './components/SubmissionCard/SubmissionCard';
import NavBar from './components/NavBar/NavBar';
import SubmissionScreen from './components/SubmissionScreen/SubmissionScreen';


export default class myapp extends Component{
    constructor(props){
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        isFilteredByNew: false,
        submissions: [],
        isSubmissionScreen: false,
        submissionSelected: null,
        loading: true,
        cookie: null
      }
    }

    componentDidMount(){
      this.getCookie();
      this.fetchAPI(this.state.isFilteredByNew);
    }

    fetchAPI(isNew){
      console.log('fetching API _________');
      var cookie = this.state.cookie;
      console.log('API FETCH TRIED TO GET COOKIE: ' + cookie);
      if(isNew){
        var link = 'https://www.racginda.site/api/posts?sort=new';
        if(cookie){
          link = link + "&APICookie=" + cookie;
        }
      } else {
        var link = 'https://www.racginda.site/api/posts';
        if(cookie){
          link = link + "?APICookie=" + cookie;
        }
      }
      console.log('API FETCH LINK: ' + cookie);
      fetch(link)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.Status != 'Success'){
              this.setState({
                isLoaded: true,
                error
              });
            }
            console.log('API FETCH REQUEST COOKIE: ' + result.cookie);
            this.setState({
              isLoaded: true,
              submissions: result.submissions
            });
            try {
              _storeData(result.cookie);
            } catch (error) {
              
            }
            this.doneLoading();
            this.forceUpdate();
            console.log('fetched API');
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
            alert('ვერ მოხერხდა ინტერნეტიდან რესურსების აღება');
          }
        )
    }

    _storeData = async (cookie) => {
      try {
        await AsyncStorage.setItem('cookie', cookie);
        console.log('cookie set to: ' + cookie);
      } catch (error) {
        alert('ვერ მოხერხდა მონაცემების შენახვა');
      }
    }

    getCookie= async () => {
      try {
        this.loading();
        const value = await AsyncStorage.getItem('cookie');
        if (value !== null) {
          this.setState({
            cookie: value,
          });
        }
        console.log('COOKIE NULL')
       } catch (error) {
         return null;
       }
    }

    sortByHot = () => {
      this.setState({
        isFilteredByNew: false
      });
      this.loading();
      this.fetchAPI(false);
      this.forceUpdate();
    }

    sortByNew = () => {
      this.setState({
        isFilteredByNew: true,
      });
      this.loading();
      this.fetchAPI(true);
    }

    loading = () => {
      this.setState({
        loading: true,
      });
    }

    doneLoading = () => {
      this.setState({
        loading: false,
      });
    }

    goToSubmission = (submission) => {
      this.setState({
        isSubmissionScreen : true,
        submissionSelected : submission
      });
    }

    goBack = () => {
      this.setState({
        isSubmissionScreen : false,
        submissionSelected : null
      });
      this.loading();
      this.fetchAPI(this.state.isNew);
      this.forceUpdate();
    }

    refresh = () => {
      this.loading();
      this.fetchAPI(this.state.isNew);
      this.forceUpdate();
    }


    render(){
        
        if(!this.state.isSubmissionScreen){
          if(!this.state.loading){
            return(
              <View style={styles.mainContainer}>
                <NavBar sortByHot={this.sortByHot} sortByNew={this.sortByNew} refresh={this.refresh}/>
                <View style={styles.cardsContainer}>
                  <ScrollView>
                    { this.state.submissions.map((submission, index) => (
                      <View key={index}>
                        <SubmissionCard index={index} refresh={this.state.refresh} goToSubmission={this.goToSubmission} submission={submission}/> 
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            );
          } else {
            return(
              <View style={styles.mainContainer}>
                <NavBar sortByHot={this.sortByHot} sortByNew={this.sortByNew} refresh={this.refresh}/>
                <View style={styles.cardsContainer}>
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#D4910B" />
                  </View>
                </View>
              </View>
            );
          }
        } else {
          return(
            <SubmissionScreen refresh={this.props.refresh} goBack={this.goBack} submission={this.state.submissionSelected}/>
          );
        }
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  cardsContainer: {
    flex: 9,
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

AppRegistry.registerComponent('racginda', () => myapp);