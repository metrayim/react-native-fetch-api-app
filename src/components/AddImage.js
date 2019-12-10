import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchArticle, uploadImage } from '../action/action'


class AddImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarImage: '',
            title: "",
            description: "",
            response: '',
            validTitle:false,
            validDes:false,
            validImage:false,
            errorImage:'',
            errorTitle:'',
            errordes:'',
            


        }
    }
    static navigationOptions = {
        title: 'បន្ថែមអត្ថបទ',
        headerRight: <Icon name="heart" type="font-awesome" size={26} color="#006699" iconStyle={{ marginRight: 10 }} />

    };

    options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    submitData = async() => {
        const { title, description, response } = this.state;
        this.setState({ title:title, description: description, response: response })
        if(this.state.title==''){
            this.setState({errorTitle:'សូមជួយបំពេញចំណងជើង',validTitle:true})
        }
        else if(this.state.description==""){
            this.setState({errordes:'សូមជួយបំពេញ Description',validDes:true})
        }
        else if(this.state.response==''){
            this.setState({errorImage:'សូមជួយបំពេញ ជ្រើសរើសរូបភាព',validImage:true})
        }
        else{
            this.props.uploadImage(this.state);
            this.props.navigation.navigate('Home')
            this.setState({
            avatarImage: '',
            title: "",
            description: "",
            response: '',
            validTitle:false,
            validDes:false,
            validImage:false,
            errorImage:'',
            errorTitle:'',
            errordes:'',})

        }
       
       
    }
    getImage = () => {
        ImagePicker.showImagePicker(this.options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    avatarImage: source,  response: response 
                });
            }
        });
    }
    handlerTitle = (value) => {
        this.setState({ title: value })
    }
    handlerDes = async (value) => {
        this.setState({ description: value })
    }
    
    render() {
        const { avatarImage} = this.state;
        const avatar = avatarImage ? avatarImage : { uri: 'https://www.freeiconspng.com/uploads/add-icon--line-iconset--iconsmind-29.png' }
      
        return (
            <View style={styles.container}>
                
                 <View style={{flexDirection:'row',justifyContent:'center',marginBottom:50}}>
                 <Text style={{fontSize:30,fontWeight:'bold',color:'green'}}>សូមជួយបំពេញចំណងជើង</Text>
                 </View>
                {this.state.validTitle ? <Text style={{ color: 'red', textAlign: 'center' }}>{this.state.errorTitle}</Text> : null}
                <TextInput
                    style={styles.textInputStyle1}
                    placeholder="Title"
                    value={this.state.title}
                    onChangeText={this.handlerTitle}

                />
                {this.state.validDes ? <Text style={{ color: 'red', textAlign: 'center' }}>{this.state.errordes}</Text> : null}
                <TextInput
                    style={styles.textInputStyle2}
                    placeholder="Description"
                    value={this.state.description}
                    onChangeText={this.handlerDes}
                />
                {this.state.validImage ? <Text style={{ color: 'red', textAlign: 'center' }}>{this.state.errorImage}</Text> : null}
                <TouchableOpacity onPress={() => { this.getImage() }} style={{ justifyContent: "center", flexDirection: 'row', marginTop: 30 }}>
                    <Image source={avatar} style={{ width: 200, height: 200, borderRadius: 100 }} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.submitData() }} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}>បន្ថែមអត្ថបទ</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const mapStateToProps = (centralStore) => {
    return {
        article: centralStore.reducerApi
    }
}
export default connect(mapStateToProps, { uploadImage })(AddImage);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    textInputStyle1: {
        height: 40,
        width: '90%',
        // textAlign: 'center',
        borderWidth: 1,
        borderColor: '#028b53',
        borderRadius: 8,
        marginTop: 0,
        marginLeft: 15,
        paddingLeft: 20
    },
    textInputStyle2: {
        height: 40,
        width: '90%',
        // textAlign: 'center',
        borderWidth: 1,
        borderColor: '#028b53',
        borderRadius: 8,
        marginTop: 40,
        marginLeft: 15,
        paddingLeft: 20
    },
    button: {

        width: '90%',
        height: 40,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        marginTop: 30,
        marginLeft: 15
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },

})
 {/* <TouchableOpacity>
                    {this.state.pass.valid ? <Text style={{ color: 'red', textAlign: 'center' }}>{this.state.pass.validationRule}</Text> : null}
                    <TextInput
                        style={styles.textInputStyle1}
                        placeholder="Title"
                         value={this.state.responseData.title}
                        onChangeText={this.handlerTitle}
                     
                    />
                </TouchableOpacity>
                <Text>{this.state.responseData.title}</Text>
                <TouchableOpacity>
                    {this.state.pass.valid ? <Text style={{ color: 'red', textAlign: 'center' }}>{this.state.pass.validationRule}</Text> : null}
                    <TextInput
                        style={styles.textInputStyle2}
                        placeholder="Description"
                          value={this.state.responseData.description}
                        onChangeText={this.handlerDes}
                    />
                </TouchableOpacity> */}