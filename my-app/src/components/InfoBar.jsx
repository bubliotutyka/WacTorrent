import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 40px;
    width: 100%;
    box-shadow: 0 2px 10px 1px rgba(121, 121, 121, 0.1);
    display: flex;
    margin-bottom: 30px;
`;

const Title = styled.div`
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-right: 1px solid rgba(221, 221, 221, 0.5);
`;

const Col = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-right: 1px solid rgba(221, 221, 221, 0.5);
`;

const Progress = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-right: 1px solid rgba(221, 221, 221, 0.5);
`;

const Text = styled.p`
    margin: 0;
`;

export default class InfoBar extends React.Component {
    render() {
        return (
            <Container>
                <Title>
                    <Text>Name</Text>
                </Title>
                <Col>
                    <Text>Size</Text>
                </Col>
                <Col>
                    <Text>DL speed</Text>
                </Col>
                <Col>
                    <Text>UP speed</Text>
                </Col>
                <Progress>
                    <Text>Progress</Text>
                </Progress>
                <Col>
                    <Text>Peers</Text>
                </Col>
                <Col>
                    <Text>Time</Text>
                </Col>
            </Container>
        )
    }
}