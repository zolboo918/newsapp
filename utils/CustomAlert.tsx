// import {Icon} from "native-base";
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Alert as al, View, TouchableOpacity} from 'react-native';
import Alert from './Alert';
import Dialog from './Dialog';

interface StateType {
  visible: boolean;
  body: any;
}
export class CustomAlert extends Component<any, StateType> {
  static myComponentInstance: any;

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      body: null,
    };
    CustomAlert.myComponentInstance = this;
  }

  static show(
    message: string,
    messageTitle?: string,
    type?: string,
    color?: string,
    iconName?: string,
    handler?: Function,
    renderBody?: any,
  ) {
    CustomAlert.myComponentInstance._show(
      message,
      messageTitle,
      type,
      color,
      iconName,
      handler,
      renderBody,
    );
  }

  static hide() {
    CustomAlert.myComponentInstance._hide();
  }

  _hide = () => {
    this.setState({visible: false});
  };

  static showDialog(
    type: any,
    title: any,
    message: any,
    yesFunctionName: any,
    noFunctionName?: any,
    image?: any,
    cancelButtonName?: any,
    doneButtonname?: any,
  ) {
    CustomAlert.myComponentInstance._showDialog(
      type,
      title,
      message,
      yesFunctionName,
      noFunctionName,
      image,
      cancelButtonName,
      doneButtonname,
    );
  }

  _show = (
    message: string,
    messageTitle: string,
    type?: string,
    color?: string,
    iconName?: string,
    handler?: any,
    renderBody?: any,
  ) => {
    let result: any;
    switch (type) {
      case 'alert':
        result = (
          <Alert
            message={message}
            messageTitle={messageTitle}
            color={color}
            iconName={iconName}
          />
        );
        break;
      case 'dialog':
        result = (
          <Dialog
            message={message}
            messageTitle={messageTitle}
            color={color}
            iconName={iconName}
            handler={handler}
          />
        );
        break;

      case 'custom':
        result = renderBody();
        break;
      default:
        result = (
          <Alert
            message={messageTitle}
            messageTitle={message}
            color={color}
            iconName={iconName}
          />
        );
        break;
    }
    this.setState({body: result, visible: true});
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.visible}
        onRequestClose={this._hide}>
        <TouchableOpacity onPress={this._hide} style={this.style.overlay}>
          {this.state.body}
        </TouchableOpacity>
      </Modal>
    );
  }

  style = StyleSheet.create({
    overlay: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  });
}
