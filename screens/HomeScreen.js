import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class HomeScreen extends Component {

    getWord=(word)=>{
        var searchKeyword = word.toLowerCase();
        var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22"+searchKeyword+".json";

        return fetch(url)
        .then((data)=>{

            if(data.status===200) {

                return data,json();

            }else {

                return null;

            }
        })

        .then((response)=>{
            
            var responseObject = response;

            if(responseObject) {
                var wordData = responseObject.definations[0];

                var defination = wordData.description;
                var lexicalCategory = wordData.wordType;

                this.setState({
                    "word" : this.state.text,
                    "defination" : defination,
                    "lexicalCategory" : lexicalCategory
                });

            }else {
                this.setState({
                    "word" : this.state.text,
                    "defination" : "Not Found",
                });
            }
        });
    }

    getWord=(text)=>{
        var text = text.toLowerCase()
        try{
            var word = dictionary[text]["word"]
            var lexicalCategory = dictionary[text]["lexicalCategory"]
            var defination = dictionary[text]["defination"]
            this.setState({
                "word" : word,
                "lexicalCategory" : lexicalCategory,
                "defination" : defination
            });
        }
    }
    
    catch(err) {
        alert("Sorry this word is not available for now")
        this.setState({
            'text' : '',
            'isSearchPressed' : false
        })
    }

    render() {
        return (
            <View style = {styles.cointainer}>

                <TextInput
                    onChangeText={text =>{
                        this.setState({
                            text : text,
                            isSearchPressed : false,
                            word : "Loading...",
                            lexicalCategory : '',
                            examples : [],
                            defination : ""
                        });
                    }}
                    value = {this.setState.text}
                />

                <TouchableOpacity 
                    style = {styles.searchButton}
                    onPress={() => {
                        this.setState({ isSearchPressed : true });
                        this.getWord(this.state.text);
                    }}>
                </TouchableOpacity>

                <View style = {styles.detailsCointainer}>

                    <Text style = {styles.detailsTitle}>
                        Word : {" "}
                    </Text>

                    <Text style = {{fontSize : 18}}>
                        {this.state.word}
                    </Text>

                </View>

                <View style = {styles.detailsCointainer}>

                    <Text style = {styles.detailsTitle}>
                        Type : {" "}
                    </Text>

                    <Text style = {{fontSize:18}}>
                        {this.state.lexicalCategory}
                    </Text>

                </View>

                <View style = {{flexDirection : 'row', flexWrap : 'wrap'}}>
                    
                    <Text style = {styles.detailsTitle}>
                        Defination : {" "}
                    </Text>

                    <Text style = {{fontSize:18}}>
                        {this.state.defination}
                    </Text>

                </View>

                <View style = {styles.outputContainer}>

                    <Text style = {{fontSize : 20}}>

                        {
                            this.state.isSearchPressed&&this.state.word==="Loading..."
                            ?this.state.word
                            :""
                        }

                    </Text>

                    {
                        this.state.word!=="Loading..."
                    }

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    cointainer: {
        flex : 1
    },
    detailsCointainer: {
        flex : 0.3,
        alignItems : 'center',
        justifyContent : 'center'
    },
    inputBox: {
        width : '80%',
        alignSelf : 'center',
        height : 40,
    },
    searchButton: {
        width: '50%', 
        height: 55, 
        alignSelf: 'center', 
        padding: 10, 
        margin: 10 
    },
    detailsTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    }
});