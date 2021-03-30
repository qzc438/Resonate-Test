import React, {Component} from 'react'
import {Icon, Menu, Table} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Pagination} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";

class Role extends Component {

    // constructor
    constructor() {
        super();
        //react定义数据
        this.state = {
            list: []
        }
        var api = 'https://jsonplaceholder.typicode.com/users';

        axios.get(api)
            .then((response) => {
                console.log(response);
                console.log(response.data);
                //用到this需要注意指向，箭头函数
                this.setState({
                    list: response.data
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    // handle menu item
    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    render() {
        const {activeItem} = this.state;
        return (
            <div>

                <div style={{paddingLeft: "10px", paddingRight: "10px"}}>
                    <Menu>
                        <Menu.Item
                            name='editorials'
                            active={activeItem === 'editorials'}
                            onClick={this.handleItemClick}
                        >
                            <Icon disabled name='users'/>
                            Create
                        </Menu.Item>

                        <Menu.Item
                            name='reviews'
                            active={activeItem === 'reviews'}
                            onClick={this.handleItemClick}
                        >
                            <Icon disabled name='users'/>
                            Update
                        </Menu.Item>

                        <Menu.Item
                            name='upcomingEvents'
                            active={activeItem === 'upcomingEvents'}
                            onClick={this.handleItemClick}
                        >
                            Delete
                        </Menu.Item>
                    </Menu>

                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Id</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Name</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Username</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Email</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Address</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Phone</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' rowSpan='2' textAlign='center'>Website</Table.HeaderCell>
                                <Table.HeaderCell colSpan='3' textAlign='center'>Company</Table.HeaderCell>
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell colSpan='1' textAlign='center'>Name</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' textAlign='center'>Catch Phrase</Table.HeaderCell>
                                <Table.HeaderCell colSpan='1' textAlign='center'>Bs</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                this.state.list.map((value, key) => {
                                    return [<Table.Row key={{key}}>
                                        <Table.Cell>{value.id}</Table.Cell>
                                        <Table.Cell>{value.name}</Table.Cell>
                                        <Table.Cell>{value.username}</Table.Cell>
                                        <Table.Cell>{value.email}</Table.Cell>
                                        <Table.Cell>{value.address.street}, {value.address.suite}, {value.address.city}, {value.address.zipcode}</Table.Cell>
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

                    <Pagination defaultCurrent={1} total={50}/>
                </div>
            </div>

        )
    }
}

export default Role;
