/** @jsx React.DOM */

var Wordform = React.createClass({
  propTypes: {
    onWordsEntered: React.PropTypes.func.isRequired
  },
  getInitialState(){
    return {error:undefined};
  },
  setError(msg){
    this.setState({error:msg});
    setTimeout(()=>{this.setState({error:''});},2000);
  },
  submitWords(e){
    var node = this.refs['wordfield'].getDOMNode(),
        words = (node.value || '').trim().replace(/\W+/g,' ').split(' ');
    if (words.length <= 2) {
      this.setError('Enter at least 3 words!');
    } else if (words.length !== _.unique(words).length) {
      this.setError('Don\'t enter duplicate words!');
    } else if (_.find(words,(w)=>w.length > 8)) {
      this.setError('Words should not be longer than 8 characters!');
    } else {
      this.props.onWordsEntered(words);
      node.value = '';
    }
    return false;
  },
  render() {
    return (
      <form onSubmit={this.submitWords}>
        <p>Enter words separated by spaces!</p>
        <input type='text' ref='wordfield' />
        <button type='submit'>Start!</button>
        <p className='error' ref='errormsg'>{this.state.error}</p>
      </form>
    );
  }
});