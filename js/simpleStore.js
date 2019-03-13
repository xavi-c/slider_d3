var _store = {};
class SimpleStore {
    constructor(props){
        if(props){
            _store = props;
        }
    }
    getContent(){
        console.log('_store: ' + _store + ', length: ' + _store.length);
        return _store;
    }
}
export default SimpleStore;