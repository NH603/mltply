// @flow

import * as React from 'react'
import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Button,
  Icon,
  Left,
  Text
} from 'native-base'

import config from '../config'

export default ({
  children,
  backButton = false,
  navigation,
  contentContainerStyle = {},
  ...props
}: {
  children: React.Node,
  backButton?: boolean,
  navigation?: Object,
  contentContainerStyle?: Object
}) => (
  <Container style={{ backgroundColor: '#F8F8F8' }} {...props}>
    <Header
      style={{
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5
      }}
    >
      {backButton &&
        navigation && (
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon type="MaterialCommunityIcons" name="arrow-left" />
            </Button>
          </Left>
        )}
      <Body>
        <Title>
          <Text style={{ color: 'white', fontFamily: 'Roboto Mono Medium' }}>
            {config.appName}
          </Text>
        </Title>
      </Body>
    </Header>
    <Content padder contentContainerStyle={contentContainerStyle}>
      {children}
    </Content>
  </Container>
)
