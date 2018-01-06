import React, { Component } from 'react';
import {Provider, connect} from 'react-redux'
import mapStateToProps, {store} from './mapStateToProps'

/* wrappers */

class AppContainer extends Component {
  render = () => (
    <Provider store={store}>
      <ListPage/>
    </Provider>
  )
}

class PageTitle extends Component {
  render = () => (
    <h1>{this.props.children}</h1>
  )
}

class ListPage extends Component {
  render = () => (
    <View>
      <PageTitle>A Programmer's Bibliography</PageTitle>
      <Search/>
      <ReferenceList/>
    </View>
  )
}

/* search */

class SearchContainer extends Component {
  onChange = (event) => {
    this.props.dispatch({type: "UPDATE_SEARCH_STRING", string: event.target.value})
  }
  render() {
    return (
      <View>
        <Label>Search:</Label>
        <View style={{display: "inline-block", marginBottom: 20, height: 28}}>
          <TextInput value={this.props.search ? this.props.search.history[this.props.search.index] : ""} style={{minWidth: 250, height: 14.5}} onChange={this.onChange}/>
          <PreviousSearch/>
          <NextSearch/>
          <ClearSearch/>
          <View style={{display: "inline-block", marginLeft: 5}}>
            <AndSearch/>
            <NotSearch/>
          </View>
        </View>
      </View>
    )
  }
}
const Search = connect(mapStateToProps)(SearchContainer)

class PreviousSearchContainer extends Component {
  previousSearch = () => {
    this.props.dispatch({type: "PREVIOUS_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.previousSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      &lt;
    </Text>
  )
}
const PreviousSearch = connect(mapStateToProps)(PreviousSearchContainer)

class NextSearchContainer extends Component {
  nextSearch = () => {
    this.props.dispatch({type: "NEXT_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.nextSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      &gt;
    </Text>
  )
}
const NextSearch = connect(mapStateToProps)(NextSearchContainer)

class ClearSearchContainer extends Component {
  clearSearch = () => {
    this.props.dispatch({type: "CLEAR_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.clearSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      &times;
    </Text>
  )
}
const ClearSearch = connect(mapStateToProps)(ClearSearchContainer)

class AndSearchContainer extends Component {
  clearSearch = () => {
    this.props.dispatch({type: "ADD_AND_TO_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.clearSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      and
    </Text>
  )
}
const AndSearch = connect(mapStateToProps)(AndSearchContainer)

class NotSearchContainer extends Component {
  clearSearch = () => {
    this.props.dispatch({type: "ADD_NOT_TO_SEARCH_STRING"})
  }
  render = () => (
    <Text onClick={this.clearSearch} style={{cursor: "pointer", borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", borderRight: "1px solid lightgray", padding: 3, paddingLeft: 6, paddingRight: 6, userSelect: "none"}}>
      not
    </Text>
  )
}
const NotSearch = connect(mapStateToProps)(NotSearchContainer)

/* list of references */

class ReferenceListContainer extends Component {

  componentDidMount = () => {
    store.dispatch({type: "INIT"})   
    store.dispatch({type: "MOCK_DATA"})    
  }

  render() {
    if (!this.props.references) return null
    return (
      <View>
        {this.props.filteredReferences.map(reference => (
          <ReferenceCard key={reference.url} reference={reference}/>
        ))}
      </View>
    )
  }
}
const ReferenceList = connect(mapStateToProps)(ReferenceListContainer)

/* individual references */

class ReferenceCardContainer extends Component {

  state = {
    normalStyle: {
      opacity: null
    },
    hoverStyle: {
      opacity: 0.69
    },
    clickedStyle: {
      opacity: 0.3
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  onHover = (event) => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {

    this.setState({dynamicStyle: this.state.clickedStyle})
    setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    this.OpenUrl()
    event.stopPropagation()
  }

  OpenUrl = () => {
    window.open(this.props.reference.url, "_blank")
  }

  onMouseLeave = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  onHoverFunctionalities = (event) => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render() {
    let reference = {...this.props.reference}
    return (
      <View style={{border: "1px solid lightgray", padding: 20}}>
        <View onClick={this.onClick} onMouseEnter={this.onHover} onMouseLeave={this.onMouseLeave} onMouseOut={this.onMouseOut} style={{cursor: "pointer", ...this.state.dynamicStyle}}>
          <View>
            <Name>{reference.name}</Name>
            <Text onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
              <Functionalities reference={reference}/>
            </Text>
          </View>
          <Subtitle>{reference.subtitle}</Subtitle>
          <Text onMouseEnter={this.onHoverFunctionalities} onMouseLeave={this.onHover}>
            <Author>
                {reference.author}
            </Author>
          </Text>
          <Description>{reference.description}</Description>
        </View>
        <Tags>{reference.tags}</Tags>
      </View>
    )
  }
}
const ReferenceCard = connect(mapStateToProps)(ReferenceCardContainer)

/* reference details */

class Name extends Component {
  render = () => (
    <h2 style={{margin: 0, marginRight: 5, display: "inline-block"}}>{this.props.children}</h2>
  )
}

class Subtitle extends Component {
  render = () => (
    <View style={{marginBottom: 5}}>{this.props.children}</View>
  )
}

class AuthorContainer extends Component {

  state = {
    normalStyle: {
      color: "steelblue"
    },
    hoverStyle: {
      color: "navy"
    },
    clickedStyle: {
      color: "lightskyblue"
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
    this.timeout = null
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  onHover = () => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {

    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    this.props.dispatch({type:"ADD_STRING_TO_SEARCH", string: this.props.children})
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }
  
  render = () => (
    <View style={{fontWeight: "bold"}}>
      By <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{userSelect: "none", ...this.state.dynamicStyle}}>{this.props.children}</Text>
    </View>
  )
}
const Author = connect(mapStateToProps)(AuthorContainer)

class Description extends Component {
  render = () => (
    <View style={{marginTop: 8}}>{this.props.children}</View>
  )
}

class Tags extends Component {
  render() {
    if (!this.props.children) return null
    return (
      <View style={{marginTop: 8}}>
        {this.props.children.map((tag, index) => (<Text key={tag}><Tag>{tag}</Tag>{this.props.children.length-1 === index ? null : ", "}</Text>))}
      </View>      
    )
  }
}

class TagContainer extends Component {

  state = {
    normalStyle: {
      color: "steelblue"
    },
    hoverStyle: {
      color: "navy"
    },
    clickedStyle: {
      color: "lightskyblue"
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
    this.timeout = null
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  onHover = () => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {

    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})  
    }.bind(this), 100)
    this.props.dispatch({type:"ADD_STRING_TO_SEARCH", string: this.props.children})
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }
  
  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{cursor: "pointer", userSelect: "none", ...this.state.dynamicStyle}}>{this.props.children}</Text>
  )
}
const Tag = connect(mapStateToProps)(TagContainer)

/* edit, sort, delete */

class Functionalities extends Component {

  render = () => (
    <Text style={{fontSize: "80%", fontWeight: "bold", color: "steelblue", textDecoration: "underline", cursor: "pointer", userSelect: "none", height: "100%"}}>
      <Edit reference={this.props.reference}/>
      <Sort reference={this.props.reference}/>
      <Delete reference={this.props.reference}/>
    </Text>
  )
}

class Edit extends Component {

  state = {
    normalStyle: {
      color: null
    },
    hoverStyle: {
      color: "navy"
    },
    clickedStyle: {
      color: "lightskyblue"
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
    this.timeout = null
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  onHover = () => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {

    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{marginRight: 5, ...this.state.dynamicStyle}}>
      Edit
    </Text>
  )
}

class Sort extends Component {

  state = {
    normalStyle: {
      color: null
    },
    hoverStyle: {
      color: "navy"
    },
    clickedStyle: {
      color: "lightskyblue"
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
    this.timeout = null
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  onHover = () => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {
    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    if (this.props.onClick) {
        this.props.onClick()
    }
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{marginRight: 5, ...this.state.dynamicStyle}}>
      Sort
    </Text>
  )
}

class Delete extends Component {

  state = {
    normalStyle: {
        color: null
    },
    hoverStyle: {
      color: "navy"
    },
    clickedStyle: {
      color: "lightskyblue"
    }
  }

  componentDidMount = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
    this.timeout = null
  }

  onHover = () => {
    this.setState({dynamicStyle: this.state.hoverStyle})
  }
    
  onClick = (event) => {
    this.setState({dynamicStyle: this.state.clickedStyle})
    this.timeout = setTimeout(function() {
        this.setState({dynamicStyle: this.state.normalStyle})
    }.bind(this), 100)
    if (this.props.onClick) {
        this.props.onClick()
    }
    event.stopPropagation()
  }

  onMouseOut = () => {
    this.setState({dynamicStyle: this.state.normalStyle})
  }

  render = () => (
    <Text onClick={this.onClick} onMouseEnter={this.onHover} onMouseOut={this.onMouseOut} style={{marginRight: 5, ...this.state.dynamicStyle}}>
      Delete
    </Text>
  )
}

/* web */

class View extends Component {
  render = () => (
    <div {...this.props}>{this.props.children}</div>
  )
}

class Text extends Component {
  render = () => (
    <span {...this.props}>{this.props.children}</span>
  )
}

class Label extends Component {
  render = () => (
    <label {...this.props} style={{marginRight: 5, ...this.props.style}}>{this.props.children}</label>
  )
}

class TextInput extends Component {
  render = () => (
    <input {...this.props} style={{padding: 5, marginBottom: 10, border: "1px solid lightgray", ...this.props.style}}/>
  )
}

export default AppContainer
