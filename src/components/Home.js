import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, Image, ScrollView ,SafeAreaView,Alert, TouchableOpacity} from 'react-native'
import { SearchBar, Icon } from 'react-native-elements';
import { Pages } from 'react-native-pages';
import Data from '../components/Data';
import {connect} from 'react-redux';
import {fetchArticle,searchArticle} from '../action/action'



 class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            search:''
        }
    }
    // componentDidMount(){
    //      this.props.fetchArticle()
    //     // console.log(this.props.fetchArticle(),'hi metra')
    // }
    componentDidUpdate(preProp,preState){
        if(preState.search !==this.state.search){
            this.props.searchArticle(this.state.search)
        }
       
        
    }
    static navigationOptions = ({ navigation }) => ({
        headerRight: <RightMenuButton navigate={navigation} />,
        title: 'បញ្ញីអត្ថបទ',
    });
    updateSearch = search => {
        this.setState({ search });
    };
    render() {
       
        
        return (
            <ScrollView  showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        lightTheme={true}
                        round={true}
                    />
                </View>
                <View style={styles.containerIndicator}>
                <Pages rtl={true}>
                <Image source={{uri: 'https://techcrunch.com/wp-content/uploads/2010/07/github-logo.png?w=512'}} style={{flex:1}}/>
                <Image source={{uri: 'https://techcrunch.com/wp-content/uploads/2010/07/github-logo.png?w=512'}} style={{flex:1}}/>
                <Image source={{uri: 'https://techcrunch.com/wp-content/uploads/2010/07/github-logo.png?w=512'}} style={{flex:1}}/>   
                </Pages>
                </View>
                
            </View>
            <TouchableOpacity style={{marginTop:10}}>
            <Data/>
            </TouchableOpacity>
            
            
            
            </ScrollView>
        )
    }
}
const RightMenuButton = (props) => {
    return (
        <View>
            <Icon Icon name="plus-circle" type="font-awesome" size={26} color="#006699" iconStyle={{ marginRight: 10 }} onPress={() => { props.navigate.navigate('AddIamge') }} />
            {/* <Icon name='chevron-left' type='font-awesome' iconStyle={{ marginLeft: 10 }} onPress={()=>console.log(props.navigate)} /> */}
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        //  flex: 1,
        backgroundColor: '#263238',
         height:460
      },
      containerIndicator:{
          height:400
      },
    containerData:{
        flex:1,
        height:400

    }

})

const mapStateToProps=(centralState)=>{
    // console.log('map:',centralState.reducerApi.article)
    return {
            article: centralState.reducerApi.article
    }
}

export default connect(mapStateToProps,{searchArticle})(Home);
