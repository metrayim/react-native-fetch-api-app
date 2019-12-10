import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Iamge, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { fetchArticle, getArticleById } from '../action/action'
import { SearchBar, Icon } from 'react-native-elements';

class ViewData extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: <RightMenuButton navigate={navigation} />,
        title: 'លម្អិត',
    });

    componentDidMount() {
        const { id } = this.props.navigation.state.params
        this.props.getArticleById(id)
    }
    render() {
        // console.log(this.props.dataArt,'navigation')
        const { CREATED_DATE, IMAGE, TITLE, DESCRIPTION } = this.props.dataArt
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={{ uri: this.props.dataArt.IMAGE }} style={styles.styleImage} />
                </View>
                <View style={{ justifyContent: 'center', margin: 10 }}>
                    <Text style={{ fontSize: 20, color: '#006699', fontWeight: 'bold' }}>
                        {(TITLE)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Icon Icon name="calendar-times-o" type="font-awesome" size={26} color="#006699" iconStyle={{ marginRight: 10 }} />
                    <Text>{(CREATED_DATE).slice(0, 4) + '-' + (CREATED_DATE).slice(4, 6) + '-' + (CREATED_DATE).slice(6, 8)}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Icon Icon name="heart" type="font-awesome" size={26} color="#006699" iconStyle={{ marginRight: 10 }} />
                    <Icon Icon name="heart" type="font-awesome" size={26} color="#006699" iconStyle={{ marginRight: 10 }} />
                    <Icon Icon name="heart" type="font-awesome" size={26} color="#006699" iconStyle={{ marginRight: 10 }} />
                </View>
                <View style={{ justifyContent: 'center', margin: 10 }}>
                    <Text>
                        {DESCRIPTION}
                    </Text>
                </View>

            </View>
        )
    }
}
const mapStateToProps = (centralState) => {
    // console.log('Metra View', centralState.reducerApi.dataArt)
    return {
        dataArt: centralState.reducerApi.dataArt
    }
}
export default connect(mapStateToProps, { getArticleById })(ViewData);
const RightMenuButton = (props) => {
    return (
        <View>
            <Icon Icon name="plus-circle" type="font-awesome" size={26} color="#006699" iconStyle={{ marginRight: 20 }} onPress={() => { props.navigate.navigate('AddIamge') }} />
            {/* <Icon name='chevron-left' type='font-awesome' iconStyle={{ marginLeft: 10 }} onPress={()=>console.log(props.navigate)} /> */}
        </View>

    )
}
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    styleImage: {
        width: 400,
        height: 300,
    },
    styleHarder: {

    },
    styleIcon: {

    },
    styleText: {

    }

})
