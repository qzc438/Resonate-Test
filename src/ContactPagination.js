import React, {Component, Fragment} from 'react'
import {Icon, Menu, Table} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Pagination} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";

class ContactPagination extends Component {

    // constructor
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 5,
            listAll: [],
            listPage: []
        }
    }

    // handle menu item
    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    // handle map icon click
    handleClick(lat, lng) {
        console.log(lat, lng);
        // var data = {lat:lat,lng:lng};
        // data = JSON.stringify(data);
        // var path = '/GoogleMap/${data}';
        // this.props.history.push(path);
        this.props.history.push({pathname: '/GoogleMap', state: {lat: -37.907803, lng: 145.133957}})
    }

    // load data in mount
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var api = 'https://jsonplaceholder.typicode.com/users';
        axios.get(api)
            .then((response) => {
                //console.log(response);
                //console.log(response.data);
                //用到this需要注意指向，箭头函数
                this.setState({
                    listAll: response.data,
                    listPage: response.data.slice(0, this.state.pageSize)
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    // handle pagination
    pageNumberOnChange = (page) => {
        let startNum = page > 0 ? (page - 1) * this.state.pageSize : 0;
        let tempDisplay = this.state.listAll.slice(startNum, startNum + this.state.pageSize);
        this.setState(
            {
                listPage: tempDisplay,
                currentPage: page
            }
        );
    }

    // render page
    render() {
        const {activeItem} = this.state;
        return (
            <Fragment>

                <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                    <Menu>
                        <Menu.Item
                            name='create'
                            active={activeItem === 'create'}
                            onClick={this.handleItemClick}
                        >
                            <Icon name='user plus'/>
                            Create
                        </Menu.Item>

                        <Menu.Item
                            name='update'
                            active={activeItem === 'update'}
                            onClick={this.handleItemClick}
                        >
                            <Icon name='user'/>
                            Update
                        </Menu.Item>

                        <Menu.Item
                            name='delete'
                            active={activeItem === 'delete'}
                            onClick={this.handleItemClick}
                        >
                            <Icon name='user times'/>
                            Delete
                        </Menu.Item>
                    </Menu>

                    <Table celled striped style={{overflow: 'auto'}}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Id</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Name</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Username</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Email</Table.HeaderCell>
                                <Table.HeaderCell colSpan='2' rowSpan='2' textAlign='center'>Address</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Phone</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Website</Table.HeaderCell>
                                <Table.HeaderCell colSpan='3' textAlign='center'>Company</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell colSpan='1' textAlign='center'>Name</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' textAlign='center'>Catch Phrase</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' textAlign='center'>Business Scope</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.listPage.map((value, key) => {
                                    return [<Table.Row key={key}>
                                        <Table.Cell>{value.id}</Table.Cell>
                                        <Table.Cell>{value.name}</Table.Cell>
                                        <Table.Cell>{value.username}</Table.Cell>
                                        <Table.Cell>{value.email}</Table.Cell>
                                        <Table.Cell>{value.address.street}, {value.address.suite}, {value.address.city}, {value.address.zipcode}</Table.Cell>
                                        <Table.Cell><Icon name='map marker alternate'
                                                          onClick={this.handleClick.bind(this, value.address.geo.lat, value.address.geo.lng)}/></Table.Cell>
                                        <Table.Cell>{value.phone}</Table.Cell>
                                        <Table.Cell>{value.website}</Table.Cell>
                                        <Table.Cell>{value.company.name}</Table.Cell>
                                        <Table.Cell>{value.company.catchPhrase}</Table.Cell>
                                        <Table.Cell>{value.company.bs}</Table.Cell>
                                    </Table.Row>
                                    ]
                                })
                            }
                        </Table.Body>
                    </Table>

                    <div className="content-foot-page">
                        <Pagination onChange={this.pageNumberOnChange} total={this.state.listAll.length}
                                    pageSize={this.state.pageSize} current={this.state.currentPage}/>
                    </div>

                </div>
            </Fragment>

        )
    }
}

export default ContactPagination;
