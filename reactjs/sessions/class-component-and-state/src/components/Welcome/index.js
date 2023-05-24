import {component} from 'react'
//import { clear } from 'sisteransi'

const Welcome extends component {
    render(){
        const {name} = this.props
        return <h1>Hello, {name}}</h1>
    }
}
clear
export default Welcome
