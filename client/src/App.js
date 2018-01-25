import React, { Component } from 'react';
import { Jumbotron, Row, Col, Grid, ListGroup, Alert } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col className="col-12">
            <Jumbotron>
              <h1 className="display-3">JevaBlog</h1>
              <p className="lead">This is a WIP blogapp, made with React</p>
              <hr className="my-4" />
              <Row>
                <Col className="col-8">
                  <Alert bsStyle="warning">Here will be blog posts</Alert>
                  <div className="card primary mb-3">
                    <div className="card-header">DateTime here</div>
                    <div className="card-body text-primary">
                      <h4 className="card-title">BlogPost #0</h4>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col className="col-4">
                  <div className="card mb-3">
                    <h3 className="card-header">Nav</h3>
                    <div className="card-body">
                      <h5 className="card-title">This is JevaBlog</h5>
                      <h6 className="card-subtitle text-muted">It is very WIP</h6>
                    </div>
                    <div className="card-body">
                      <ListGroup>
                        <a href="#" className="list-group-item list-group-item-action">Here</a>
                        <a href="#" className="list-group-item list-group-item-action">will</a>
                        <a href="#" className="list-group-item list-group-item-action">be</a>
                        <a href="#" className="list-group-item list-group-item-action">links</a>
                      </ListGroup>
                    </div>
                  </div>
                </Col>
              </Row>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
