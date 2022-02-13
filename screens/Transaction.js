import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import * as Permissions from "./Permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned:false,
      scannedData:" "
    };
  }
  getCameraPermissions=async domState => {
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status === "granted",
      domState: domState,
      scanned:false,
    });
  }
  handleBarCodeScnned=async({type,data})=>{
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned:"true",
    });
    }
  render() {
    const{domState,hasCameraPermissions,scannedData,scanned}=this.state;
    if(domState === "scanner"){
      return(
        <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined: this.handleBarCodeScnned}/>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button,{marginTop:25}]}
        onPress={()=> this.getCameraPermissions("scanner")}>
        <Text style={styles.text}>Scan QR Code</Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button:{
    width: "43%",
    height:55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    borderRadius:15
  },
  buttonText: {
    color: "black",
    fontSize: 24
}
});
