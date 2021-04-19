var component = {
    props:{
        name:"tom"
    }
}
function render(props){
    var handleClick = ()=>{
        setTimeout(function () {
         //打印tom，不是jerry
            console.log(props.name)
        },3000)
    }
    handleClick()

}
render(component.props)
component.props = {name:"jerry"}