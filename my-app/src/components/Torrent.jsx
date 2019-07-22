import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 40px;
    width: 100%;
    margin-bottom: 1px;
    display: flex;
`;

const Title = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid rgba(221, 221, 221, 0.5);
    border-right: none;
`;

const Col = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid rgba(221, 221, 221, 0.5);
    border-right: none;
`;

const Progress = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid rgba(221, 221, 221, 0.5);
    border-right: none;
`;

const Text = styled.p`
    margin: 0;
`;

export default class InfoBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            torrent: props.data,
        }
    }

    render() {
        const { name, peers, progress, size, speedDown, speedUp, time} = this.props.data;

        return (
            <Container>
                <Title>
                    <Text>{ name }</Text>
                </Title>
                <Col>
                    <Text>{ size }</Text>
                </Col>
                <Col>
                    <Text>{ speedDown }</Text>
                </Col>
                <Col>
                    <Text>{ speedUp }</Text>
                </Col>
                <Progress>
                    <Text>{ progress }</Text>
                </Progress>
                <Col>
                    <Text>{ peers }</Text>
                </Col>
                <Col>
                    <Text>{ time }</Text>
                </Col>
            </Container>
        )
    }
}