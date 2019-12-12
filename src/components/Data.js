import React, { Component } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert, Button } from 'react-native'
import { ListItem, Divider } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import SkeletonLoader from 'react-native-skeleton-loader'
import { SearchBar, Icon } from 'react-native-elements';

// import {  , } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { fetchArticle, deleteArticle } from '../action/action'

class DataComponent extends Component {
    state = {
        loading: false
    }
    componentDidMount(){
        this.props.fetchArticle()
        this.setState({loading:true})
    }
    deleteAritcles = (id) => {
        console.log(id, 'this id for delete')
        Alert.alert(
            'Delete Article',
            'Are you sure to delete it?',
            [
                { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        await this.props.deleteArticle(id)
                        Alert.alert('Delete Article', 'Delete alredy ')
                    }
                },
            ],
            { cancelable: false },
        );
    }
    viewId = (id) => {
        this.props.navigation.navigate('ViewData', { id: id })
    }

    render() {
        console.log(this.props.navigation, 'metra navigat')
        const {loading}=this.state;
        if (!this.props.isLoading) {
            return <Dataloading />
        }
        else {
            return (
                <SafeAreaView>
                    <FlatList
                        data={this.props.article}
                        keyExtractor={item => item.ID}
                        renderItem={({ item }) => (

                            <View>
                                <TouchableOpacity onPress={() => this.viewId(item.ID)} onLongPress={() => this.deleteAritcles(item.ID)} style={styles.container}>
                                    <View>
                                        <Image source={{ uri: item.IMAGE ? item.IMAGE : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/220px-Good_Food_Display_-_NCI_Visuals_Online.jpg' }} style={styles.styleImage} />
                                    </View>
                                    <View style={styles.styleText}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon Icon name="clock-o" type="font-awesome" size={20} color="#006699" iconStyle={{ marginRight: 10 }} />
                                            <Text>{(item.CREATED_DATE).slice(0, 4) + '-' + (item.CREATED_DATE).slice(4, 6) + '-' + (item.CREATED_DATE).slice(6, 8)}</Text>
                                        </View>
                                        <Text>{((item.TITLE).trim()).slice(0, 70) + '...'}</Text>
                                    </View>
                                </TouchableOpacity>
                                <Divider style={{ backgroundColor: 'white', height: 10 }} />
                            </View>
                        )}
                    />


                </SafeAreaView>

            )
        }
    }
}

const Dataloading = (props) => {
    console.log(props, 'metra skeleton')
    var LoadData = [];
    for (let i = 0; i <= 9; i++) {
        LoadData.push(<View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <SkeletonLoader type="square" size={110} loading={true} color='ffa433' highlightColor='#ffbf70'>
                    <Image
                        style={styles.styleImage}
                        source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                        resizeMode="contain"
                    />
                </SkeletonLoader>
            </View>
            <View style={{ flex: 2, flexDirection: 'column' }}>
                <SkeletonLoader type="rectangle" rows={3} height={10} loading={true} color='ffa433' highlightColor='#ffbf70'>
                    <Text style={styles.boldText}>Luxembourg to Brussels</Text>
                    <Text style={styles.normalText}>Location: Luxembourg</Text>
                    <Text style={styles.normalText}>Distance: 1,200 Kms</Text>
                    <Button
                        block
                        light
                        style={styles.button}>
                        <Text style={styles.buttonText}>Make a bid</Text>
                    </Button>
                </SkeletonLoader>
            </View>

        </View>)
    }
    return (LoadData)
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#f2f2f2',
        borderBottomColor: 'red'
    },
    styleImage: {
        flex: 1,
        height: 180,
        width: 180,
        backgroundColor: '#f2f2f2',


    },
    styleText: {
        flex: 1,
        //  justifyContent:'flex-start',
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2',
    }
})
const mapStateToProps = (centralState) => {
    console.log('loding:', centralState.reducerApi.isLoading);
    return {
        article: centralState.reducerApi.article,
        isLoading:centralState.reducerApi.isLoading
    }
}
export default connect(mapStateToProps, { fetchArticle, deleteArticle })(withNavigation(DataComponent))