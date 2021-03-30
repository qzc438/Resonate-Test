import React from 'react';
import axios from 'axios'

class Axios extends React.Component {
    // constructor
    constructor() {
        super();
        //react定义数据
        this.state = {
            list: []
        }
    }

    //invoke API
    getData = () => {
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

    render() {
        return (
            <div>
                <h2>axios获取数据</h2>
                <button onClick={this.getData}>获取api接口</button>
                <ul>
                    {/* 对数组进行循环 */}
                    {
                        this.state.list.map((value, key) => {
                            return <li key={key}>{value.id}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Axios;