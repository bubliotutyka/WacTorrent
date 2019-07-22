import React from 'react';
import styled from 'styled-components';
import { Modal, Input } from 'antd';
import InfoBar from './InfoBar';
import Torrent from './Torrent';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const Menu = styled.div`
  height: 100%;
  width: 20%;
  background-color: #fff;
  z-index: 1;
  box-shadow: 2px 40px 10px 1px rgba(121, 121, 121, 0.1);
`;

const MenuTitle = styled.p`
  font-size: 20px;
  width: 100%;
  margin-top: 5px;
  text-align: center;
`;

const Torrents = styled.div`
  width: 80%;
  height: 100%;
  background-color: #fff;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid rgba(221, 221, 221, 0.5);
  box-shadow: 2px 2px 10px 1px rgba(121, 121, 121, 0.1);
  text-align: center;
  margin-left: 25%;
  width: 50%;
  margin-top: 5px;
  margin-bottom: 5px;

  &:hover {
    transform: scale(1.01);
    border: 1px solid rgba(221, 221, 221, 1);
    box-shadow: 2px 2px 10px 1px rgba(121, 121, 121, 0.15);
    cursor: pointer;
  }
`;

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      visibleAdd: false,
      addUri: null,
      path: null,
      torrents: [],
    }
    socket.on('update', torrents => {
      this.setState({ torrents })
      console.log('update')
    })
  }

  showModalAdd = (e) => {
    this.setState({
      visibleAdd: true,
    });
  }

  showModalPath = (e) => {
    this.setState({
      visiblePath: true,
    });
  }

  handleAdd = () => {
    if (this.state.addUri)
      socket.emit('add', this.state.addUri)

    this.setState({
      visibleAdd: false,
      addUri: null,
    });
  }

  handleChangePath = () => {
    if (this.state.path)
      socket.emit('change path', this.state.path)

    this.setState({
      visiblePath: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visibleAdd: false,
      visiblePath: false,
      addUri: null,
    });
  }

  handlePause = () => {
    socket.emit('pause');
  }

  handleResume = () => {
    socket.emit('resume');
  }

  handleUri = (e) => {
    this.setState({addUri: e.target.value});
  }

  handlePath = (e) => {
    this.setState({path: e.target.value});
  }

  render() {

    if (this.state.torrents.length > 0) {
      return (
        <>
          <MainContainer>
            <Menu>
              <MenuTitle>Wac Torrent</MenuTitle>
              <Button onClick={this.showModalAdd}>Add</Button>
              <Button onClick={this.handlePause}>Pause</Button>
              <Button onClick={this.handleResume}>Resume</Button>
              <Button onClick={this.showModalPath}>Path</Button>
            </Menu>
            <Torrents>
              <InfoBar />
              {
                this.state.torrents.map((torrent, key) => <Torrent data={torrent} key={key}/> )
              }
            </Torrents>
            <Modal
              title="Add Torrent"
              okText="Add"
              visible={this.state.visibleAdd}
              onOk={this.handleAdd}
              onCancel={this.handleCancel}
            >
              <Input placeholder="Torrent link" value={this.state.addUri} onChange={this.handleUri}/>
            </Modal>
            <Modal
              title="Change download path"
              okText="Change"
              visible={this.state.visiblePath}
              onOk={this.handleChangePath}
              onCancel={this.handleCancel}
            >
              <Input placeholder="Download folder path" value={this.state.path} onChange={this.handlePath}/>
            </Modal>
          </MainContainer>
        </>
      );
    } 
    else {
      return (
        <>
          <MainContainer>
            <Menu>
              <MenuTitle>Wac Torrent</MenuTitle>
              <Button onClick={this.showModalAdd}>Add</Button>
              <Button onClick={this.handlePause}>Pause</Button>
              <Button onClick={this.handleResume}>Resume</Button>
              <Button onClick={this.showModalPath}>Path</Button>
            </Menu>
            <Torrents>
              <InfoBar />
            </Torrents>
            <Modal
              title="Add Torrent"
              okText="Add"
              visible={this.state.visibleAdd}
              onOk={this.handleAdd}
              onCancel={this.handleCancel}
            >
              <Input placeholder="Torrent link" value={this.state.addUri} onChange={this.handleUri}/>
            </Modal>
            <Modal
              title="Change download path"
              okText="Change"
              visible={this.state.visiblePath}
              onOk={this.handleChangePath}
              onCancel={this.handleCancel}
            >
              <Input placeholder="Download folder path" value={this.state.path} onChange={this.handlePath}/>
            </Modal>
          </MainContainer>
        </>
      );
    }
  }
}